// app/rateRoute.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@/components/UserContext";
import { rateRoute } from "@/components/api/contentAPI";

export default function RateRoute() {
const { routeId } = useLocalSearchParams<{ routeId: string }>();
const router = useRouter();
const { user } = useUser();
const [rating, setRating] = useState<number>(0);
const [submitting, setSubmitting] = useState(false);

    const handleStarPress = (star: number) => {
    setRating(star);
    };

    const handleSubmit = async () => {
        if (!user?.id || !routeId || rating < 1) {
        Alert.alert("Error", "Please select a rating before submitting.");
        return;
        }
        setSubmitting(true);
        const success = await rateRoute(user.id, Number(routeId), rating);
        setSubmitting(false);

        if (success) {
        Alert.alert("Thanks!", "Your rating has been recorded.");
            await router.push({
                pathname: "/profile",          // not "/(tabs)/profile"
                params: { userId: user.id.toString() },
              });
            } else {
              Alert.alert("Error", "Failed to submit rating. Please try again.");
            }
          };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>How would you rate this route?</Text>
        <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                <Text style={[styles.star, i <= rating ? styles.filled : styles.empty]}>
                ★
                </Text>
            </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity
            style={[styles.button, rating < 1 && styles.disabled]}
            onPress={handleSubmit}
            disabled={submitting || rating < 1}
        >
            {submitting ? (
            <ActivityIndicator color="#fff" />
            ) : (
            <Text style={styles.buttonText}>Submit Rating</Text>
            )}
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    stars: {
        flexDirection: "row",
        marginBottom: 30,
    },
    star: {
        fontSize: 40,
        marginHorizontal: 5,
    },
    filled: {
        color: "#f4a261",
    },
    empty: {
        color: "#ccc",
    },
    button: {
        backgroundColor: "#f4a261",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    disabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
