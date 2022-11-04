import { View } from 'native-base';
import { useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import gif from '../../../assets/images/splash_screenanimation.gif';

const SplashScreen = () => {
  const edges = useSafeAreaInsets();
  //Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;

  //   componentDidMount() {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 2000,
  //       useNativeDriver: false
  //     }).start() => {
  //   console.log('fading out');

  // }
  // }

  return (
    <View style={styles.background} backgroundColor="#EE6653">
      <Animated.View style={styles.animation}>
        <Image source={gif} />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  animation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
