import { Text } from 'native-base';

const EmergencyScreen = (props) => {
  const { name, naigation } = props.route.params;
  return <Text>{name}</Text>;
};

export default EmergencyScreen;
