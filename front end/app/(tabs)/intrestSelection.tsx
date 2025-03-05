import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";

import HeadIcon from '@/components/HeadIcon'; 
import loginPagesStyle from "@/app/styles/loginPagesStyle"

export default function intrestSelection() {
  // selections 
  //todo: get from database?
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

  
  const handleSelect = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  //get seslections when press
  const handleSubmit = () => {
    console.log("Selected Options:", selectedOptions);
  };

  return (

    <View style={loginPagesStyle.container}>

      <View style={loginPagesStyle.header}>
      <HeadIcon  />
      </View>

      <View style={loginPagesStyle.body}>

      <Text style={loginPagesStyle.loginText}>Please select your options:</Text>

    <View style={{width:"33%"}}>
      {/*selections list */}
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[loginPagesStyle.optionButton, selectedOptions.includes(option) && loginPagesStyle.selectedOption]}
          onPress={() => handleSelect(option)}
        >
          <Text style={loginPagesStyle.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
       
      {/* Submit btn */}
      <TouchableOpacity style={loginPagesStyle.submitButton} onPress={handleSubmit}>
        <Text style={loginPagesStyle.submitText}>Submit</Text>
      </TouchableOpacity>
      </View>
      
    </View>
    </View>
  );
}

