import { StyleSheet } from "react-native"

const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontWeight: "bold",
        fontSize: 25,
        color: "brown",
        paddingBottom: 100,
    },
    input: {
        width: 300,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        padding: 10
    },
    dados: {
        fontWeight: "bold",
        fontSize: 20,
    },
    sobre: {
        fontSize: 12,
        width: 600,
    },
    quadro: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }

})

export default myStyle