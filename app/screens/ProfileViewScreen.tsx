// Same imports as before
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { getProfile } from '../../storage/storage';
import { ProfileData } from '@/types/types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileViewScreen() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#66BB6A" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No profile data found.</Text>
      </View>
    );
  }

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

      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar and Name */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {profile.name ? profile.name[0].toUpperCase() : 'U'}
            </Text>
          </View>
          <Text style={styles.name}>{profile.name}</Text>
        </View>

        {/* Styled Profile Info */}
        <View style={styles.card}>
          {/* Age */}
          <View style={styles.infoRowNew}>
            <View style={styles.iconLabel}>
              <MaterialIcons name="calendar-today" size={24} color="#5e35b1" />
              <Text style={styles.infoText}>Age</Text>
            </View>
            <View style={styles.rightContent}>
              <Text style={styles.valueText}>{profile.age}</Text>
            </View>
          </View>

          {/* Occupation */}
          <View style={styles.infoRowNew}>
            <View style={styles.iconLabel}>
              <MaterialIcons name="work" size={24} color="#43a047" />
              <Text style={styles.infoText}>Occupation</Text>
            </View>
            <View style={styles.rightContent}>
              <Text style={styles.valueText}>{profile.occupation}</Text>
            </View>
          </View>

          {/* Hobbies with pill UI */}
          <View style={styles.infoRowNew}>
            <View style={styles.iconLabel}>
              <MaterialIcons name="emoji-emotions" size={24} color="#ef5350" />
              <Text style={styles.infoText}>Hobbies</Text>
            </View>
            <View style={styles.rightContent}>
              {Array.isArray(profile.hobbies) ? (
                <View style={styles.hobbyList}>
                  {profile.hobbies.map((hobby, index) => (
                    <View key={index} style={styles.hobbyPill}>
                      <Text style={styles.hobbyText}>{hobby}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.valueText}>{profile.hobbies}</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    padding: 4,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarCircle: {
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#b39ddb',
  },
  avatarText: {
    fontSize: 60,
    color: '#5e35b1',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    color: '#212121',
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 8,
    gap: 8,
  },
  infoRowNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 18,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'grey',
    paddingHorizontal: 8,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 6,
  },
  valueText: {
    fontSize: 16,
    color: 'blue',
  },
  hobbyList: {
    flexWrap: 'wrap',
    gap: 8,
  },
  hobbyPill: {
    backgroundColor: '#e0f7fa',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#00acc1',
  },
  hobbyText: {
    color: '#006064',
    fontWeight: '500',
  },
});
