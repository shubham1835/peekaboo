import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { HelperText } from "react-native-paper";
import CommonButton from "../shared/components/CommonButton";
import CommonTextInput from "../shared/components/CommonTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import BottomSheet from "../shared/components/BottomSheet";
import { localText } from "../shared/utils/i18n";
import HeaderWithBackButton from "../shared/components/HeaderWithBackButton";
import ProfileImagePicker from "../shared/components/ProfileImagePicker";

const businessTypes = [
  "Restaurant",
  "Cafe",
  "Bakery",
  "Sweet Shop",
  "Cloud Kitchen",
  "Food Truck",
  "QSR (Quick Service Restaurant)",
  "Fine Dining",
  "Casual Dining",
  "Bistro",
  "Bar & Pub",
  "Lounge",
  "Buffet Restaurant",
  "Canteen",
  "Dessert Parlor",
  "Takeaway Outlet",
  "Juice Bar",
  "Ice Cream Parlor",
  "Multi-Cuisine Restaurant",
  "Home Kitchen",
  "Drive-In",
  "Dhabha",
  "Kiosk",
];
const categories = [
  "Afghani",
  "American",
  "Arabian",
  "Asian",
  "Bakery",
  "Barbecue",
  "Bengali",
  "Beverages",
  "Bihari",
  "Biryani",
  "Burgers",
  "Burmese",
  "Cafe",
  "Cakes & Pastries",
  "Chaat",
  "Chettinad",
  "Chinese",
  "Coastal",
  "Combos",
  "Continental",
  "Desserts",
  "European",
  "Fast Food",
  "French",
  "Grill",
  "Gujarati",
  "Healthy Food",
  "Home Food",
  "Hyderabadi",
  "Ice Cream",
  "Indian",
  "Indonesian",
  "Italian",
  "Italian-American",
  "Jain",
  "Japanese",
  "Kashmiri",
  "Kebabs",
  "Kerala",
  "Korean",
  "Lebanese",
  "Lucknowi",
  "Maharashtrian",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Mithai",
  "Momos",
  "Mughlai",
  "Nepalese",
  "North Eastern",
  "North Indian",
  "Oriental",
  "Paan",
  "Pan-Asian",
  "Pasta",
  "Persian",
  "Pizza",
  "Punjabi",
  "Rajasthani",
  "Rolls & Wraps",
  "Salads",
  "Seafood",
  "Sindhi",
  "South Indian",
  "Street Food",
  "Sweets",
  "Tandoor",
  "Thai",
  "Thalis",
  "Tibetan",
  "Turkish",
  "Vegan / Vegetarian",
  "Vietnamese",
];

const StoreBasicInfoScreen = () => {
  const initialValues = {
    storeName: "",
    ownerName: "",
    storeEmail: "",
    businessType: "",
    businessCategory: [],
  };
  const [modal, openModel] = useState(false);
  const [typeModal, openTypeModel] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const validationSchema = Yup.object().shape({
    storeName: Yup.string().required(localText("storeNameRequired")),
    ownerName: Yup.string().required(localText("ownerNameRequired")),
    storeEmail: Yup.string()
      .email(localText("invalidEmail"))
      .required(localText("emailRequired")),
    businessType: Yup.string().required(localText("businessType")),
    businessCategory: Yup.array()
      .min(1, localText("atLeatOneCategoory"))
      .max(3, localText("maxThreeCategories")),
  });

  return (
    <>
      <HeaderWithBackButton
        title={localText("storeInfo")}
      ></HeaderWithBackButton>
      <ScrollView contentContainerStyle={styles.container}>
        <ProfileImagePicker
          initialImage={profileImage}
          onChange={(uri) => setProfileImage(uri)}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Store Info:", values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View>
              <CommonTextInput
                label={localText("storeName")}
                value={values.storeName}
                onChangeText={handleChange("storeName")}
                onBlur={handleBlur("storeName")}
              />
              <HelperText
                type="error"
                visible={touched.storeName && !!errors.storeName}
              >
                {errors.storeName}
              </HelperText>
              <CommonTextInput
                label={localText("ownerName")}
                value={values.ownerName}
                onChangeText={handleChange("ownerName")}
                onBlur={handleBlur("ownerName")}
              />
              <HelperText
                type="error"
                visible={touched.ownerName && !!errors.ownerName}
              >
                {errors.ownerName}
              </HelperText>

              <CommonTextInput
                label={localText("storeEmail")}
                value={values.storeEmail}
                onChangeText={handleChange("storeEmail")}
                onBlur={handleBlur("storeEmail")}
                keyboardType="email-address"
              />
              <HelperText
                type="error"
                visible={touched.storeEmail && !!errors.storeEmail}
              >
                {errors.storeEmail}
              </HelperText>

              {/* Business Type - Single Select */}
              <TouchableOpacity onPress={() => openTypeModel(true)}>
                <CommonTextInput
                  label={localText("storeType")}
                  value={values.businessType}
                  onChangeText={handleChange("businessType")}
                  onBlur={handleBlur("businessType")}
                  editable={false}
                />
              </TouchableOpacity>
              <BottomSheet
                selectedOptions={values.businessType}
                onChange={(val) => setFieldValue("businessType", val)}
                options={businessTypes}
                openModal={typeModal}
                onClose={() => openTypeModel(false)}
                maxSelect={1}
              />
              {/* <Text style={styles.sectionLabel}>Business Type</Text>
            <View style={styles.chipContainer}>
              {businessTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.chip,
                    values.businessType === type && styles.chipSelected,
                  ]}
                  onPress={() => setFieldValue("businessType", type)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      values.businessType === type && styles.chipTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View> */}
              <HelperText
                type="error"
                visible={touched.businessType && !!errors.businessType}
              >
                {errors.businessType}
              </HelperText>

              <TouchableOpacity onPress={() => openModel(true)}>
                <CommonTextInput
                  label={localText("storeCategories")}
                  value={values.businessCategory.join(", ")}
                  onChangeText={handleChange("businessCategory")}
                  onBlur={handleBlur("businessCategory")}
                  editable={false}
                />
              </TouchableOpacity>
              <BottomSheet
                selectedOptions={values.businessCategory}
                onChange={(val) => setFieldValue("businessCategory", val)}
                options={categories}
                openModal={modal}
                onClose={() => openModel(false)}
                maxSelect={3}
              />
              <HelperText
                type="error"
                visible={touched.businessCategory && !!errors.businessCategory}
              >
                {errors.businessCategory}
              </HelperText>

              <CommonButton mode="contained" onPress={handleSubmit}>
                {localText("next")}
              </CommonButton>
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F9FC",
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 6,
    fontSize: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#f2f2f2",
  },
  chipSelected: {
    backgroundColor: "#6200ee",
    borderColor: "#6200ee",
  },
  chipText: {
    color: "#333",
    fontSize: 14,
  },
  chipTextSelected: {
    color: "#fff",
  },
  submit: {
    marginTop: 24,
  },
});

export default StoreBasicInfoScreen;
