import {
  Badge,
  Input,
  ScrollView,
  View,
  VStack,
  CloseIcon,
  HStack,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  getDiscover,
  getPlacesByKeyword,
} from '../../../services/discover.service';
import { GetDiscoverResponse, Place } from '../../../types/discover';
import { useUserLocation } from '../../../features/discover/hooks/useUserLocation';
import { DiscoverMainPlaces } from '../../../features/discover/components/DiscoverMainPlaces';
import { SearchResults } from '../../../features/discover/components/SearchResults';
import { AxiosResponse } from 'axios';
import { DiscoverFilter } from './DiscoverFilter';
import { SearchKeywordForm } from './SearchKeywordForm';

function isPlaceByKeywordArray(
  places: GetDiscoverResponse | Place[],
): places is Place[] {
  return Array.isArray(places);
}

export const DiscoverScreen: React.FC = () => {
  const [places, setPlaces] = useState<GetDiscoverResponse | Place[]>();
  const { location } = useUserLocation();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [filterItems, setFilterItems] = useState<string[]>([]);

  const handleSearchChange = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setSearchKeyword(event.nativeEvent.text);
    },
    [],
  );

  const handleRemoveFilterItem = (index: number) => {
    setFilterItems(filterItems.filter((_, i) => i !== index));
  };

  const fetchPlaces = async () => {
    let result: AxiosResponse<GetDiscoverResponse | Place[], any>;
    if (searchKeyword) {
      result = (await getPlacesByKeyword(searchKeyword)) as AxiosResponse;
    } else {
      result = (await getDiscover()) as AxiosResponse;
    }

    const { data } = result;
    setPlaces(data);
    return data;
  };
  useEffect(() => {
    setPlaces(undefined);
    fetchPlaces().catch((error) => {
      console.error(error);
    });
  }, [searchKeyword]);

  let content = <></>;
  if (places) {
    content = isPlaceByKeywordArray(places) ? (
      <SearchResults places={places as Place[]} userLocation={location} />
    ) : (
      <DiscoverMainPlaces
        places={places as GetDiscoverResponse}
        location={location}
        setIsFilterOpen={setIsFilterOpen}
      />
    );
  }

  return (
    <View style={{ padding: 10, display: 'flex', flexDirection: 'column' }}>
      {isFilterOpen && (
        <DiscoverFilter
          handleFilterClose={() => setIsFilterOpen(false)}
          setFilterItems={setFilterItems}
        />
      )}
      <Text>Discover</Text>
      <SearchKeywordForm
        handleSearchChange={handleSearchChange}
        searchKeyword={searchKeyword}
      />
      <VStack style={styles.filterItemContainer}>
        {filterItems.map(
          (item, index) =>
            item && (
              <Badge
                key={index}
                _text={{ color: 'white' }}
                style={styles.filterItem}
                colorScheme="success"
                endIcon={
                  <TouchableOpacity
                    onPress={() => {
                      handleRemoveFilterItem(index);
                    }}
                  >
                    <CloseIcon size="xs" color="#FFFFFF" />
                  </TouchableOpacity>
                }
              >
                {item}
              </Badge>
            ),
        )}
      </VStack>
      <ScrollView>{content}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterItemContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterItem: {
    flexGrow: 0,
    flexShrink: 1,
    backgroundColor: '#3FA8AE',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
  },
});
