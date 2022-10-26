import {
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
type ButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleSheet.NamedStyles<any>;
};

export const PrimaryButton: React.FC<ButtonProps> = ({
  label,
  onPress,
  style,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'gray',
    width: '100%',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonOutline: {
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  buttonTextOutline: {
    color: 'gray',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
