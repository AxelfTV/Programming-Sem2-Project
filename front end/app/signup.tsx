import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,        // ← import this
} from "react-native";
import { useRouter } from "expo-router";

import HeadIcon from "@/components/HeadIcon";
import { addUser } from "@/components/api/userAPI";
import loginPagesStyle from "@/app/styles/loginPagesStyle";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onPressSignUp = async () => {
    if (!username || !password) {
      setError("Username and Password cannot be empty.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await addUser({ username, password });
      router.replace("/login");
      return;
    } catch (e) {
      console.error("Signup error:", e);
      setError("Failed to sign up. Please try again.");
    }

    setLoading(false);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/signInBG.png")}
      style={loginPagesStyle.backgroundImage}
      resizeMode="cover"
    >
      {/* Header */}
      <View style={loginPagesStyle.header}>
        <HeadIcon />
      </View>

      {/* Centered Card */}
      <View style={loginPagesStyle.container}>
        <View style={loginPagesStyle.card}>
          <Text style={loginPagesStyle.loginText}>
            Create your profile to start
          </Text>

          <TextInput
            style={loginPagesStyle.input}
            placeholder="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={loginPagesStyle.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? (
            <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
          ) : null}

          <TouchableOpacity
            style={loginPagesStyle.submitButton}
            onPress={onPressSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={loginPagesStyle.submitText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
