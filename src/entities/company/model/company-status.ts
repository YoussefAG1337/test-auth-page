export const CompanyStatus = {
  ACTIVE: "ACTIVE",
  CLOSED: "CLOSED",
  ACQUIRED: "ACQUIRED",
  INACTIVE: "INACTIVE",
} as const;

export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus];
