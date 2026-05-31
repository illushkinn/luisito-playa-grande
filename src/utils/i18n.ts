import es from "../content/i18n/es.json";
import en from "../content/i18n/en.json";

const locales: Record<string, Record<string, string | object>> = { es, en };

function getInitialLocale(): string {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("locale");
    if (stored && locales[stored]) return stored;
  }
  if (typeof navigator !== "undefined") {
    const browser = navigator.language?.split("-")[0];
    if (browser && locales[browser]) return browser;
  }
  return "es";
}

let currentLocale = getInitialLocale();

export function setLocale(locale: string): void {
  if (locales[locale]) {
    currentLocale = locale;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("locale", locale);
    }
  }
}

export function getLocale(): string {
  return currentLocale;
}

export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split(".");
  let value: unknown = locales[currentLocale];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      value = undefined;
      break;
    }
  }

  if (value === undefined) {
    let fallback: unknown = locales["es"];
    for (const k of keys) {
      if (fallback && typeof fallback === "object" && k in fallback) {
        fallback = (fallback as Record<string, unknown>)[k];
      } else {
        fallback = undefined;
        break;
      }
    }
    value = fallback ?? key;
  }

  let result = String(value);
  if (params) {
    for (const [param, val] of Object.entries(params)) {
      result = result.replace(`{${param}}`, String(val));
    }
  }

  return result;
}
