import React from "react";
import { Redirect } from "expo-router";

// redirect to /login
export default function Index() {
  return <Redirect href="/login" />;
}