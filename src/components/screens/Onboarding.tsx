import { Button, Text, View, VStack } from 'native-base';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet } from 'react-native';
import slides from '../../utils/onboarding_slides';

const { width, height } = Dimensions.get('screen');

const Indicator = ({ scrollX }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignSelf: 'center',
      }}
    >
      {slides.map((data, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#3FA8AE',
              margin: 6,
              transform: [{ scale }],
              opacity,
            }}
          />
        );
      })}
    </View>
  );
};

const Onboarding = ({ navigation, route }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.slide} width={width}>
              <Image source={item.image} style={styles.image} />
              <VStack
                style={styles.textContainer}
                backgroundColor="light"
                width={width}
              >
                <View>
                  <Text variant="onboardingTitle" marginX={'20px'}>
                    {item.title}
                  </Text>
                  <Text variant="onboardingSubtitle" marginX={'20px'}>
                    {item.subtitle}
                  </Text>
                  <Text marginX={'20px'}>{item.text}</Text>
                  <Text marginTop={4} marginX={'20px'}>
                    {item.text2}
                  </Text>
                </View>
                {item.id === '5' ? (
                  <Button
                    alignSelf={{ base: 'center', md: 'flex-end' }}
                    marginBottom={4}
                    variant="primaryLarge"
                    onPress={() => navigation.navigate('Index')}
                  >
                    Get Started
                  </Button>
                ) : null}
              </VStack>
            </View>
          );
        }}
      />

      <Indicator scrollX={scrollX} />
      {/* <Indicator scrollX={scrollX} /> */}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    marginTop: 34,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    flex: 0.5,
  },
  textContainer: {
    flex: 0.5,
    marginTop: 26,
    borderRadius: 25,
    boxShadow: '0px -3px 5px rgba(109, 109, 109, 0.1)',
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
});
