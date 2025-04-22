import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
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
    <View style={{ flex: 1, flexDirection: "column", padding: 20 }}>
      {/* header */}
      <View style={loginPagesStyle.header}>
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

      {/* main content */}
      <View style={{ flex: 4, flexDirection: "row" }}>
        {/* login form */}
        <View style={loginPagesStyle.body}>
          <Text style={loginPagesStyle.loginText}>
            Discover Dublin, Your Way – Explore Routes & Capture Your Day!
          </Text>

          <View style={{ width: "50%" }}>
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
                <Text style={loginPagesStyle.submitText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* right image */}
        <View style={loginPagesStyle.body}>
          <Image
            source={require("../assets/images/react-logo.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
      </View>
    </View>
  );
}
