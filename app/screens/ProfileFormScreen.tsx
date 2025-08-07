import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { saveProfile } from '../../storage/storage';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .required('Age is required'),
  occupation: Yup.string().required('Occupation is required'),
  hobbies: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one hobby is required')
    .required('Hobbies are required'),
});

export default function ProfileFormScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const transparentTheme = { colors: { background: 'transparent' } };

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [hobbyInput, setHobbyInput] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleAddHobby = () => {
    const trimmed = hobbyInput.trim();
    if (trimmed && !hobbies.includes(trimmed)) {
      setHobbies([...hobbies, trimmed]);
      setHobbyInput('');
      setErrors((prev: any) => ({ ...prev, hobbies: undefined }));
    }
  };

  const handleRemoveHobby = (hobbyToRemove: string) => {
    setHobbies(hobbies.filter((hobby) => hobby !== hobbyToRemove));
  };

  const handleSubmit = async () => {
    const values = { name, age, occupation, hobbies };

    try {
      await validationSchema.validate(values, { abortEarly: false });
      await saveProfile({
        name,
        age: Number(age),
        occupation,
        hobbies,
      });
      router.push('/screens/ProfileViewScreen');
    } catch (err: any) {
      if (err.inner) {
        const formErrors: any = {};
        err.inner.forEach((e: any) => {
          formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      } else {
        Alert.alert('Error', err.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/graph_paper.jpg')}
      style={styles.background}
      resizeMode="repeat"
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <View style={styles.iconWrapper}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </View>
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={[styles.input, { backgroundColor: 'white' }]}
            outlineColor={colors.primary}
            error={!!errors.name}
            theme={transparentTheme}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <TextInput
            label="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            mode="outlined"
            style={[styles.input, { backgroundColor: 'white' }]}
            outlineColor={colors.primary}
            error={!!errors.age}
            theme={transparentTheme}
          />
          {errors.age && <Text style={styles.error}>{errors.age}</Text>}

          <TextInput
            label="Occupation"
            value={occupation}
            onChangeText={setOccupation}
            mode="outlined"
            style={[styles.input, { backgroundColor: 'white' }]}
            outlineColor={colors.primary}
            error={!!errors.occupation}
            theme={transparentTheme}
          />
          {errors.occupation && <Text style={styles.error}>{errors.occupation}</Text>}

          <TextInput
            label="Add Hobby"
            value={hobbyInput}
            onChangeText={setHobbyInput}
            onSubmitEditing={handleAddHobby}
            mode="outlined"
            style={[styles.input, { backgroundColor: 'white' }]}
            outlineColor={colors.primary}
            theme={transparentTheme}
            returnKeyType="done"
          />
          <Button
            mode="text"
            onPress={handleAddHobby}
            compact
            style={styles.addhobby}
          >
            Add Hobby
          </Button>

          <View style={styles.hobbiesContainer}>
            {hobbies.map((hobby, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRemoveHobby(hobby)}
                style={styles.hobbyChip}
              >
                <Text>{hobby} ✕</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.hobbies && <Text style={styles.error}>{errors.hobbies}</Text>}

          <Button
            mode="outlined"
            onPress={handleSubmit}
            style={styles.transparentButton}
            contentStyle={{ paddingVertical: 12 }}
            labelStyle={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}
          >
            Submit
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 60,
  },
  addhobby:{
    borderWidth:1,
    borderColor:'pink',
    backgroundColor:'#fcedfb',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    padding: 4,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  input: {
    marginBottom: 16,
    borderRadius: 14,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
  transparentButton: {
    backgroundColor: '#fafaeb',
    borderColor: '#FFD700',
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 20,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hobbyChip: {
    backgroundColor: '#e6e6e6',
    borderRadius: 16,
    borderWidth:1,
    borderColor:'gold',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
    marginTop:8,
  },
});
