import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { data } from "./data";
import { ListRenderItem } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListItem = (props: { name: string; description: string; image: any }) => {
  const naivgation = useNavigation();

  const { name, description, image } = props;

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 20 }}
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

const SharedAnimationListScreen = () => {
  const renderItem: ListRenderItem<typeof data[number]> = ({ item }) => {
    return <ListItem {...item} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const neck = require("../../assets/shared-animation/neck.jpeg");
const bridge = require("../../assets/shared-animation/bridge.jpeg");
const pickups = require("../../assets/shared-animation/pickups.jpeg");

const SharedAnimationDetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 2 }}>{item.name}</Text>
      <Text style={{ color: "#6a6a6a" }}>{item.description}</Text>
      <SharedElement id={`item.${item.name}.image`} style={{ flex: 1, height: 100, marginTop: 40 }}>
        <View style={{ height: 100 }}>
          <Image source={item.image} style={{ width: "100%", height: 100 }} resizeMode="contain" />
        </View>
      </SharedElement>
      <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", paddingHorizontal: 40 }}>
        <View style={{ height: 60, width: 60, borderRadius: 50 }}>
          <Image source={neck} resizeMode="cover" style={{ height: "100%", width: "100%", borderRadius: 50 }} />
        </View>
        <View style={{ height: 60, width: 60, borderRadius: 50 }}>
          <Image source={bridge} resizeMode="cover" style={{ height: "100%", width: "100%", borderRadius: 50 }} />
        </View>
        <View style={{ height: 60, width: 60, borderRadius: 50 }}>
          <Image source={pickups} resizeMode="cover" style={{ height: "100%", width: "100%", borderRadius: 50 }} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Absolutely rips</Text>
        <Text>Completely shreds</Text>
        <Text>Djents and thalls</Text>
      </View>
    </View>
  );
};

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
