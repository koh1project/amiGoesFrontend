import { Input, ScrollView, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  StyleSheet,
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

  const handleSearchChange = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setSearchKeyword(event.nativeEvent.text);
    },
    [],
  );

  const fetchPlaces = async () => {
    let result: AxiosResponse<GetDiscoverResponse | Place[], any>;
    if (searchKeyword) {
      result = await getPlacesByKeyword(searchKeyword);
    } else {
      result = await getDiscover();
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
    <View style={{ padding: 10 }}>
      {isFilterOpen && (
        <DiscoverFilter handleFilterClose={() => setIsFilterOpen(false)} />
      )}
      <Text>Discover</Text>
      <Input
        placeholder="Search"
        onChange={handleSearchChange}
        value={searchKeyword}
      ></Input>
      <ScrollView>{content}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
