import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import HeadIcon from "@/components/HeadIcon";
import loginPagesStyle from "@/app/styles/loginPagesStyle";
import { addUser } from "@/components/api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onPressSignUp = async () => {
    if (!username || !password) {
      setError("Username and Password cannot be empty.");
      return;
    }

    setError("");

    try {
      await addUser({ username, password });
      console.log("Sign up successful! Navigating to /login...");
      router.push("/login");
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <View style={loginPagesStyle.container}>
      <View style={loginPagesStyle.header}>
        <HeadIcon />
      </View>

      <View style={loginPagesStyle.body}>
        <Text style={loginPagesStyle.loginText}>
          Create your profile to start
        </Text>

        <View style={{ width: "33%" }}>
          <Text>Username</Text>
          <TextInput
            style={loginPagesStyle.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />
          <Text>Password</Text>
          <TextInput
            style={loginPagesStyle.input}
            secureTextEntry
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
          />
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
          <TouchableOpacity
            style={loginPagesStyle.submitButton}
            onPress={onPressSignUp}
          >
            <Text style={loginPagesStyle.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
