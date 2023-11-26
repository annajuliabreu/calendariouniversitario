import Home from "./Home.jsx";
import TelaAulas from "./CalendarioAulas/TelaAulas.jsx";
import AgendaPersonalizadaScreen from './AgendaPersonalizada/AgendaPersonalizadaScreen.jsx'

import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NativeStack = createNativeStackNavigator()

const MainPageProva = () => {
    return (
        <NavigationContainer>
            <NativeStack.Navigator initialRouteName="Home">
                <NativeStack.Screen name="Home" component={Home} options={{ title: "Home" }} />
                <NativeStack.Screen name="CalendarioAulas" component={TelaAulas} options={{ title: "Calendário de Aulas" }} />
                <NativeStack.Screen name="Agenda" component={AgendaPersonalizadaScreen} options={{ title: "Agenda" }} />
            </NativeStack.Navigator>
        </NavigationContainer>
    );
}

export default MainPageProva;