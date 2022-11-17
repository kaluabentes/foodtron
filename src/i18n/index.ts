import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import translations from "./locales"

const i18nConfig = {
  debug: false,
  resources: translations,
  fallbackLng: "pt-BR",
  defaultNS: "translations",
}

const initI18n = () => {
  i18n.use(LanguageDetector).use(initReactI18next).init(i18nConfig)
}

export { initI18n }
