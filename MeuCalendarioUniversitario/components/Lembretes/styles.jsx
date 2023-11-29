import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F0FEFF',
    // backgroundColor: '#F3EAFF',
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 15,
    color: '#000',
    textAlign: 'left',
  },

  addButton: {
    backgroundColor: '#059669',
    padding: 10,
    borderRadius: 5,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  eventText: {
    // color: '#000',
    color: '#fff',
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#059669",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  eventInfo: {
    flex: 1,
    marginLeft: 10,
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },

  input: {
    backgroundColor: '#FFFFFF',
    color: '#000',
    fontWeight: 'bold',
    height: 40,
    borderColor: 'gray',
    width: '10%',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    paddingLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: '#059669',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },

})
