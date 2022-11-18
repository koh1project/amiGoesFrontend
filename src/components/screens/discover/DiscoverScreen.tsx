import { AxiosResponse } from 'axios';
import {
  Badge,
  CloseIcon,
  Divider,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableOpacity,
} from 'react-native';
import { DiscoverMainPlaces } from '../../../features/discover/components/DiscoverMainPlaces';
import { SearchResults } from '../../../features/discover/components/SearchResults';
import { useUserLocation } from '../../../features/discover/hooks/useUserLocation';
import i18n from '../../../localization/Localization';
import {
  getDiscover,
  getPlacesByKeyword,
} from '../../../services/discover.service';
import { GetDiscoverResponse, Place } from '../../../types/discover';
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      {isFilterOpen && (
        <DiscoverFilter
          handleFilterClose={() => setIsFilterOpen(false)}
          setFilterItems={setFilterItems}
        />
      )}
      <Text variant="screenTitle">{i18n.t('Discover.title')}</Text>
      <View style={styles.container}>
        <SearchKeywordForm
          handleSearchChange={handleSearchChange}
          searchKeyword={searchKeyword}
        />
        <Divider my={4} />
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
        <View height={500} paddingBottom={10}>
          <ScrollView>{content}</ScrollView>
        </View>
      </View>
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
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
});
