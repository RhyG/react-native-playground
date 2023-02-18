import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import AntDesign from "@expo/vector-icons/AntDesign";
import { data } from "./data";
import { ListRenderItem } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const ListItem = (props: { name: string; description: string; image: any }) => {
  const naivgation = useNavigation();

  const { name, description, image } = props;

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        borderRadius: 12,
      }}
      onPress={() => naivgation.navigate("Details", { item: { ...props } })}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 2 }}>{name}</Text>
        <Text style={{ color: "#6a6a6a" }}>{description}</Text>
      </View>
      <SharedElement id={`item.${name}.image`}>
        <View style={{ flex: 2, marginRight: 2 }}>
          <Image source={image} style={{ width: 200, height: 100 }} resizeMode="contain" />
        </View>
      </SharedElement>
    </TouchableOpacity>
  );
};

const SharedAnimationListScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#FAFAFB",
      },
      headerShadowVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginLeft: 10,
            backgroundColor: "#fff",
            borderRadius: 20,
            height: 45,
            width: 45,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
          }}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderItem: ListRenderItem<typeof data[number]> = ({ item }) => {
    return <ListItem {...item} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFB", paddingTop: 20 }}>
      <FlatList contentContainerStyle={{ padding: 10 }} data={data} renderItem={renderItem} />
    </View>
  );
};

const neck = require("../../assets/shared-animation/neck.jpeg");
const bridge = require("../../assets/shared-animation/bridge.jpeg");
const pickups = require("../../assets/shared-animation/pickups.jpeg");

const SharedAnimationDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#FAFAFB",
      },
      headerShadowVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginLeft: 10,
            backgroundColor: "#fff",
            borderRadius: 20,
            height: 45,
            width: 45,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
          }}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#FAFAFB", padding: 20, flex: 1 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 2, fontSize: 18 }}>{item.name}</Text>
      <Text style={{ color: "#6a6a6a", fontSize: 16 }}>{item.description}</Text>
      <SharedElement id={`item.${item.name}.image`} style={{ height: 100, marginTop: 40 }}>
        <View style={{ height: 110 }}>
          <Image source={item.image} style={{ width: "100%", height: 110 }} resizeMode="contain" />
        </View>
      </SharedElement>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 40, marginTop: 40 }}>
        <Animatable.View style={{ height: 60, width: 60, borderRadius: 50 }} animation={animations[0]} duration={700}>
          <Image source={neck} resizeMode="cover" style={{ height: "100%", width: "100%", borderRadius: 50 }} />
        </Animatable.View>
        <Animatable.View style={{ height: 60, width: 60, borderRadius: 50 }} animation={animations[1]} duration={700}>
          <Image source={bridge} resizeMode="cover" style={{ height: "100%", width: "100%", borderRadius: 50 }} />
        </Animatable.View>
        <Animatable.View style={{ height: 60, width: 60, borderRadius: 50 }} animation={animations[2]} duration={700}>
          <Image source={pickups} resizeMode="cover" style={{ height: "100%", width: "100%", borderRadius: 50 }} />
        </Animatable.View>
      </View>
      <View style={{ flex: 1, marginTop: 40 }}>
        <Animatable.View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
          animation="fadeInUp"
          delay={0}
        >
          <AntDesign name="check" size={20} color="green" />
          <Text style={{ marginLeft: 10, fontSize: 18 }}>Absolutely rips</Text>
        </Animatable.View>
        <Animatable.View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
          animation="fadeInUp"
          delay={80}
        >
          <AntDesign name="check" size={20} color="green" />
          <Text style={{ marginLeft: 10, fontSize: 18 }}>Completely shreds</Text>
        </Animatable.View>
        <Animatable.View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
          animation="fadeInUp"
          delay={180}
        >
          <AntDesign name="check" size={20} color="green" />
          <Text style={{ marginLeft: 10, fontSize: 18 }}>Djents and thalls</Text>
        </Animatable.View>
      </View>
      <Animatable.View animation="fadeInUp" style={{ flexDirection: "row", alignItems: "center", paddingBottom: 20 }}>
        <AntDesign name="hearto" size={30} color="#252525" style={{ marginRight: 20 }} />
        <TouchableOpacity
          style={{
            backgroundColor: "#252525",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            flex: 1,
            borderRadius: 10,
            height: 50,
          }}
        >
          <Text style={{ color: "#fff" }}>Add to cart</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const animation = {
  0: { opacity: 0, translateY: 100 },
  1: { opacity: 1, translateY: 0 },
};

const createAnimation = (from) => ({
  0: { translateY: -100, translateX: from },
  1: { translateY: 0, translateX: 0 },
});

const animations = [createAnimation(100), createAnimation(0), createAnimation(-100)];

SharedAnimationDetailScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.name}.image`,
      animation: "move",
      resize: "clip",
    },
  ];
};

const SharedAnimationStack = createSharedElementStackNavigator();

export const SharedAnimationNavigator = () => {
  return (
    <SharedAnimationStack.Navigator>
      <SharedAnimationStack.Screen name="Guitars" component={SharedAnimationListScreen} />
      <SharedAnimationStack.Screen name="Details" component={SharedAnimationDetailScreen} />
    </SharedAnimationStack.Navigator>
  );
};
