import React from "react";
import { StyleSheet } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

const CommonTextInput = ({
  label,
  value,
  onChangeText,
  error,
  keyboardType = "default",
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  ...props
}) => {
  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        error={!!error}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        outlineColor="#0179b0"
        activeOutlineColor="#0179b0"
        dense={true}
        outlineStyle={styles.outlineStyle}
        numberOfLines={numberOfLines}
        style={[styles.input, multiline && styles.textArea]}
        theme={styles.theme}
        {...props}
      />
      {error ? (
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  outlineStyle: {
    borderRadius: 10,
    borderColor: "#0179b0",
  },
  theme: {
    colors: {
      primary: "#0179b0", // gold/yellow from logo
      text: "#FFFFFF",
      placeholder: "#0179b0",
      background: "#FFFFFF", // dark input background
    },
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});

export default CommonTextInput;
