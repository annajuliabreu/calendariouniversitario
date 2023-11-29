import { View, Text, Pressable, Image } from "react-native"
import myStyle from "./MyStyle"
import { useEffect } from "react"
import Ionicons from 'react-native-vector-icons/Ionicons'

//checa se o token existe
const token = localStorage.getItem("token")
let nomeAluno = localStorage.getItem("nomeAluno")

const Home = ({ navigation }) => {
    useEffect(() => {
        if (!token) {
            navigation.navigate("Login")
        }
    }, [])

    return (
        <View style={myStyle.container}>
            <View style={myStyle.boasvindas}>
                <View style={myStyle.textos}>
                    <Text style={myStyle.title}>Olá, <b>{nomeAluno}</b>,</Text>
                    <Text style={myStyle.title}>Seja bem-vindo(a)!</Text>
                    <Text style={myStyle.subtitle}>Escolha uma das opções abaixo</Text>
                </View>
                <Image
                    style={myStyle.calendario}
                    source={require('../assets/calendario.png')}
                />
            </View>

            <View style={myStyle.menu}>

                <Pressable onPress={() => navigation.navigate("CalendarioAulas")} style={myStyle.redirectButton} >
                    <Text style={myStyle.textoPressable}>Calendário de Aulas</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Agenda")} style={myStyle.redirectButton} >
                    <Text style={myStyle.textoPressable}>Agenda</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("CalendarioLista")} style={myStyle.redirectButton} >
                    <Text style={myStyle.textoPressable}>Calendário Universitário</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("EventosUniversitarios")} style={myStyle.redirectButton} >
                    <Text style={myStyle.textoPressable}>Eventos Universitários</Text>
                </Pressable>

            </View>
            <View style={myStyle.notificacoes}>
                <Pressable onPress={() => navigation.navigate("Lembretes")} >
                    <Ionicons name="notifications-circle-outline" size={50} color="#059669" />
                </Pressable>
            </View>

        </View>
    )
}

export default Home