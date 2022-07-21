import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  FlatList,
  Dimensions,
  ListRenderItem,
  ImageSourcePropType,
} from "react-native";

const { width } = Dimensions.get("window");

const IMAGE_WIDTH = width * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.54;

const cruiser = require("../assets/cruiser.png");
const prado = require("../assets/prado.png");
const hilux = require("../assets/hilux.png");
const fortuner = require("../assets/fortuner.png");

const DATA = [cruiser, hilux, fortuner];

const BACKGROUNDS = [
  "https://static.wixstatic.com/media/d3c9e3_967a763ea6284527bfc1aa4efa3ae334~mv2_d_4610_2579_s_4_2.jpg/v1/fill/w_2500,h_1398,al_c/d3c9e3_967a763ea6284527bfc1aa4efa3ae334~mv2_d_4610_2579_s_4_2.jpg",
  // "https://www.outbackspirittours.com.au/wp-content/uploads/2017/06/central-australia.jpg",
  "https://www.visitmelbourne.com/-/media/images/high-country/things-to-do/nature-and-wildlife/falls-creek-to-mt-hotham_hc_r_1461476_1150x863.jpg?ts=20150903181146",
  "https://www.tropicalnorthqueensland.org.au/wp-content/uploads/CY1-PunsandBay.jpg",
];

const keyExtractor = (item: string) => item;

export function CarouselTransition() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, -30, 0],
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1.1, 0],
    });

    return (
      <Animated.View
        style={{
          width,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateY }, { scale }],
        }}
      >
        <Image
          source={item as ImageSourcePropType}
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            resizeMode: "contain",
          }}
        />
      </Animated.View>
    );
  };

  return (
    <>
      <View style={StyleSheet.absoluteFillObject}>
        {BACKGROUNDS.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.1, 1, 0.1],
          });

          return (
            <Animated.Image
              source={{
                uri: image,
              }}
              key={image}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={4}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={DATA}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        horizontal
        keyExtractor={keyExtractor}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
