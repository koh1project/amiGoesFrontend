import { Text } from 'native-base';

const UserProfileScreen = (props) => {
  const { name } = props.route.params;
  return <Text>{name}</Text>;
};

export default UserProfileScreen;
