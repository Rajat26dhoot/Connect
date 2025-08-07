import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TextInputProps, Animated, Text, StyleSheet } from 'react-native';

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  customStyle?: any;
}

export default function FloatingLabelInput({
  label,
  value,
  onChangeText,
  customStyle = {},
  ...rest
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 12,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: isFocused ? '#333' : '#999',
    paddingHorizontal: 4,
    zIndex: ,
  };

  return (
    <View style={[styles.container, customStyle]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'gold',
    borderRadius: 8,
    backgroundColor: 'rgba(237, 234, 234, 0.3)',
  },
  input: {
    height: 48,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 6,
    color: '#000',
  },
});
