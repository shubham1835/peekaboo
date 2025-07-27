import { Formik } from "formik";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Chip } from "react-native-paper";
import * as Yup from "yup";
import CommonButton from "../shared/components/CommonButton";
import CommonTextInput from "../shared/components/CommonTextInput";
import HeaderWithBackButton from "../shared/components/HeaderWithBackButton";

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Owner name is required"),
  businessEmail: Yup.string()
    .email("Invalid email")
    .required("Business email is required"),
  businessType: Yup.string().required("Business type is required"),
  businessCategory: Yup.array().min(1, "Select at least one category"),
});

const MerchantRegistrationScreen = ({ navigation }) => {
  return (
    <View style={styles.viewContainer}>
      <HeaderWithBackButton title="Merchant Registration"></HeaderWithBackButton>
      <Formik
        initialValues={{
          ownerName: "",
          businessEmail: "",
          businessType: "",
          businessCategory: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
          navigation.navigate("BusinessLocationScreen");
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <ScrollView style={styles.container}>
            <CommonTextInput
              label="Owner Name"
              value={values.ownerName}
              onChangeText={handleChange("ownerName")}
              error={touched.ownerName && errors.ownerName}
            />
            <CommonTextInput
              label="Business Email"
              value={values.businessEmail}
              onChangeText={handleChange("businessEmail")}
              keyboardType="email-address"
              error={touched.businessEmail && errors.businessEmail}
            />

            <CommonButton onPress={handleSubmit}>Next</CommonButton>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0179b0",
    marginBottom: 24,
    alignSelf: "center",
  },
  subLabel: {
    color: "#0179b0",
    marginTop: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  chip: {
    margin: 4,
    borderColor: "#0179b0",
    borderWidth: 1,
    backgroundColor: "#fac724",
  },
  selectedChip: {
    backgroundColor: "#fac724",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});

export default MerchantRegistrationScreen;
