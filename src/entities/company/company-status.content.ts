import { t, type Dictionary } from "intlayer";

const companyStatusContent = {
  key: "company-status",
  content: {
    closed: t({ en: "Closed", fr: "Fermée" }),
    sold: t({ en: "Sold", fr: "Vendue" }),
  },
} satisfies Dictionary;

export default companyStatusContent;
