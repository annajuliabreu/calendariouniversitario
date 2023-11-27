import React, { useState } from "react";
import { View, Text, Pressable, FlatList, Modal, TextInput } from "react-native";
import { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { API_URL } from '@env'
import axios from "axios";
let token = localStorage.getItem("token")
let idAluno = localStorage.getItem("idAluno")

const TelaAulas = () => {
	useEffect(() => {
		atualizar()
	}, []);

	const [aulas, setAulas] = useState([]);

	const atualizar = () => {
		if (token == null || idAluno == null) {
			token = localStorage.getItem("token")
			idAluno = localStorage.getItem("idAluno")
		}

		axios.get(`${API_URL}/calendario-aluno/${idAluno}`, {
			headers: { Authorization: `Bearer ${token}` }
		}).then(response => {
			let aulasAPI = []
			response.data.forEach(aula => {
				let horario_intermediario = aula.horario_calendario.replace(/'/g, '"')
				horario_intermediario = JSON.parse(horario_intermediario)
				aulasAPI.push({
					id: aula.id_calendario,
					disciplina: aula.nome_disciplina_calendario,
					horarios: horario_intermediario,
					professor: aula.nome_professor_calendario,
					sala: aula.sala_calendario,
					bloco: aula.bloco_calendario,
				})
			}
			)
			setAulas(aulasAPI)
		});
	}



	const [isModalVisible, setModalVisible] = useState(false);
	const [novaDisciplina, setNovaDisciplina] = useState("");
	const [novosHorarios, setNovosHorarios] = useState("");
	const [novoProfessor, setNovoProfessor] = useState("");
	const [novaSala, setNovaSala] = useState("");
	const [novoBloco, setNovoBloco] = useState("");
	const [editar, setEditar] = useState(false);
	const [aulaId, setAulaId] = useState("");

	const handleDeleteAula = aulaId => {
		axios.delete(`${API_URL}/calendario/${aulaId}`, {
			headers: { Authorization: `Bearer ${token}` }
		}).then(response => {
			console.log(response)
			atualizar();
		});
	};

	const handleEditAula = (aulaId, disciplina, horarios, professor, sala, bloco) => {
		setEditar(true);
		setModalVisible(true);
		setAulaId(aulaId);
		setNovaDisciplina(disciplina);
		setNovosHorarios(horarios.join(", "));
		setNovoProfessor(professor);
		setNovaSala(sala);
		setNovoBloco(bloco);
	};

	const handleSaveAula = () => {
		if (novaDisciplina.trim() !== "" && novosHorarios.trim() !== "" && novoProfessor.trim() !== "" && novaSala.trim() !== "" && novoBloco.trim() !== "") {
			const novosHorariosArray = novosHorarios.split(", ").map(horario => horario.trim());
			const novaAula = {
				disciplina: novaDisciplina,
				horarios: novosHorariosArray,
				professor: novoProfessor,
				sala: novaSala,
				bloco: novoBloco,
			};

			let stringHorarios = JSON.stringify(novaAula.horarios)
			stringHorarios = stringHorarios.replace(/"/g, "'")
			axios.post(`${API_URL}/calendario`, {
				idAlunoCalendario: idAluno,
				horarioCalendario: stringHorarios,
				nomeDisciplinaCalendario: novaAula.disciplina,
				nomeProfessorCalendario: novaAula.professor,
				salaCalendario: novaAula.sala,
				blocoCalendario: novaAula.bloco
			}, {
				headers: { Authorization: `Bearer ${token}` }
			}).then(response => {
				console.log(response)
			});


			setModalVisible(false);
			// Limpar os campos do modal após salvar
			setNovaDisciplina("");
			setNovosHorarios("");
			setNovoProfessor("");
			setNovaSala("");
			setNovoBloco("");
			//espera 1 segundo para atualizar a tela
			setTimeout(() => {
				atualizar();
			}
				, 1000);
		}
	};

	const handleEditarAula = () => {
		if (novaDisciplina.trim() !== "" && novosHorarios.trim() !== "" && novoProfessor.trim() !== "" && novaSala.trim() !== "" && novoBloco.trim() !== "") {
			const novosHorariosArray = novosHorarios.split(", ").map(horario => horario.trim());
			const novaAula = {
				disciplina: novaDisciplina,
				horarios: novosHorariosArray,
				professor: novoProfessor,
				sala: novaSala,
				bloco: novoBloco,
			};

			let stringHorarios = JSON.stringify(novaAula.horarios)
			stringHorarios = stringHorarios.replace(/"/g, "'")

			axios.put(`${API_URL}/calendario/${aulaId}`, {
				idAlunoCalendario: idAluno,
				horarioCalendario: stringHorarios,
				nomeDisciplinaCalendario: novaAula.disciplina,
				nomeProfessorCalendario: novaAula.professor,
				salaCalendario: novaAula.sala,
				blocoCalendario: novaAula.bloco
			}, {
				headers: { Authorization: `Bearer ${token}` }
			}).then(response => {
				console.log(response)
			});


			setModalVisible(false);

			// Limpar os campos do modal após salvar
			setNovaDisciplina("");
			setNovosHorarios("");
			setNovoProfessor("");
			setNovaSala("");
			setNovoBloco("");
			atualizar();
			atualizar();


		}
	};

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
		setNovaDisciplina("");
		setNovosHorarios("");
		setNovoProfessor("");
		setNovaSala("");
		setNovoBloco("");
		setEditar(false);

	};

	const renderItem = ({ item }) => (

		<View style={styles.eventItem}>
			<Ionicons name="school" size={24} color="#593B7F" />
			<View style={styles.aulaInfo}>
				<Text style={styles.eventText}>{item.disciplina}</Text>
				<Text>{`Horários: ${item.horarios.join(", ")}`}</Text>
				<Text>{`Professor: ${item.professor}`}</Text>
				<Text>{`Sala: ${item.sala} ${item.bloco}`}</Text>
			</View>
			<Pressable onPress={() => handleEditAula(item.id, item.disciplina, item.horarios, item.professor, item.sala, item.bloco)}>
				<Ionicons name="create-outline" size={24} color="#593B7F" />
			</Pressable>
			<Pressable onPress={() => handleDeleteAula(item.id)}>
				<Ionicons name="trash-outline" size={24} color="#593B7F" />
			</Pressable>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Aulas</Text>
				<Pressable style={styles.addButton} onPress={toggleModal}>
					<Text style={styles.addButtonText}>Adicionar</Text>
				</Pressable>
			</View>

			<FlatList data={aulas} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
			<Modal
				animationType="slide"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => {
					setModalVisible(!isModalVisible);
				}}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<TextInput style={styles.input} placeholder="Disciplina" value={novaDisciplina} onChangeText={text => setNovaDisciplina(text)} />
						<TextInput style={styles.input} placeholder="Horários (separados por vírgula)" value={novosHorarios} onChangeText={text => setNovosHorarios(text)} />
						<TextInput style={styles.input} placeholder="Professor" value={novoProfessor} onChangeText={text => setNovoProfessor(text)} />
						<TextInput style={styles.input} placeholder="Sala" value={novaSala} onChangeText={text => setNovaSala(text)} />
						<TextInput style={styles.input} placeholder="Bloco" value={novoBloco} onChangeText={text => setNovoBloco(text)} />
						{editar ? (
							<Pressable onPress={handleEditarAula} style={styles.saveButton}>
								<Text style={styles.saveButtonText}>Editar</Text>
							</Pressable>
						) : (
							<Pressable onPress={handleSaveAula} style={styles.saveButton}>
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
	);
};

export default TelaAulas;
