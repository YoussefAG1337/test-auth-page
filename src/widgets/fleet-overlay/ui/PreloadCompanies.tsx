import { preload } from "react-dom";
import { companiesUrl } from "../model/companies-url";

// crossOrigin "anonymous" matches fetch()'s default credentials, so the fetch reuses the response.
export function PreloadCompanies({ locale }: { locale: string }) {
  preload(companiesUrl(locale), { as: "fetch", crossOrigin: "anonymous" });
  return null;
}
