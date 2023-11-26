import { StyleSheet } from "react-native";

export default StyleSheet.create({
	// AULAS SCREEN

	eventItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		padding: 10,
		marginVertical: 8,
		borderRadius: 5,
	},

	eventText: {
		color: "#593B7F",
		fontSize: 16,
	},

	aulaInfo: {
		flex: 1,
		marginLeft: 10,
	},

	// ... outros estilos ...

	container: {
		flex: 1,
		backgroundColor: "#F3EAFF",
		padding: 16,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#593B7F",
	},

	addButton: {
		backgroundColor: "#593B7F",
		padding: 10,
		borderRadius: 5,
	},

	addButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
	},

	eventItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		padding: 10,
		marginVertical: 8,
		borderRadius: 5,
	},

	eventText: {
		color: "#593B7F",
		fontSize: 16,
	},

	editButton: {
		color: "#593B7F",
		fontSize: 16,
	},

	deleteButton: {
		color: "#593B7F",
		fontSize: 16,
	},

	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	modalContent: {
		backgroundColor: "#FFFFFF",
		padding: 20,
		borderRadius: 10,
		width: "80%",
	},

	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingLeft: 8,
	},

	saveButton: {
		backgroundColor: "#593B7F",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},

	saveButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		textAlign: "center",
	},
});
