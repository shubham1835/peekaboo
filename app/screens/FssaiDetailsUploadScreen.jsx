import TextRecognition from "@react-native-ml-kit/text-recognition";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import CommonButton from "../shared/components/CommonButton";
import CommonTextInput from "../shared/components/CommonTextInput";
import DocumentUpload from "../shared/components/DocumentUpload";
import HeaderWithBackButton from "../shared/components/HeaderWithBackButton";

const FssaiDetailsUploadScreen = () => {
  const [fssaiNumber, setFssaiNumber] = useState("");
  const [issuedOn, setIssuedOn] = useState("");
  const [validUpto, setValidUpto] = useState("");
  const [document, setDocument] = useState(null);
  const theme = useTheme();

  const extractFssaiDetails = (text) => {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let name = "";
    let fssaiRegistrationNumber = "";
    let licenseHolderName = "";
    let businessAddress = "";
    const fssaiRegistrationNumberRegex = /([0-9]{14})/;
    const nameAndaddressRegex =
      /1\.\s*Name and permanent address of Food Business Operator.*?\n([^\n]+)/i;
    const issuedOnRegex = /Issued On\s*\/\s*([0-9-]+)/i;
    const validUptoRegex = /Valid Upto\s*:\s*([0-9-]+)/i;
    const placeRegex = /Place\s*\/\s*(.+)/i;

    const nameAddrMatch = text.match(nameAndaddressRegex);
    if (nameAddrMatch) {
      const fullBlock = nameAddrMatch[1].trim();
      const lines = fullBlock
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      licenseHolderName = lines[0] || "";
      businessAddress = lines.slice(1).join(", ");
    }

    const place = text.match(placeRegex)?.[1] ?? "";
    const issuedDate = text.match(issuedOnRegex)?.[1] ?? "";
    const validUptoDate = text.match(validUptoRegex)?.[1] ?? "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (
        !name &&
        /^[A-Z\s]+$/.test(line) &&
        !line.includes("FSSAI") &&
        !line.includes("Government of Maharashtra")
      ) {
        name = line;
      }

      if (!fssaiRegistrationNumber && fssaiRegistrationNumberRegex.test(line)) {
        fssaiRegistrationNumber =
          line.match(fssaiRegistrationNumberRegex)?.[1] ?? "";
      }
    }

    return {
      licenseHolderName,
      fssaiRegistrationNumber,
      businessAddress,
      issuedDate,
      validUptoDate,
      place,
    };
  };
  const extractPanDetailsFromImage = async (uri) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1000 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      const result = await TextRecognition.recognize(manipulatedImage.uri);
      const fullText = result.text;

      const {
        licenseHolderName,
        fssaiRegistrationNumber,
        businessAddress,
        issuedDate,
        validUptoDate,
        place,
      } = extractFssaiDetails(fullText);

      console.log("Extracted:", {
        licenseHolderName,
        fssaiRegistrationNumber,
        businessAddress,
        issuedDate,
        validUptoDate,
        place,
      });
      if (!fssaiRegistrationNumber) {
        Alert.alert(
          "Fssai Registration Number Not Detected",
          "Could not detect a valid Fssai Registration Number."
        );
        throw new Error("Could not detect a valid fssai Registration Number!");
      } else {
        setFssaiNumber(fssaiRegistrationNumber);
      }
      setValidUpto(validUptoDate);
      setIssuedOn(issuedDate);
    } catch (error) {
      console.error("OCR error:", error);
      Alert.alert("OCR Error", "Failed to extract text from image.");
      setDocument(null);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png"],
      });
      if (result.canceled) return;

      const documentUri = result.assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(documentUri);

      if (fileInfo.size > 5 * 1024 * 1024) {
        Alert.alert("File too large", "Please select a file smaller than 5MB.");
        return;
      }

      setDocument(documentUri);
      if (result.assets[0].mimeType !== "application/pdf") {
        await extractPanDetailsFromImage(documentUri);
      }
    } catch (error) {
      console.error("Document Error", error.message);
    }
  };

  const handleNext = () => {
    if (!fssaiNumber || !document) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    console.log({ fssaiNumber, document });
    // Navigate or submit logic here
  };

  return (
    <View style={styles.viewContainer}>
      <HeaderWithBackButton title="FSSAI Upload" />
      <View style={styles.container}>
        <CommonTextInput
          label="FSSAI Number"
          editable={false}
          value={fssaiNumber}
          onChangeText={setFssaiNumber}
          autoCapitalize="characters"
        />
        <CommonTextInput
          label="Issued On"
          value={issuedOn}
          onChangeText={setIssuedOn}
        />
        <CommonTextInput
          label="Valid Upto"
          value={validUpto}
          onChangeText={setValidUpto}
        />
        <DocumentUpload
          document={document}
          onPickDocument={pickDocument}
          label="FSSAI"
          uploadButtonText="File"
        />
        <CommonButton onPress={handleNext}>Next</CommonButton>
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
    backgroundColor: "#FFFFFF",
  },
});

export default FssaiDetailsUploadScreen;
