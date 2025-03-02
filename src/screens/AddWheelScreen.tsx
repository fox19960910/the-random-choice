import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Wheel } from '../types';


type AddWheelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddWheel'>;

interface Props {
  navigation: AddWheelScreenNavigationProp;
}

const AddWheelScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [choices, setChoices] = useState<string[]>(['', '']);

  const addChoiceField = () => {
    setChoices([...choices, '']);
  };

  const handleChoiceChange = (text: string, index: number) => {
    const newChoices = [...choices];
    newChoices[index] = text;
    setChoices(newChoices);
  };

  const saveWheel = async () => {
    // if (!name || choices.some((choice) => !choice)) {
    //   Alert.alert('Error', 'Please fill all fields.');
    //   return;
    // }
    console.log('name:', name);
    
    const newWheel: Wheel = {
      id: uuid.v4(),
      name,
      choices,
    };
    console.log('newWheel:', newWheel);
    const storedWheels = await AsyncStorage.getItem('wheels');
    const wheels: Wheel[] = storedWheels ? JSON.parse(storedWheels) : [];
    await AsyncStorage.setItem('wheels', JSON.stringify([...wheels, newWheel]));
    navigation.navigate('Wheel', { wheel: newWheel });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Wheel Name"
        value={name}
        onChangeText={setName}
      />
      {choices.map((choice, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Choice ${index + 1}`}
          value={choice}
          onChangeText={(text) => handleChoiceChange(text, index)}
        />
      ))}
      <TouchableOpacity onPress={addChoiceField}>
        <Text style={styles.addChoiceButton}>Add More Choices</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={saveWheel}>
        <Text style={styles.buttonText}>Add Wheel11</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  addChoiceButton: {
    color: '#ff8c00',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#ff8c00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddWheelScreen;
