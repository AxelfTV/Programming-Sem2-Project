import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  headerright: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    width: width * 0.8,               
    maxWidth: 600,
    maxHeight: 600,
    backgroundColor: "#FCE2A9",
    borderRadius: 16,
    padding: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  loginText: {
    color: "#1E293B",                 
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    width: "80%"
  },
  submitButton: {
    backgroundColor: "#F97316",       
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 8,
    width: "80%"
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
