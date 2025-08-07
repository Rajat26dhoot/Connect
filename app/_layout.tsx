import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="screens/HomeScreen"  options={{title: 'Home'}} />
        <Stack.Screen name="screens/ChatScreen" options={{title: 'Chat',}}/>
        <Stack.Screen name="screens/ProfileFormScreen" options={{title: 'Edit Profile',}}/>
        <Stack.Screen name="screens/ProfileViewScreen" options={{title: 'User Profile',}}/>
      </Stack>
    </SafeAreaProvider>
    
  );
}
