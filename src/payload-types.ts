/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  roles?: ("admin" | "editor" | "user")[];
  companies?: string | Company;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "companies".
 */
export interface Company {
  id: string;
  name: string;
  description: {
    [k: string]: unknown;
  }[];
  featureImages: {
    image?: string | Media;
    id?: string;
  }[];
  logo?: string | Media;
  slug?: string;
  _status?: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes: {
    card: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    portrait: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    square: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    feature: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sites".
 */
export interface Site {
  id: string;
  name: string;
  description: {
    [k: string]: unknown;
  }[];
  featureImages: {
    image?: string | Media;
    id?: string;
  }[];
  slug?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "mines".
 */
export interface Mine {
  id: string;
  name: string;
  description: {
    [k: string]: unknown;
  }[];
  featureImages: {
    image?: string | Media;
    id?: string;
  }[];
  company: string | Company;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "procurements".
 */
export interface Procurement {
  id: string;
  site: string | Site;
  applicant?: string | User;
  administrator?: string | User;
  department?:
    | "Department Option One"
    | "Department Option Two"
    | "Department Option Three"
    | "Department Option Four";
  project: string;
  equipmentNumber: string;
  description: string;
  item: {
    quantity: number;
    unit: string;
    description?: string;
    partNumber?: string;
    id?: string;
  }[];
  quote?: string | Media;
  quoteComment?: string;
  invoice?: string | Media;
  invoiceComment?: string;
  _status?: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}