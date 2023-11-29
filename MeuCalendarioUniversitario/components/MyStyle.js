import { StyleSheet } from "react-native"

const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FEFF',
        // backgroundColor: "#F3EAFF",
    },
    menu: {
        flex: 1,
        padding: 20,
    },
    redirectButton: {
        backgroundColor: "#059669",
        padding: 10,
        color: "#fff",
        textAlign: "center",
        borderRadius: 5,
        margin: 10,
    },
    textoPressable: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "center",
    },
    title: {
        fontSize: 22,
        textAlign: "left",
    },
    subtitle: {
        fontSize: 13,
        marginTop: 10,
        textAlign: "left",
    },
    boasvindas: {
        flexDirection: "row",
        alignItems: "left",
        width: "100%",
    },
    textos: {
        //in column
        margin: 20,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "left",
    },
    calendario: {
        height: 60,
        width: 80,
        marginTop: 25,
    },
    notificacoes: {
        alignSelf: "flex-end",
        margin: 20,
    }
})

export default myStyle