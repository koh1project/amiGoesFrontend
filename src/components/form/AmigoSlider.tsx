import { Slider } from 'native-base';
import { useState } from 'react';

type AmigoSliderProps = {
  initialValue?: number;
  onChange: (val: number) => void;
};
const AmigoSlider = ({ initialValue, onChange }: AmigoSliderProps) => {
  const [sliderValue, setSliderValue] = useState(initialValue || 0);
  return (
    <Slider
      maxW="100%"
      defaultValue={sliderValue}
      minValue={1}
      maxValue={50}
      step={1}
      size="md"
      onChange={(v) => {
        setSliderValue(v);
        onChange(v);
      }}
    >
      <Slider.Track bg="lightgreen">
        <Slider.FilledTrack bg="green" />
      </Slider.Track>
      <Slider.Thumb
        borderColor="green"
        borderWidth={2}
        background="lightgreen"
      />
    </Slider>
  );
};
export default AmigoSlider;
