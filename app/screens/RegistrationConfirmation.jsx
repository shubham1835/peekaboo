import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
import CommonButton from "../shared/components/CommonButton";

const FinalVerificationScreen = ({ route, navigation }) => {
  const {
    ownerName = "",
    businessName = "",
    businessEmail = "",
    businessType = "",
    businessCategory = "",
    businessAddress = "",
    panNumber = "",
    nameOnPan = "",
    gstinNumber = "",
  } = route.params; // Passed from previous screen

  const handleConfirm = () => {
    // Submit data to backend or next step
    console.log("Merchant registration confirmed.");
    // navigation.navigate('SuccessScreen'); // example
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Review Your Details" />
        <Card.Content>
          <DetailRow label="Owner Name" value={ownerName} />
          <DetailRow label="Business Name" value={businessName} />
          <DetailRow label="Business Email" value={businessEmail} />
          <DetailRow label="Business Type" value={businessType} />
          <DetailRow
            label="Business Category"
            value={businessCategory.join(", ")}
          />
          <DetailRow
            label="Business Address"
            value={businessAddress}
            multiline
          />
          <DetailRow label="PAN Number" value={panNumber} />
          <DetailRow label="Name on PAN" value={nameOnPan} />
          <DetailRow label="GSTIN Number" value={gstinNumber} />
        </Card.Content>
      </Card>

      <CommonButton onPress={handleConfirm}>Confirm & Submit</CommonButton>
    </ScrollView>
  );
};

const DetailRow = ({ label, value, multiline }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, multiline && { minHeight: 60 }]}>{value}</Text>
    <Divider style={{ marginVertical: 8 }} />
  </>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F6F9FC",
    flexGrow: 1,
  },
  card: {
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#43A047",
    paddingVertical: 6,
  },
});

export default FinalVerificationScreen;
