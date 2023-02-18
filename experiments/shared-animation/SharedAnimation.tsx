import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { SharedElement, SharedElementTransition, nodeFromRef } from "react-native-shared-element";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { data } from "./data";
import { ListRenderItem } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
        <View style={{ flex: 2, marginRight: 2, transform: [{ scaleX: -1 }] }}>
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

const SharedAnimationDetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 2 }}>{item.name}</Text>
      <Text style={{ color: "#6a6a6a" }}>{item.description}</Text>
      <SharedElement id={`item.${item.name}.image`} style={{ flex: 1, height: 100, marginTop: 40 }}>
        <View style={{ height: 100, transform: [{ scaleX: -1 }] }}>
          <Image source={item.image} style={{ width: "100%", height: 100 }} resizeMode="contain" />
        </View>
      </SharedElement>
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
