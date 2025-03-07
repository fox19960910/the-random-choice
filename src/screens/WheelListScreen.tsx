import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import { RouteProp } from "@react-navigation/native";
import { Wheel } from "../types";
import { COLOR } from "../constants/color";
import Flex from "../components/common/Flex";

type WheelListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "WheelList"
>;

interface Props {
  navigation: WheelListScreenNavigationProp;
}

const WheelListScreen: React.FC<Props> = ({ navigation }) => {
  const [wheels, setWheels] = useState<Wheel[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchWheels = async () => {
      const storedWheels = await AsyncStorage.getItem("wheels");
      if (storedWheels) {
        setWheels(JSON.parse(storedWheels));
      }
    };
    const unsubscribe = navigation.addListener("focus", fetchWheels);
    return unsubscribe;
  }, [navigation]);

  const filteredWheels = wheels.filter((wheel) =>
    wheel.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteWheel = async (id: string) => {
    const updatedWheels = wheels.filter((wheel) => wheel.id !== id);
    setWheels(updatedWheels);
    await AsyncStorage.setItem("wheels", JSON.stringify(updatedWheels));
  };

  const renderItem = ({ item }: { item: Wheel }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Wheel", { wheel: item })}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
      <Flex>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditWheel", { wheel: item })}
        >
          <Feather name="edit-3" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ marginRight: 5 }} />
        <TouchableOpacity onPress={() => deleteWheel(item.id)}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </Flex>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search Wheels"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredWheels}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("AddWheel")}
      >
        <Text style={styles.buttonText}>Create New Wheel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.TERTIARY,
  },
  searchBox: {
    margin: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  item: {
    flex: 1,
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
  },
  createButton: {
    backgroundColor: "#ff8c00",
    padding: 15,
    borderRadius: 10,
    margin: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default WheelListScreen;
