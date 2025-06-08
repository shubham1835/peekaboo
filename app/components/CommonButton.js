// src/components/CommonButton.js

import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

const CommonButton = ({
  label,
  onPress,
  mode = 'contained',
  disabled = false,
  icon,
  textColor,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Button
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      icon={icon}
      textColor={textColor || theme.colors.text}
      style={[styles.button, style]}
      contentStyle={styles.content}
      {...props}>
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fac724',
    borderRadius: 25,
    marginVertical: 8,
  },
  content: {
    height: 48,
  },
});

export default CommonButton;
