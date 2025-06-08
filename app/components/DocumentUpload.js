// src/components/DocumentUpload.js
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';

const DocumentUpload = ({
  document,
  onPickDocument,
  label,
  uploadButtonText,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPickDocument}
      activeOpacity={0.7}>
      <View style={styles.content}>
        <IconButton
          icon="file-upload-outline"
          size={36}
          iconColor={theme.colors.primary}
        />
        <Text variant="titleMedium">
          {document ? `${label} Uploaded` : `Upload ${label} Document`}
        </Text>
        <Text variant="titleSmall">jpeg, png or pdf formats up to 5MB</Text>
        {document && (
          <Image
            source={{uri: document}}
            style={styles.imagePreview}
            resizeMode="cover"
          />
        )}
        <TouchableOpacity
          style={[styles.uploadButton]}
          onPress={onPickDocument}>
          <Text style={styles.uploadText}>
            {document ? `Replace ${label}` : `Choose ${uploadButtonText}`}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: 'white',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  uploadButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fac724',
    borderRadius: 25,
  },
  uploadText: {
    color: 'black',
    fontWeight: 'bold',
  },
  imagePreview: {
    marginTop: 16,
    width: 200,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default DocumentUpload;
