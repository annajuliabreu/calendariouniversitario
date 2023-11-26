// import Home from "./Teste/Home.jsx"
import TelaAulas from "./CalendarioAulas/TelaAulas.jsx";

import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NativeStack = createNativeStackNavigator()


const MainPageProva = () => {
    return (
        <NavigationContainer>
            <NativeStack.Navigator screenOptions={{ headerShown: false }}>
                <NativeStack.Screen name="Calendário de Aulas" component={TelaAulas} />
            </NativeStack.Navigator>
        </NavigationContainer>
    );
}

export default MainPageProva;