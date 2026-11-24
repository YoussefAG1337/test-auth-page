// Company statuses, copied from the Stolos web app.
// On a company card, CLOSED and INACTIVE show the "closed" badge, ACQUIRED the "sold" badge, ACTIVE no badge.

export const CompanyStatus = {
  ACTIVE: "ACTIVE",
  CLOSED: "CLOSED",
  ACQUIRED: "ACQUIRED",
  INACTIVE: "INACTIVE",
} as const;

export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus];
