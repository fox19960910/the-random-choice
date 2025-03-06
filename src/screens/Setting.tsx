import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

const SettingScreen: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Hàm thay đổi ngôn ngữ
  const changeLanguage = (lng: string) => {
    console.log(i18n);

    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lng); // Thay đổi ngôn ngữ
    } else {
      console.error("i18n.changeLanguage is not available");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("language")}</Text>
      <Text style={styles.subtitle}>{i18n.t("select_language")}</Text>
      <TouchableOpacity
        onPress={() => changeLanguage("en")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeLanguage("vi")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Tiếng Việt</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff8c00",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
export default SettingScreen;
