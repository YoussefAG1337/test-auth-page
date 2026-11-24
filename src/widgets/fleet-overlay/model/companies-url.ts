// The preload and the fetch must use the exact same URL for the browser to reuse the response.
export const companiesUrl = (locale: string) => `/api/companies?locale=${locale}`;
