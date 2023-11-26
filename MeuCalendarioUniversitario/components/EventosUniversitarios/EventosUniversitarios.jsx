import React from "react";
import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import axios from "axios";

const EventosUniversitarios = () => {
	const [janeiro, setJaneiro] = React.useState([])
	const [fevereiro, setFevereiro] = React.useState([])
	const [marco, setMarco] = React.useState([])
	const [abril, setAbril] = React.useState([])
	const [maio, setMaio] = React.useState([])
	const [junho, setJunho] = React.useState([])
	const [julho, setJulho] = React.useState([])
	const [agosto, setAgosto] = React.useState([])
	const [setembro, setSetembro] = React.useState([])
	const [outubro, setOutubro] = React.useState([])
	const [novembro, setNovembro] = React.useState([])
	const [dezembro, setDezembro] = React.useState([])


	const atualizar = () => {
		const URL_CALENDARIO = "https://cors-anywhere.herokuapp.com/https://www.ufc.br/calendario-universitario/2023-resol-n-01-cepe-de-02-02-2023"
		//faz um get e pega o html
		axios.get(URL_CALENDARIO).then((response) => {
			//pega o html
			let meses = [{ numero: 1, nome: "janeiro", eventos: janeiro }, { numero: 2, nome: "fevereiro", eventos: fevereiro }, { numero: 3, nome: "marco", eventos: marco }, { numero: 4, nome: "abril", eventos: abril }, { numero: 5, nome: "maio", eventos: maio }, { numero: 6, nome: "junho", eventos: junho }, { numero: 7, nome: "julho", eventos: julho }, { numero: 8, nome: "agosto", eventos: agosto }, { numero: 9, nome: "setembro", eventos: setembro }, { numero: 10, nome: "outubro", eventos: outubro }, { numero: 11, nome: "novembro", eventos: novembro }, { numero: 12, nome: "dezembro", eventos: dezembro }]
			meses.forEach((mesReferencia) => {
				console.log(mesReferencia.numero)

				const html = response.data
				//pega a tabela
				// vai de 1 ate 12 para cobrir todos os meses

				let table = html.split('<table class="category"')[mesReferencia.numero].split("</table>")[0]
				//pega as linhas da tabela
				let linhas = table.split('<tr class="item">')
				// //pega as colunas de cada linha
				let colunas = linhas.map((linha) => linha.split('<td class="cell">'))
				// //pega os janeiro de cada coluna
				colunas.shift()
				let mes = colunas.map((coluna) => {
					//remove <br /> <em> </em> e <strong> </strong> </tr> </td>
					let valueEvento = coluna[2].split("<br />")[0].replace("<em>", "").replace("</em>", "").replace("<strong>", "").replace("</strong>", "").replace("</td>", "").replace("</tr>", "").replace("<br />", "").replace("<br/>", "").replace("</tboby>", "")

					//so retorna se tiver um "(evento)" na string valueEvento
					if (valueEvento.includes("(Evento)") || valueEvento.includes("Encontro") || valueEvento.includes("Semana") || valueEvento.includes("Congresso")) {
						return {
							data: coluna[1].split("</td>")[0],
							evento: valueEvento,
						}
					} else {
						return {
							data: "",
							evento: "",
						}
					}



				})
				if (mesReferencia.numero == 1) {
					mes = mes.filter((obj) => obj.data != "")
					setJaneiro(mes)
					console.log(mes)
				}
				else if (mesReferencia.numero == 2) {
					mes = mes.filter((obj) => obj.data != "")
					setFevereiro(mes)
				}
				else if (mesReferencia.numero == 3) {
					mes = mes.filter((obj) => obj.data != "")
					setMarco(mes)
				}
				else if (mesReferencia.numero == 4) {
					mes = mes.filter((obj) => obj.data != "")
					setAbril(mes)
				}
				else if (mesReferencia.numero == 5) {
					mes = mes.filter((obj) => obj.data != "")
					setMaio(mes)
				}
				else if (mesReferencia.numero == 6) {
					mes = mes.filter((obj) => obj.data != "")
					setJunho(mes)
				}
				else if (mesReferencia.numero == 7) {
					mes = mes.filter((obj) => obj.data != "")
					setJulho(mes)
				}
				else if (mesReferencia.numero == 8) {
					mes = mes.filter((obj) => obj.data != "")
					setAgosto(mes)
				}
				else if (mesReferencia.numero == 9) {
					mes = mes.filter((obj) => obj.data != "")
					setSetembro(mes)
				}
				else if (mesReferencia.numero == 10) {
					mes = mes.filter((obj) => obj.data != "")
					setOutubro(mes)
				}
				else if (mesReferencia.numero == 11) {
					mes = mes.filter((obj) => obj.data != "")
					setNovembro(mes)
				}
				else if (mesReferencia.numero == 12) {
					mes = mes.filter((obj) => obj.data != "")
					setDezembro(mes)
				}

			})




		}
		)
	}
	React.useEffect(() => {
		atualizar()
	}
		, [])

	const renderItem = ({ item }) => (
		<View style={styles.eventItem}>
			<Ionicons name="school" size={24} color="#593B7F" />
			<View style={styles.aulaInfo}>
				<Text style={styles.eventText}>{item.data}</Text>
				<Text>{`${item.evento}`}</Text>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Calendário Universitário</Text>
				<Pressable style={styles.addButton} onPress={atualizar}>
					<Text style={styles.addButtonText}>Atualizar</Text>
				</Pressable>
			</View>
			<ScrollView>
				<View>

					<Text style={styles.title}> JANEIRO </Text>
					<FlatList data={janeiro} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> FEVEREIRO </Text>
					<FlatList data={fevereiro} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> MARCO </Text>
					<FlatList data={marco} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> ABRIL </Text>
					<FlatList data={abril} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> MAIO </Text>
					<FlatList data={maio} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> JUNHO </Text>
					<FlatList data={junho} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> JULHO </Text>
					<FlatList data={julho} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> AGOSTO </Text>
					<FlatList data={agosto} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> SETEMBRO </Text>
					<FlatList data={setembro} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> OUTUBRO </Text>
					<FlatList data={outubro} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> NOVEMBRO </Text>
					<FlatList data={novembro} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />
					<Text style={styles.title}> DEZEMBRO </Text>
					<FlatList data={dezembro} renderItem={renderItem} keyExtractor={item => item.evento.toString()} />

				</View>
			</ScrollView>
		</View>
	);
};

export default EventosUniversitarios;
