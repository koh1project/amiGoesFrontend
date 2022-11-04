import { PlaceDetail } from './../../../types/discover.d';
import { useState, useEffect } from 'react';
import { getPlaceById } from '../../../services/discover.service';
import { GOOGLE_MAPS_API_KEY } from '../../../utils/const';
import { useUserLocation } from './useUserLocation';

export const usePlaceProfile = (place_id: string) => {
  const [place, setPlace] = useState<PlaceDetail>();
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { location } = useUserLocation();

  useEffect(() => {
    const fetchPlace = async () => {
      const response = await getPlaceById(place_id);
      setPlace(response.data);
    };
    fetchPlace();
  }, []);

  useEffect(() => {
    if (!place || !place.photos) {
      return;
    }
    const photos = place.photos;
    const urls: string[] = [];
    for (const photo of photos) {
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;

      urls.push(photoUrl);
    }
    setPhotoUrls(urls);
  }, [place]);

  const handleNextPhoto = () => {
    if (photoIndex === photoUrls.length - 1) {
      setPhotoIndex(0);
    } else {
      setPhotoIndex(photoIndex + 1);
    }
  };

  return {
    place,
    photoUrls,
    photoIndex,
    handleNextPhoto,
    userLocation: location,
  };
};
