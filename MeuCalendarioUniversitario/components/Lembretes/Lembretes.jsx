import { useState } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native'
import { useEffect } from 'react'
import styles from './styles'
import axios from 'axios'
import { API_URL } from '@env'
let token = localStorage.getItem("token")
let idAluno = localStorage.getItem("idAluno")


const Lembretes = ({ navigation }) => {
  const [periodo, setPeriodo] = useState(5)
  const atualizar = () => {
    token = localStorage.getItem("token")
    idAluno = localStorage.getItem("idAluno")
    axios.get(`${API_URL}/agenda-aluno/${idAluno}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      let agendaAPI = []
      response.data.forEach(agenda => {
        agendaAPI.push({
          id: agenda.id_agenda,
          title: agenda.titulo_agenda,
          date: agenda.data_agenda,
          completed: agenda.concluido_agenda,
          falta: Math.ceil((new Date(agenda.data_agenda) - new Date()) / (1000 * 60 * 60 * 24))
        })
        setEventos(agendaAPI)
      }
      )
    });
  }

  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    atualizar()
  }, []);



  const renderItem = ({ item }) => (
    <>
      <View style={styles.eventItem}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventText}>Falta {item.falta} dias para {item.title}</Text>
        </View>
      </View>
    </>
  )

  return (
    <View style={styles.container}>
      <View style={styles.row}>

        <TextInput
          style={styles.input}
          placeholder="Período de Filtragem"
          value={periodo}
          onChangeText={(text) => setPeriodo(text)}
        />
        <Text style={styles.subtitle}>Insira aqui o período em dias para filtrar.</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Lembretes</Text>
      </View>

      <FlatList
        data={eventos}
        renderItem={({ item }) => {
          if (item.falta <= periodo) {
            return renderItem({ item })
          }
        }}
      />
    </View>
  )
}

export default Lembretes
