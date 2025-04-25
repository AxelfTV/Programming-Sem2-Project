import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  nav: {
    flexDirection: "row",
    width: 290,
  },
  navLink: {
    marginLeft: 25,
    fontSize: 16,
    color: "#AAA",
    fontWeight: "bold",
  },
  activeLink: {
    color: "#E9A826",
    fontWeight: "bold",
  },

  /* ====== Profile ====== */
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 40,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginBottom: 5,
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2D0C57",
    textTransform: "uppercase",
  },
  achievementCard: {
    paddingVertical: 40,
    paddingHorizontal: 180,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 250,
  },
  achievementText: {
    fontSize: 16,
    color: "#333",
  },  followButton:{},
  followButtonText:{},
  editButton:{},
  editButtonText:{},
  signOut:{},
  signOutText:{},


gridItem: {
  width: "48%",
  margin: "1%",
  backgroundColor: "#fff",
  borderRadius: 12,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  marginBottom: 10,
},

gridImage: {
  width: "100%",
  height: 150,
  resizeMode: "cover",
},

imageMeta: {
  paddingHorizontal: 8,
  paddingVertical: 4,
  fontSize: 12,
  color: "#666",
},
imageGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  paddingHorizontal: 8,
  marginTop: 16,
},



  /*Edit */
  editSection: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginTop: 10,
  },
  bioInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    minHeight: 60,
    backgroundColor: "white",
  },
  imagePickerButton: {
    backgroundColor: "rgb(238, 163, 0)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "rgb(238, 163, 0)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  
  editTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  
  selectImageButton: {
    backgroundColor:"rgb(238, 163, 0)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  
  
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  
  
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  
  

  /*follow List */
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonActive: {
    borderBottomColor: "#2D0C57", 
  },
  tabText: {
    fontSize: 16,
    color: "#2D0C57",
    fontWeight: "bold",
  },
  /* ====== ====== */
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 140,
  },
  imageContainer: {
    flex: 1,
    margin: 20,
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholder: {
    backgroundColor: "#DDD",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  /* ====== Modal  ====== */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 13, 26, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flexDirection: "row",
    width: "80%",
    height: "80%",
    borderRadius: 15,
    overflow: "hidden",
  },
  modalImage: {
    width: "50%",
    height: "100%",
    aspectRatio: 1.5,
    borderRadius: 12,
    resizeMode: "contain",
  },
  modalTextContainer: {
    width: "50%",
    padding: 40,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#f0a500",
  },
  modalDate: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  modalRoute: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5,
  },
  modalDescription: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 10,
  },

  /* ====== Route ====== */
  routeContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#17104F",
    marginBottom: 40,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    width: 380,
    minHeight: 480,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 250,
    aspectRatio: 1.5,
    borderRadius: 12,
    resizeMode: "contain",
  },
  cardContent: {
    padding: 30,
    flex: 1,
    justifyContent: "space-between", //
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#17104F",
  },
  cardRating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f4a261",
  },
  cardDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  goButton: {
    maxWidth: 150,
    marginTop: 12,
    backgroundColor: "#f4a261",
    paddingVertical: 10,
    borderRadius: 20, //
    alignItems: "center",
  },
  goButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },

  /* ====== Current Route ====== */

  MapContent: {
    flexDirection: "row",
    padding: 0,
    margin: 0,
  },
  mapImage: {
    marginLeft: 50,
    width: "50%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  RouteContainer: {
    width: "40%",
    marginLeft: 50,
  },
  routeTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#17104F",
  },
  destinationBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 450,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedDestinationBox: {
    borderColor: "#F4A261",
    backgroundColor: "#FDF5E6",
  },
  uploadButton: {
    backgroundColor: "#F4A261",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  uploadText: {
    color: "white",
    fontWeight: "bold",
  },
  uploadedImage:{
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  finishButton:{
    backgroundColor: "#F4A261",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },

  //==========home page============//
  followerSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  followerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  followerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  followerName: {
    fontSize: 16,
    fontWeight: "500",
  },

  imageGallery: {
    marginTop: 20,
  },
  imageCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  imageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  imageDate: {
    marginLeft: "auto",
    fontSize: 12,
    color: "#888",
  },
  homepageimage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  imageFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageLocation: {
    fontSize: 14,
    fontWeight: "500",
  },
  imageRoute: {
    fontSize: 14,
    color: "#007bff",
  },

});

export default styles;
