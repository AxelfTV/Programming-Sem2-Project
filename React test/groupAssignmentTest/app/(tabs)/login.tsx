import React from "react";
import { View, Text, TextInput, Button, Image, StyleSheet,TouchableOpacity } from "react-native";
import {Link} from 'expo-router';

import HeadIcon from '@/components/HeadIcon'; 
import loginPagesStyle from "@/app/styles/loginPagesStyle"

const imagePath = require("../../assets/images/react-logo.png");
const onPressLogin=()=>{
    console.log("login");
}

export default function login () {

  return (
    <View style={{ flex: 1, flexDirection: "column", padding: 20 }}>
      {/* nacigation on the top*/}
      <View style={loginPagesStyle.header}>
        <HeadIcon  />
        <View style={loginPagesStyle.headerright}>
          <Link href="/explore"><Text style={{ marginRight: 15 }}>About</Text>
          </Link>           
          <Link href="/signup"><Text style={{ marginRight: 15 }}>Sign Up</Text>
          </Link>
        </View>
      </View>
      
      {/* main content */}
      <View style={{ flex: 4, flexDirection: "row" }}>
        {/* login an left */}
        <View style={loginPagesStyle.body}>
   
          <Text style={loginPagesStyle.loginText}> Discover Dublin, Your Way – Explore Routes & Capture Your Day!</Text>

            <View style={{width: "50%"}}>
          <Text>Username</Text>
          <TextInput style={loginPagesStyle.input} placeholder="Enter username" />
          <Text>Password</Text>
          <TextInput style={loginPagesStyle.input} secureTextEntry placeholder="Enter password" />

          <TouchableOpacity style={loginPagesStyle.submitButton} onPress={onPressLogin}>
        <Text style={loginPagesStyle.submitText}>Submit</Text>
      </TouchableOpacity>

            </View>
        </View>
        
        {/* picture at right */}
        <View style={loginPagesStyle.body}>
          <Image source={imagePath} style={{ width: 300, height: 300 }} />
        </View>
      </View>
    </View>
  );
};


