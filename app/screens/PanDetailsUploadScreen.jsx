import TextRecognition from "@react-native-ml-kit/text-recognition";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import React, { useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import CommonButton from "../shared/components/CommonButton";
import CommonTextInput from "../shared/components/CommonTextInput";
import DocumentUpload from "../shared/components/DocumentUpload";
import HeaderWithBackButton from "../shared/components/HeaderWithBackButton";
import { localText } from "../shared/utils/i18n";

const PanDetailsUploadScreen = () => {
  const [panNumber, setPanNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState(null);
  const theme = useTheme();
  const fullNameRef = useRef();

  const extractPanDetails = (text) => {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let name = "";
    // let fatherName = '';
    // let dob = '';
    let panNumber = "";

    // const dobRegex = /\b(\d{2}\/\d{2}\/\d{4})\b/;
    const panRegex = /([A-Z]{5}[0-9]{4}[A-Z])/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (
        !name &&
        /^[A-Z\s]+$/.test(line) &&
        !line.includes("INCOME") &&
        !line.includes("GOVT")
      ) {
        name = line;
      }
      //   else if (name && !fatherName && /^[A-Z\s]+$/.test(line)) {
      //     fatherName = line;
      //   }

      //   if (!dob && dobRegex.test(line)) {
      //     dob = line.match(dobRegex)?.[1] ?? '';
      //   }

      if (!panNumber && panRegex.test(line)) {
        panNumber = line.match(panRegex)?.[1] ?? "";
      }
    }

    return { name, panNumber };
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

      const { name, panNumber: pan } = extractPanDetails(fullText);

      console.log("Extracted:", { name, pan });

      if (!name) {
        Alert.alert(localText("nameNotFound"), localText("nameValidation"));
        throw new Error(localText("nameValidation"));
      } else {
        setFullName(name);
      }

      if (!pan) {
        Alert.alert(localText("panNotDetected"), localText("panNotDetected"));
        throw new Error(localText("panNotDetected"));
      } else {
        setPanNumber(pan);
      }
    } catch (error) {
      console.error("OCR error:", error);
      Alert.alert(localText("ocrError"), localText("ocrFail"));
      setDocument(null);
      setFullName("");
      setPanNumber("");
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
        Alert.alert(localText("fileTooLarge"), localText("selectSmallFile"));
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
    if (!panNumber || !fullName || !document) {
      Alert.alert(localText("missingFields"), localText("fieldValidation"));
      return;
    }

    console.log({ panNumber, fullName, document });
    // Navigate or submit
  };

  return (
    <View style={styles.viewContainer}>
      <HeaderWithBackButton
        title={localText("panUpload")}
      ></HeaderWithBackButton>
      <View style={styles.container}>
        <CommonTextInput
          label={localText("panNumber")}
          value={panNumber}
          editable={false}
          onChangeText={setPanNumber}
          autoCapitalize="characters"
        />
        <CommonTextInput
          ref={fullNameRef}
          editable={false}
          label={localText("fullNamePan")}
          value={fullName}
          onChangeText={setFullName}
        />
        <DocumentUpload
          document={document}
          onPickDocument={pickDocument}
          label={localText("pan")}
          uploadButtonText={localText("file")}
        />
        <CommonButton onPress={handleNext}>{localText("next")}</CommonButton>
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

export default PanDetailsUploadScreen;
