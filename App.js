import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/Storage";

const intialCountables = [
  { name: "Crow", count: 0 },
  { name: "Woodpecker", count: 3 },
];

export default function App() {
  const [countables, setCountables] = useState(intialCountables);

  useEffect(() => {
    loadCountables().then((result) => setCountables(result));
  }, []);

  const changeCounts = (amount, index) => {
    const newState = [...countables];
    const newCount = newState[index].count + amount;
    if (newCount < 0) {
      return;
    }
    newState[index].count = newCount;
    setCountables(newState);
    saveCountables(newState);
  };

  const addNewCountable = (name) => {
    if (!name.trim()) {
      return;
    }
    const exists = countables.some((c) => c.name === name);
    if (exists) {
      return;
    }
    const newState = [...countables, { name, count: 0 }];
    newState.sort((a, b) => a.name.localeCompare(b.name));
    setCountables(newState);
    saveCountables(newState);
    Keyboard.dismiss();
  };

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {countables.map((countable, index) => (
            <CountableRow
              countable={countable}
              key={countable.name}
              changeCounts={changeCounts}
              index={index}
            />
          ))}
          <View style={{ flex: 1 }} />
        </ScrollView>
        <AddRow addNewCountable={addNewCountable} />
        <StatusBar style="auto" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
});
