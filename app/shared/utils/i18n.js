import { I18nManager } from "react-native";
import strings from "../constants/locales/locales";

let currentLanguage = "en";

export const setLanguage = (lang) => {
  currentLanguage = lang;
  I18nManager.forceRTL(lang === "ar"); // only if using RTL languages
};

export const localText = (key) => {
  return strings[currentLanguage][key] || key;
};
