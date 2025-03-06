import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./en.json";
import vi from "./vi.json";

// Định nghĩa các ngôn ngữ được hỗ trợ
const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18n
  .use(initReactI18next) // Kết nối với React
  .init({
    resources,
    lng: Localization.locale.split("-")[0] || "en", // Lấy ngôn ngữ từ thiết bị, mặc định là 'en'
    fallbackLng: "en", // Ngôn ngữ dự phòng nếu không tìm thấy ngôn ngữ hiện tại
    interpolation: {
      escapeValue: false, // React Native đã tự động thoát chuỗi
    },
    compatibilityJSON: "v4", // Đảm bảo tương thích với Expo
  });

export default i18n;
