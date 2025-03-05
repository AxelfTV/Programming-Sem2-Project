import React from "react";
import { View, Text, TextInput, Button, Image, StyleSheet ,TouchableOpacity} from "react-native";
import HeadIcon from '@/components/HeadIcon'; 

import loginPagesStyle from "@/app/styles/loginPagesStyle"


const onPressSignUp=()=>{
    console.log("SignUp");
}

export default function signup () {

  return (
    <View style={loginPagesStyle.container}>

      <View style={loginPagesStyle.header}>
      <HeadIcon  />
      </View>
      
      {/* main contents */}
        <View style={loginPagesStyle.body}>

          <Text style={loginPagesStyle.loginText}> Create your profile to start</Text>

            <View style={{width:"33%"}}>
          <Text>Username</Text>
          <TextInput style={loginPagesStyle.input} placeholder="Enter username" />
          <Text>Password</Text>
          <TextInput style={loginPagesStyle.input} secureTextEntry placeholder="Enter password" />
          <TouchableOpacity style={loginPagesStyle.submitButton} onPress={onPressSignUp}>
        <Text style={loginPagesStyle.submitText}>Submit</Text>
      </TouchableOpacity>
            </View>
        </View>

    </View>
  );
};

