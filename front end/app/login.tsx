import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginUser } from "@/components/api/userAPI";
import HeadIcon from "@/components/HeadIcon";
import loginPagesStyle from "@/app/styles/loginPagesStyle";
import { useUser } from "@/components/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { setUser } = useUser();

  const onPressLogin = async () => {
    if (!username || !password) {
      setError("Username and Password cannot be empty.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const loginResponse = await loginUser({ username, password });
      console.log("🧩 loginResponse:", loginResponse);

      if (
        loginResponse.length > 0 &&
        loginResponse[0]?.message?.toLowerCase().includes("success")
      ) {
        const user = loginResponse[0].user;

        if (user && user.id) {
          try {
            await AsyncStorage.setItem("currentUser", JSON.stringify(user));
            setUser({ ...user, id: parseInt(user.id) });
            console.log("✅ currentUser：", user);
          } catch (storageError) {
            console.warn("⚠️error", storageError);
          }

          router.replace({
            pathname: "/(tabs)/profile",
            params: { userId: user.id.toString() },
          });
        } else {
          setError("Login failed: Invalid user.");
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <ImageBackground
    source={require("@/assets/images/signInBG.png")}
    style={loginPagesStyle.backgroundImage}
    resizeMode="cover">
              {/* header */}
      <View style={[loginPagesStyle.header, { width: '100%', paddingHorizontal: 20 }]}>
          <HeadIcon />
        <View style={loginPagesStyle.headerright}>
          <TouchableOpacity onPress={() => router.push("/explore")}>
            <Text style={{ marginRight: 15 }}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ marginRight: 15 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={loginPagesStyle.container}>

          {/* login form */}
          <View style={loginPagesStyle.card}>
            <Text style={loginPagesStyle.loginText}>
              Discover Dublin, Your Way – Explore Routes & Capture Your Day!
            </Text>

            
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

              {error ? (
                <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
              ) : null}

              <TouchableOpacity
                style={loginPagesStyle.submitButton}
                onPress={onPressLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={loginPagesStyle.submitText}>Sign In</Text>
                )}
              </TouchableOpacity>
          </View>
      </View>
    </ImageBackground>
  );
}
