import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import CommonButton from '../components/CommonButton';
import CommonTextInput from '../components/CommonTextInput';
import DocumentUpload from '../components/DocumentUpload';
import HeaderWithBackButton from '../components/HeaderWithBackButton';

const GSTDetailsUploadScreen = () => {
  const [gstNumber, setGstNumber] = useState('');
  const [document, setDocument] = useState(null);
  const theme = useTheme();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/jpeg', 'image/png'],
      });
      if (result.canceled) return;

      const documentUri = result.assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(documentUri);

      if (fileInfo.size > 5 * 1024 * 1024) {
        Alert.alert('File too large', 'Please select a file smaller than 5MB.');
        return;
      }

      setDocument(documentUri);
    } catch (error) {
      console.error('Document Error', error.message);
    }
  };

  const handleNext = () => {
    if (!gstNumber || !document) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    console.log({gstNumber, document});
    // Navigate or submit logic here
  };

  return (
    <View style={styles.viewContainer}>
      <HeaderWithBackButton title="GST Upload" />
      <View style={styles.container}>
        <CommonTextInput
          label="GSTIN Number"
          value={gstNumber}
          onChangeText={setGstNumber}
        />
        <DocumentUpload
          document={document}
          onPickDocument={pickDocument}
          label="GSTIN"
          uploadButtonText="File"
        />
        <CommonButton onPress={handleNext} label="Next"></CommonButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
});

export default GSTDetailsUploadScreen;
