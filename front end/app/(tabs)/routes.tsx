import React, { useEffect,useState } from "react";
import { View, Text, ScrollView } from "react-native";
import RouteCard from "@/components/RouteCard";
import styles from "@/app/styles/Styles";
import Header from "@/components/RouteHeader";
import {getAllRoutes,getRoute} from "@/components/api/routeAPI";
import { router } from "expo-router";

const API_URL = "https://2425-cs7025-group4.scss.tcd.ie/";



const RoutesScreen = () => {

const [routesDisplay, setroutesDisplay] = useState< { id: string; routename: string; routeImage: string }[]>([]);
useEffect(() => {
  async function GetAllRoutes() {
    const routes=await getAllRoutes();
    const DisplayRoutes=await Promise.all(      
      routes.map(async (route) => {
        console.log("route name"+route.name);
        const routeInfo=await getRoute(Number(route.id));
        return{
          id: route.id.toString(),
          routename: route.name,
          routeImage: routeInfo&&routeInfo[0]?"": `${API_URL}${routeInfo[0].locations[0].image_src}`,
        };
      })
    );
    setroutesDisplay(DisplayRoutes);
  }
  GetAllRoutes();
},[]);



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Header />

    <View style={styles.routeContainer}>
      {/* Routes based on your interests */}
      <Text style={styles.sectionTitle}>Routes based on your interests</Text>
      <View style={styles.cardGrid}>
        {routesDisplay.slice(0, 3).map((route) => (
          <RouteCard
            key={route.id}
            id={route.id}
            image={route.routeImage}
            name={route.routename}
            rating={2.0} 
            onPress={() => router.push({ pathname: "/routeSelect", params: { routeId: route.id } })} // 传递跳转逻辑
          />
        ))}
      </View>

      {/* all routes */}
      <Text style={styles.sectionTitle}>All routes</Text>
      <View style={styles.cardGrid}>
        {routesDisplay.map((route) => (
          <RouteCard
            key={route.id}
            id={route.id}
            image={route.routeImage}
            name={route.routename}
            rating={2.0}
            onPress={() => router.push({ pathname: "/routeSelect", params: { routeId: route.id } })} // 传递跳转逻辑
          />
        ))}
      </View>
    </View>
  </ScrollView>
);
};

export default RoutesScreen;
