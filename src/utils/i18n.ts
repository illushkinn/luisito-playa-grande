import es from "../content/i18n/es.json";

export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split(".");
  let value: unknown = es;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      value = undefined;
      break;
    }
  }

  let result = String(value ?? key);
  if (params) {
    for (const [param, val] of Object.entries(params)) {
      result = result.replace(`{${param}}`, String(val));
    }
  }

  return result;
}
