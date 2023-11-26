import Home from "./Home.jsx";
import TelaAulas from "./CalendarioAulas/TelaAulas.jsx";
import AgendaPersonalizadaScreen from './AgendaPersonalizada/AgendaPersonalizadaScreen.jsx'
import Login from "./Login/Login.jsx";
import CalendarioLista from "./CalendarioLista/CalendarioLista.jsx";
import EventosUniversitarios from "./EventosUniversitarios/EventosUniversitarios.jsx";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Pressable } from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NativeStack = createNativeStackNavigator()

const MainPageProva = () => {
    const logout = () => {
        localStorage.clear()
        navigation.navigate("Login")
    }

    return (
        <NavigationContainer>
            <NativeStack.Navigator initialRouteName="Home">
                <NativeStack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: "Meu Calendário Universitário",
                        headerStyle: {
                            backgroundColor: "#593B7F",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerRight: () => (
                            <Pressable onPress={logout} style={{ marginRight: 10 }} >
                                <MaterialIcons name="logout" size={30} color="#fff" />
                            </Pressable>
                        ),
                    }}
                />
                <NativeStack.Screen name="CalendarioAulas" component={TelaAulas} options={{ title: "Calendário de Aulas" }} />
                <NativeStack.Screen name="Agenda" component={AgendaPersonalizadaScreen} options={{ title: "Agenda" }} />
                <NativeStack.Screen name="CalendarioLista" component={CalendarioLista} options={{ title: "Calendário de Aulas" }} />
                <NativeStack.Screen name="EventosUniversitarios" component={EventosUniversitarios} options={{ title: "Eventos Universitários" }} />


                <NativeStack.Screen name="Login" component={Login} options={{ title: "Login" }} />
            </NativeStack.Navigator>
        </NavigationContainer>
    );
}

export default MainPageProva;