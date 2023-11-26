import { View, Text, Button, Pressable } from "react-native"
import myStyle from "./MyStyle"
import { useEffect } from "react"
//checa se o token existe
const token = localStorage.getItem("token")

const Home = ({ navigation }) => {
    useEffect(() => {
        if (!token) {
            navigation.navigate("Login")
        }
    }, [])

    return (
        <View style={myStyle.container}>
            <View style={myStyle.menu}>

                <Pressable onPress={() => navigation.navigate("CalendarioAulas")} style={myStyle.redirectButton} >
                    <Text style={myStyle.textoPressable}>Calendário de Aulas</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Agenda")} style={myStyle.redirectButton} >
                    <Text style={myStyle.textoPressable}>Agenda</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Login")} style={myStyle.redirectButton} >
                    <Text style={myStyle.textoPressable}>Login</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Home