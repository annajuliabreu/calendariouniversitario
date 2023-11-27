import { useState } from "react"
import { View, Text, Image, TextInput, TouchableOpacity, } from 'react-native';
import style from './style';
import axios from "axios";
import { API_URL } from '@env'

const Login = () => {

    // Estados para armazenar o e-mail e a senha inseridos pelo usuário
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    // Função para lidar com o clique no botão de login
    const handleLogin = () => {
        axios.post(`${API_URL}/aluno/login`, {
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
    };

    return (
        <View style={style.container}>
            <View style={style.image}>
                <Image
                    style={style.tinyLogo}
                    source={{
                        uri: 'https://github.com/annajuliabreu/mobile/blob/main/workspace/components/MeuCalendarioUniversitario/assets/Camada_1-2-2.png?raw=true',
                    }}
                />
            </View>

            <View>
                <Text style={style.title}>Login</Text>

                {/* Campo de entrada para o e-mail */}
                <TextInput
                    style={style.input}
                    placeholder="Usuario"
                    value={usuario}
                    onChangeText={(text) => setUsuario(text)}
                />

                {/* Campo de entrada para a senha */}
                <TextInput
                    style={style.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={(text) => setSenha(text)}
                />

                {/* Botão de login */}
                <TouchableOpacity style={style.button} onPress={handleLogin}>
                    <Text style={style.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;