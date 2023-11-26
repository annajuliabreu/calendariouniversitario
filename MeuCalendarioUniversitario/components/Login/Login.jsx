import { View, Button, TextInput, Text } from "react-native"
import style from "./style"
import axios from "axios"
import { useState } from "react"


const Login = ({ navigation }) => {
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")

    const handleLogin = () => {
        axios.post("http://localhost:3000/aluno/login", {
            usuarioAluno: usuario,
            senhaAluno: senha
        }).then((response) => {
            if (response.data.message) {
                alert("Credenciais inválidas!")
                setUsuario("")
                setSenha("")
            } else {
                //adicionei o token no local storage
                localStorage.setItem("token", response.data.token)
                //Adiciona o id do aluno no local storage
                localStorage.setItem("idAluno", response.data.id)
                //Adiciona o nome do aluno no local storage
                localStorage.setItem("nomeAluno", response.data.nomeAluno)

                navigation.navigate("Home")

            }
        })
    }

    return (
        <View >
            <Text>Login</Text>
            <TextInput placeholder="Usuário" onChangeText={text => setUsuario(text)} style={style.input} value={usuario} />
            {/* Campo de senha, texto em * */}
            <TextInput placeholder="Senha" onChangeText={text => setSenha(text)} style={style.input} value={senha} secureTextEntry={true} />
            <Button title="Login" onPress={() => handleLogin()} />
        </View>
    )
}
export default Login