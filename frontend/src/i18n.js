import i18n from "i18next";

import {
  initReactI18next,
} from "react-i18next";

/* ================= LANGUAGES ================= */

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";
import zh from "./locales/zh.json";

/* ================= RESOURCES ================= */

const resources = {

  en: {
    translation: en,
  },

  fr: {
    translation: fr,
  },

  ar: {
    translation: ar,
  },

  zh: {
    translation: zh,
  },

};

/* ================= DEFAULT LANGUAGE ================= */

const savedLanguage =
  localStorage.getItem("language") || "en";

/* ================= INIT ================= */

i18n

  .use(initReactI18next)

  .init({

    resources,

    lng: savedLanguage,

    fallbackLng: "en",

    debug: false,

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

  });

/* ================= HTML LANG ================= */

document.documentElement.lang =
  savedLanguage;

/* ================= RTL ================= */

document.documentElement.dir =

  savedLanguage === "ar"
    ? "rtl"
    : "ltr";

/* ================= LANGUAGE CHANGE ================= */

i18n.on(
  "languageChanged",
  (lng) => {

    /* SAVE */

    localStorage.setItem(
      "language",
      lng
    );

    /* HTML LANG */

    document.documentElement.lang =
      lng;

    /* RTL */

    document.documentElement.dir =

      lng === "ar"
        ? "rtl"
        : "ltr";

    /* BODY CLASS */

    document.body.classList.remove(
      "lang-en",
      "lang-fr",
      "lang-ar",
      "lang-zh"
    );

    document.body.classList.add(
      `lang-${lng}`
    );

  }
);

/* ================= INITIAL BODY CLASS ================= */

document.body.classList.add(
  `lang-${savedLanguage}`
);

/* ================= EXPORT ================= */

export default i18n;