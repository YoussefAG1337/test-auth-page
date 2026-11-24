import { t, type Dictionary } from "intlayer";

// Badge labels. CLOSED and INACTIVE share "closed", ACQUIRED is "sold", and ACTIVE
// shows no badge (see model/company-status.ts).
const companyStatusContent = {
  key: "company-status",
  content: {
    closed: t({ en: "Closed", fr: "Fermée" }),
    sold: t({ en: "Sold", fr: "Vendue" }),
  },
} satisfies Dictionary;

export default companyStatusContent;
