import type { Certification } from "./types";

/**
 * certifications.ts — professional certifications, newest first.
 * Extracted from the "Certifications" section of the Tableau Public visual
 * resume (see links.tableauPublic). Expiry dates below are for Adarsh's own
 * tracking (not part of the Certification type) — renew before they lapse.
 *
 * - AWS Certified Developer – Associate: expires 2026-04-28
 * - AWS Certified Data Analytics – Specialty: expires 2026-06-25
 * - Tableau Certified Data Analyst: expires 2025-12-22
 * - Databricks Generative AI Fundamentals: expires 2025-09-16
 */
export const certifications: Certification[] = [
  {
    name: "Databricks Certified Associate Developer for Apache Spark 3.0",
    issuer: "Databricks",
    year: "2023",
    credentialUrl: "https://credentials.databricks.com/05579670-56ed-4b47-a4f8-a1bedbbbfb9c",
  },
  {
    name: "Tableau Certified Data Analyst",
    issuer: "Tableau (Salesforce)",
    year: "2023",
    credentialUrl: "https://www.credly.com/badges/89ab8de0-0434-40a8-858a-b979f8df183b",
  },
  {
    name: "AWS Certified Data Analytics – Specialty",
    issuer: "Amazon Web Services (AWS)",
    year: "2023",
    credentialUrl:
      "https://www.credly.com/badges/0119fb9b-bbf2-42f9-94f4-ed8778990efe/linked_in_profile",
  },
  {
    name: "Databricks Generative AI Fundamentals",
    issuer: "Databricks",
    year: "2023",
    credentialUrl: "https://credentials.databricks.com/35e29064-5e92-4b3f-8806-c39189c75781",
  },
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services (AWS)",
    year: "2023",
    credentialUrl:
      "https://www.credly.com/badges/81601e6a-764f-4847-9a18-4744d85440a2/linked_in_profile",
  },
  {
    name: "Google Certified Associate Cloud Engineer",
    issuer: "Google Cloud",
    year: "2024",
    credentialUrl: "https://www.credly.com/badges/95ec81ff-c55e-4dfb-9870-e056eb337fc9",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    year: "2022",
    credentialUrl:
      "https://www.credly.com/badges/fa392953-23b2-4ff0-b680-a9cd86e3fc1f/linked_in_profile",
  },
  {
    name: "Tableau Desktop Specialist",
    issuer: "Tableau (Salesforce)",
    year: "2021",
    credentialUrl:
      "https://www.credly.com/badges/0f0c9545-ad84-45e2-9725-2c465e19edd5/linked_in_profile",
  },
];
