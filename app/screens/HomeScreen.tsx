import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/graph_paper.jpg')}
      style={styles.background}
      resizeMode="repeat"
    >
      <View style={styles.container}>
  <Image
    source={require('../../assets/images/welcome.png')}
    style={styles.welcomeImage}
    resizeMode="contain"
  />

  <View style={styles.textBlock}>
    <Text style={styles.appTitle}>ConnectHub</Text>
    <Text style={styles.appSubtitle}>The Mini Social App</Text>
  </View>

  <BlurView intensity={50} tint="light" style={[styles.glassyButton, { borderColor: 'pink' }]}>
    <TouchableOpacity
      style={styles.innerButton}
      onPress={() => router.push('/screens/ProfileFormScreen')}
    >
      <Text style={styles.buttonText}>Go to Profile  🧑</Text>
    </TouchableOpacity>
  </BlurView>

  <BlurView intensity={50} tint="light" style={[styles.glassyButton, { borderColor: 'gold' }]}>
    <TouchableOpacity
      style={styles.innerButton}
      onPress={() => router.push('/screens/ChatScreen')}
    >
      <Text style={styles.buttonText}>Chat with Alex  🤖</Text>
    </TouchableOpacity>
  </BlurView>
</View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical:25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    padding: 16,
  },
  welcomeImage: {
    width: 300,
    height: 300,
    marginVertical:15,
  },
  glassyButton: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    width: '100%',
    maxWidth: 300,
  },
  innerButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(250, 240, 240, 0.3)',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  textBlock: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 30,
    marginTop:10,
    marginLeft:5,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#222',
    textAlign: 'left',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  appSubtitle: {
    fontSize: 20,
    color: 'black',
    fontStyle: 'italic',
    textAlign: 'left',
    opacity: 0.9,
    marginTop: 4,
    paddingLeft: 2,
  },
  
});
