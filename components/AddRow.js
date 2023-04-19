import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { CountButton } from "./CountButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.row}>
      <View style={styles.nameColumn} />
      <TextInput
        value={name}
        placeholder="Enter a name"
        onChangeText={setName}
      />
      <CountButton
        text="Add"
        submit={() => {
          setName("");
          addNewCountable(name);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nameColumn: {
    flex: 1.5,
    alignItems: "center",
  },
});
