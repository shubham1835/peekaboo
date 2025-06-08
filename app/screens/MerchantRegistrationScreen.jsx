import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Chip} from 'react-native-paper';
import * as Yup from 'yup';
import CommonButton from '../components/CommonButton';
import CommonTextInput from '../components/CommonTextInput';
import HeaderWithBackButton from '../components/HeaderWithBackButton';

const BUSINESS_TYPES = [
  'Restaurant',
  'Cafe',
  'Bakery',
  'Sweet Shop',
  'Cloud Kitchen',
  'Food Truck',
  'QSR (Quick Service Restaurant)',
  'Fine Dining',
  'Casual Dining',
  'Bistro',
  'Bar & Pub',
  'Lounge',
  'Buffet Restaurant',
  'Canteen',
  'Dessert Parlor',
  'Takeaway Outlet',
  'Juice Bar',
  'Ice Cream Parlor',
  'Multi-Cuisine Restaurant',
  'Home Kitchen',
  'Drive-In',
  'Dhabha',
  'Kiosk',
];
const BUSINESS_CATEGORIES = [
  'Afghani',
  'American',
  'Arabian',
  'Asian',
  'Bakery',
  'Barbecue',
  'Bengali',
  'Beverages',
  'Bihari',
  'Biryani',
  'Burgers',
  'Burmese',
  'Cafe',
  'Cakes & Pastries',
  'Chaat',
  'Chettinad',
  'Chinese',
  'Coastal',
  'Combos',
  'Continental',
  'Desserts',
  'European',
  'Fast Food',
  'French',
  'Grill',
  'Gujarati',
  'Healthy Food',
  'Home Food',
  'Hyderabadi',
  'Ice Cream',
  'Indian',
  'Indonesian',
  'Italian',
  'Italian-American',
  'Jain',
  'Japanese',
  'Kashmiri',
  'Kebabs',
  'Kerala',
  'Korean',
  'Lebanese',
  'Lucknowi',
  'Maharashtrian',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Mithai',
  'Momos',
  'Mughlai',
  'Nepalese',
  'North Eastern',
  'North Indian',
  'Oriental',
  'Paan',
  'Pan-Asian',
  'Pasta',
  'Persian',
  'Pizza',
  'Punjabi',
  'Rajasthani',
  'Rolls & Wraps',
  'Salads',
  'Seafood',
  'Sindhi',
  'South Indian',
  'Street Food',
  'Sweets',
  'Tandoor',
  'Thai',
  'Thalis',
  'Tibetan',
  'Turkish',
  'Vegan / Vegetarian',
  'Vietnamese',
];

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required('Owner name is required'),
  businessEmail: Yup.string()
    .email('Invalid email')
    .required('Business email is required'),
  businessType: Yup.string().required('Business type is required'),
  businessCategory: Yup.array().min(1, 'Select at least one category'),
});

const MerchantRegistrationScreen = ({navigation}) => {
  return (
    <View style={styles.viewContainer}>
      <HeaderWithBackButton title="Merchant Registration"></HeaderWithBackButton>
      <Formik
        initialValues={{
          ownerName: '',
          businessEmail: '',
          businessType: '',
          businessCategory: [],
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('Form submitted:', values);
          navigation.navigate('BusinessLocationScreen');
        }}>
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
              onChangeText={handleChange('ownerName')}
              error={touched.ownerName && errors.ownerName}
            />
            <CommonTextInput
              label="Business Email"
              value={values.businessEmail}
              onChangeText={handleChange('businessEmail')}
              keyboardType="email-address"
              error={touched.businessEmail && errors.businessEmail}
            />

            <Text style={styles.subLabel}>Business Type</Text>
            <View style={styles.chipRow}>
              {BUSINESS_TYPES.map(type => (
                <Chip
                  key={type}
                  selected={values.businessType === type}
                  onPress={() => setFieldValue('businessType', type)}
                  style={[
                    styles.chip,
                    values.businessType === type && styles.selectedChip,
                  ]}
                  textStyle={{
                    color: '#000',
                  }}>
                  {type}
                </Chip>
              ))}
            </View>
            {touched.businessType && errors.businessType && (
              <Text style={styles.errorText}>{errors.businessType}</Text>
            )}

            <Text style={styles.subLabel}>Business Category</Text>
            <View style={styles.chipRow}>
              {BUSINESS_CATEGORIES.map(cat => {
                const selected = values.businessCategory.includes(cat);
                const canSelectMore = values.businessCategory.length < 3;
                return (
                  <Chip
                    key={cat}
                    selected={selected}
                    onPress={() => {
                      if (selected) {
                        setFieldValue(
                          'businessCategory',
                          values.businessCategory.filter(item => item !== cat),
                        );
                      } else if (canSelectMore) {
                        setFieldValue('businessCategory', [
                          ...values.businessCategory,
                          cat,
                        ]);
                      }
                    }}
                    style={[
                      styles.chip,
                      selected && styles.selectedChip,
                      !selected && !canSelectMore && styles.disabledChip,
                    ]}
                    textStyle={{color: '#000'}}>
                    {cat}
                  </Chip>
                );
              })}
            </View>
            {touched.businessCategory && errors.businessCategory && (
              <Text style={styles.errorText}>{errors.businessCategory}</Text>
            )}

            <CommonButton onPress={handleSubmit} label="Next"></CommonButton>
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
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0179b0',
    marginBottom: 24,
    alignSelf: 'center',
  },
  subLabel: {
    color: '#0179b0',
    marginTop: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    margin: 4,
    borderColor: '#0179b0',
    borderWidth: 1,
    backgroundColor: '#fac724',
  },
  selectedChip: {
    backgroundColor: '#fac724',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default MerchantRegistrationScreen;
