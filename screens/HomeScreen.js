import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Button, View, Text, StyleSheet } from "react-native";

const HomeScreen = (props) => {
  const [inputText, setInputText] = useState("");
  const onChangeText = (input) => {
    setInputText(input);
  };
  const onPressToJoin = () => {
    props.navigation.navigate("Chat", { name: inputText });
  };
  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        style={styles.textInput}
        value={inputText}
        onChangeText={onChangeText}
      />
      <Button title="Join" onPress={onPressToJoin}></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "brown",
    width: 300,
  },
});
export default HomeScreen;
