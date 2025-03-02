import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type StartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Start'>;

interface Props {
  navigation: StartScreenNavigationProp;
}

const StartScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('AddWheel')}
      >
        <Text style={styles.buttonText}>Create New Wheel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.existingButton}
        onPress={() => navigation.navigate('WheelList')}
      >
        <Text style={styles.buttonText}>Already Have a Wheel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff5e6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    createButton: {
      backgroundColor: '#ff8c00',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      width: '80%',
    },
    existingButton: {
      backgroundColor: '#ffe4b5',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
  });

export default StartScreen;
