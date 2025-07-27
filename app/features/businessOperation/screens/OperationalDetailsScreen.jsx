import React from "react";
import { View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { Text, Switch, HelperText } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik } from "formik";
import CommonButton from "../../../shared/components/CommonButton";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import BottomSheet from "../../../shared/components/BottomSheet";
import { localText } from "../../../shared/utils/i18n";
import HeaderWithBackButton from "../../../shared/components/HeaderWithBackButton";
import useOperationalDetails from "../hooks/useOperationalDetails";
import styles from "../styles/styles";

const OperationalDetailsScreen = ({ navigation }) => {
  const {
    showOpeningPicker,
    setShowOpeningPicker,
    showClosingPicker,
    setShowClosingPicker,
    modal,
    openModel,
    initialValues,
    validationSchema,
    weekdays,
    handleOpeningTimeConfirm,
    handleClosingTimeConfirm,
    handleSubmit,
  } = useOperationalDetails(navigation);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
        <>
          <HeaderWithBackButton title={localText("operationTitle")} />
          <ScrollView contentContainerStyle={styles.container}>
            {/* Opening Time */}
            <Pressable onPress={() => setShowOpeningPicker(true)}>
              <CommonTextInput
                label={localText("openingTime")}
                value={values.openingTime}
                editable={false}
                pointerEvents="none"
              />
            </Pressable>
            <HelperText
              type="error"
              visible={touched.openingTime && !!errors.openingTime}
            >
              {errors.openingTime}
            </HelperText>

            <DateTimePickerModal
              isVisible={showOpeningPicker}
              mode="time"
              onConfirm={(date) =>
                handleOpeningTimeConfirm(date, setFieldValue)
              }
              onCancel={() => setShowOpeningPicker(false)}
            />

            {/* Closing Time */}
            <Pressable onPress={() => setShowClosingPicker(true)}>
              <CommonTextInput
                label={localText("closingTime")}
                value={values.closingTime}
                editable={false}
                pointerEvents="none"
              />
            </Pressable>
            <HelperText
              type="error"
              visible={touched.closingTime && !!errors.closingTime}
            >
              {errors.closingTime}
            </HelperText>

            <DateTimePickerModal
              isVisible={showClosingPicker}
              mode="time"
              onConfirm={(date) =>
                handleClosingTimeConfirm(date, setFieldValue)
              }
              onCancel={() => setShowClosingPicker(false)}
            />

            {/* Weekly Off Dropdown */}
            <TouchableOpacity onPress={() => openModel(true)}>
              <CommonTextInput
                label={localText("weeklyOff")}
                value={values.weeklyOff.join(", ")}
                onChangeText={handleChange("weeklyOff")}
                onBlur={handleBlur("weeklyOff")}
                editable={false}
              />
            </TouchableOpacity>
            <BottomSheet
              selectedOptions={values.weeklyOff}
              onChange={(val) => setFieldValue("weeklyOff", val)}
              options={weekdays}
              openModal={modal}
              onClose={() => openModel(false)}
              maxSelect={7}
            />

            {/* Services Offered */}
            <Text style={styles.sectionTitle}>{localText("services")}</Text>
            <View style={styles.switchRow}>
              <Text>{localText("dineIn")}</Text>
              <Switch
                value={values.dineIn}
                onValueChange={(val) => setFieldValue("dineIn", val)}
                color="#0179b0"
              />
            </View>
            <View style={styles.switchRow}>
              <Text>{localText("takeaway")}</Text>
              <Switch
                value={values.takeaway}
                onValueChange={(val) => setFieldValue("takeaway", val)}
                color="#0179b0"
              />
            </View>
            <View style={styles.switchRow}>
              <Text>{localText("delivery")}</Text>
              <Switch
                value={values.delivery}
                onValueChange={(val) => setFieldValue("delivery", val)}
                color="#0179b0"
              />
            </View>
            <HelperText type="error" visible={!!errors.dineIn}>
              {errors.dineIn || errors.takeaway || errors.delivery}
            </HelperText>

            {/* Prep Time */}
            <CommonTextInput
              label={localText("prepTime")}
              value={values.prepTime}
              onChangeText={handleChange("prepTime")}
              onBlur={handleBlur("prepTime")}
              keyboardType="numeric"
            />
            <HelperText
              type="error"
              visible={touched.prepTime && !!errors.prepTime}
            >
              {errors.prepTime}
            </HelperText>

            {/* Special Instructions */}
            <CommonTextInput
              label={localText("instructions")}
              value={values.instructions}
              onChangeText={handleChange("instructions")}
              multiline
              numberOfLines={3}
            />

            <CommonButton mode="contained" onPress={handleSubmit}>
              {localText("next")}
            </CommonButton>
          </ScrollView>
        </>
      )}
    </Formik>
  );
};

export default OperationalDetailsScreen;
