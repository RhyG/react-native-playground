import { TouchableOpacity, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CarouselTransition } from "./experiments/CarouselTransition";
import { SharedAnimationNavigator } from "./experiments/shared-animation/SharedAnimation";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("CarouselTransition")}>
        <Text>Carousel transition</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SharedAnimation")}>
        <Text>Shared animations</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CarouselTransition" component={CarouselTransition} />
        <Stack.Screen name="SharedAnimation" component={SharedAnimationNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
