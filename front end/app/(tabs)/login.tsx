import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { getUsers } from "@/components/api";
import HeadIcon from "@/components/HeadIcon";
import loginPagesStyle from "@/app/styles/loginPagesStyle";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onPressLogin = async () => {
    if (!username || !password) {
      setError("Username and Password cannot be empty.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await getUsers();
      console.log("Fetched Users:", response);

      if (!response || !response.data || response.data.length === 0) {
        setError("No users found.");
        setLoading(false);
        return;
      }

      // Username handles case and spaces,  password is converted to a string
      const user = response.data.find(
        (u) =>
          u.username.trim().toLowerCase() === username.trim().toLowerCase() &&
          String(u.password) === String(password)
      );

      console.log("Matched User:", user);

      if (user) {
        console.log("Login successful, navigating to profile...");
        router.push("/profile");
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1, flexDirection: "column", padding: 20 }}>
      {/* navigator */}
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

      {/* main */}
      <View style={{ flex: 4, flexDirection: "row" }}>
        {/* left login form */}
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
            source={require("../../assets/images/react-logo.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
      </View>
    </View>
  );
}
