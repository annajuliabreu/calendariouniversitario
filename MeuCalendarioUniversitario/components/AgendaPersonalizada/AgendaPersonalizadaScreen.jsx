import { useState } from 'react'
import { View, Text, Pressable, FlatList, Modal, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useEffect } from 'react'
import styles from './styles'
import axios from 'axios'
const API_URL = "http://localhost:3000";



const AgendaPersonalizadaScreen = ({ navigation }) => {
  const atualizar = () => {
    let token = localStorage.getItem("token")
    let idAluno = localStorage.getItem("idAluno")
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
        })
        setEventos(agendaAPI)
      }
      )
    });
  }


  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    atualizar()
  }, [eventos]);


  const [isModalVisible, setModalVisible] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState('')
  const [newEventDate, setNewEventDate] = useState('')
  const [editar, setEditar] = useState(false)
  const [idEvento, setIdEvento] = useState('')

  // Marcar evento como concluído
  const handleToggleComplete = (eventId) => {
    axios.put(`${API_URL}/agenda-concluir/${eventId}`, {
    }).then(response => {
      console.log(response)
      atualizar()
    });
  }

  // Deletar evento por id
  const handleDeleteEvent = (eventId) => {
    axios.delete(`${API_URL}/agenda/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      console.log(response)
      atualizar()
    });
  }


  // Editar evento
  const handleEditEvent = (eventId, eventName, eventDate) => {
    setEditar(true);
    setModalVisible(true);
    setNewEventTitle(eventName);
    let data = `${eventDate.substring(8, 10)}/${eventDate.substring(5, 7)}/${eventDate.substring(0, 4)}`
    data = data.split('/').join('-')
    console.log(data)
    setNewEventDate(data);
    setIdEvento(eventId);
  }

  // Atualizar evento
  const handlePUTEdit = (editedEvent) => {
    if (newEventTitle.trim() !== '' && newEventDate.trim() !== '') {
      const newEvent = {
        id: eventos.length + 1,
        title: newEventTitle,
        date: newEventDate,
        completed: false,
      }

      //inverte a data para o formato do banco de dados
      // passa de DD-MM-YYYY para YYYY-MM-DD
      const dataNaoInvertida = newEvent.date.split('-')
      const dataInvertida = dataNaoInvertida.reverse().join('-')

      axios.put(`${API_URL}/agenda/${idEvento}`, {
        idAlunoAgenda: idAluno,
        tituloAgenda: newEvent.title,
        descricaoAgenda: ".",
        dataAgenda: dataInvertida,
        concluidoAgenda: false,
        corAgenda: "#FFF",
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        console.log(response)
        atualizar()
      });


      setNewEventTitle('');
      setNewEventDate('');
      setModalVisible(false);
    }

  }

  // Adicionar evento
  const handleAddEvent = () => {
    if (newEventTitle.trim() !== '' && newEventDate.trim() !== '') {
      const newEvent = {
        id: eventos.length + 1,
        title: newEventTitle,
        date: newEventDate,
        completed: false,
      }

      //inverte a data para o formato do banco de dados
      // passa de DD-MM-YYYY para YYYY-MM-DD
      const dataNaoInvertida = newEvent.date.split('-')
      const dataInvertida = dataNaoInvertida.reverse().join('-')

      axios.post(`${API_URL}/agenda`, {
        idAlunoAgenda: idAluno,
        tituloAgenda: newEvent.title,
        descricaoAgenda: ".",
        dataAgenda: dataInvertida,
        concluidoAgenda: false,
        corAgenda: "#FFF",
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        console.log(response)
        atualizar()
      });


      setNewEventTitle('');
      setNewEventDate('');
      setModalVisible(false);
    }
  }


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setNewEventTitle('');
    setNewEventDate('');
    setEditar(false);
  }

  const renderItem = ({ item }) => (
    <>
      <View style={styles.eventItem}>
        <Ionicons
          name={item.completed ? 'checkbox' : 'checkbox-outline'}
          size={24}
          color="#593B7F"
          onPress={() => handleToggleComplete(item.id)}
        />
        <View style={styles.eventInfo}>

          <Text style={styles.eventText}>{item.title}</Text>
          <Text style={styles.eventText}>{`${item.date.substring(8, 10)}/${item.date.substring(5, 7)}/${item.date.substring(0, 4)}`}</Text>
        </View>
        <Pressable onPress={() => handleEditEvent(item.id, item.title, item.date)}>
          <MaterialIcons name="edit" size={24} color="#593B7F" />
        </Pressable>
        <Pressable onPress={() => handleDeleteEvent(item.id)}>
          <Ionicons name="trash" size={24} color="#593B7F" />
        </Pressable>
      </View>
    </>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agenda Personalizada</Text>
        <Pressable style={styles.addButton} onPress={toggleModal}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>
      </View>

      <FlatList
        data={eventos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible)
        }}
      >

        {/* Conteúdo do Modal de Adição de Evento */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nome do Evento"
              value={newEventTitle}
              onChangeText={(text) => setNewEventTitle(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Data do Evento (DD-MM-YYYY)"
              value={newEventDate}
              onChangeText={(text) => setNewEventDate(text)}
            />

            {editar ? (
              <Pressable onPress={handlePUTEdit} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Editar</Text>
              </Pressable>
            ) : (
              <Pressable onPress={handleAddEvent} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Adicionar</Text>
              </Pressable>
            )}
            <Pressable onPress={toggleModal} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AgendaPersonalizadaScreen
