import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CarouselTransition } from "./experiments/CarouselTransition";
import { SharedAnimationNavigator } from "./experiments/shared-animation/SharedElementNavigation";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={[styles.navigationButton, { backgroundColor: "#F9A38A" }]}
        onPress={() => navigation.navigate("CarouselTransition")}
      >
        <Text style={styles.buttonText}>CAROUSEL TRANSITION</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navigationButton, { backgroundColor: "#B6C1D1" }]}
        onPress={() => navigation.navigate("SharedAnimation")}
      >
        <Text style={styles.buttonText}>SHARED ELEMENT TRANSITIONS</Text>
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

const styles = StyleSheet.create({
  navigationButton: {
    padding: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 12,
  },
  buttonText: { color: "white", fontWeight: "600" },
});
