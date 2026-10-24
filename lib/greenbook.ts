/* Mock Greenbook registry.
   Placeholder product names, registration numbers and dates are examples only
   and should be replaced with real Greenbook data (spec section 16 / PRD). */

export type GreenbookStatus = "registered" | "not-found" | "expired";

export type GreenbookRecord = {
  regNo: string;
  product: string;
  brand?: string;
  manufacturer: string;
  status: GreenbookStatus;
  updatedAt: string; // ISO date the record was last updated
};

export const GREENBOOK_UPDATED = "2026-09-14";

export const GREENBOOK: GreenbookRecord[] = [
  {
    regNo: "A4-0001",
    product: "Lipton Yellow Label Tea",
    brand: "Lipton",
    manufacturer: "Unilever Nigeria Plc",
    status: "registered",
    updatedAt: "2026-08-20",
  },
  {
    regNo: "A4-8891",
    product: "Peak Evaporated Milk",
    brand: "Peak",
    manufacturer: "FrieslandCampina WAMCO Nigeria Plc",
    status: "registered",
    updatedAt: "2026-08-20",
  },
  {
    regNo: "A4-3307",
    product: "Maltina Malt Drink",
    brand: "Maltina",
    manufacturer: "Nigerian Breweries Plc",
    status: "registered",
    updatedAt: "2026-08-20",
  },
  {
    regNo: "B2-1140",
    product: "Panadol Extra Tablets",
    brand: "Panadol",
    manufacturer: "GSK Consumer Nigeria PLC",
    status: "registered",
    updatedAt: "2026-08-20",
  },
  {
    regNo: "D4-1234",
    product: "Antimalarial Syrup (sample)",
    brand: "MediCare",
    manufacturer: "Sample Pharma Ltd",
    status: "expired",
    updatedAt: "2026-03-10",
  },
  {
    regNo: "B9-7742",
    product: "Hillsong Herbal Tea",
    brand: "Hillsong",
    manufacturer: "Hillsong Natural Products",
    status: "not-found",
    updatedAt: "2026-09-14",
  },
];

/* Lookup by NAFDAC number. Registration numbers are not always unique —
   matching uses number plus product name and manufacturer (PRD). If several
   products share one number, the caller gets all matches for disambiguation. */
export function lookupByRegNo(regNo: string): GreenbookRecord[] {
  const normalized = regNo.toUpperCase().replace(/\s+/g, "");
  return GREENBOOK.filter((r) => r.regNo === normalized);
}

export function searchByName(query: string): GreenbookRecord[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return GREENBOOK.filter(
    (r) =>
      r.product.toLowerCase().includes(q) ||
      (r.brand && r.brand.toLowerCase().includes(q)) ||
      r.manufacturer.toLowerCase().includes(q) ||
      r.regNo.toLowerCase().includes(q),
  );
}
