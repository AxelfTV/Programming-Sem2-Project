import { StyleSheet } from "react-native";

const loginPagesStyle = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center", 
      },
      header: {
          flexDirection: "row",
          justifyContent: "space-between", 
          alignItems: "center", 
          paddingVertical: 10,
      },
      headerleft:
      {
        flex: 1,
        padding: 20,
        flexDirection:"row",
        justifyContent: "flex-start",
      },
      headerright:
      {
        flex: 1,
        padding: 20,
        flexDirection:"row",
        justifyContent: "flex-end",
      },
      body: {
        flex: 1,
        flexDirection:"column",
        justifyContent: "center", 
        alignItems: "center", 
      },
      loginText: {
        color: "#808080",
        fontSize: 30,
        marginBottom: 20,
        textAlign: "center",
      },
      input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        width: "100%", 
      },



      optionButton: {
        width: "100%", 
        paddingVertical: 12, 
        borderWidth: 2, 
        borderColor: "purple", 
        borderRadius: 10, 
        backgroundColor: "#fff", 
        alignItems: "center", 
        marginVertical: 5, 
      },
      optionText: {
        color: "purple",
        fontSize: 16,
        fontWeight: "bold",
      },
      selectedOption: {
        backgroundColor: "purple", 
      },
      submitButton:
      {
        width: "100%", 
        paddingVertical: 12, 
        borderWidth: 2, 
        borderColor: "purple", 
        borderRadius: 10, 
        backgroundColor: "purple", 
        alignItems: "center", 
        marginVertical: 5, 
      },
      submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      }
});

export default loginPagesStyle;