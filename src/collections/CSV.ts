import { CollectionConfig } from "payload/types";

export type SizeDetails = {
  filename: string;
};

export type Type = {
  filename: string;
  alt: string;
  mimeType: string;
};

const CSV: CollectionConfig = {
  slug: "csv",
  access: {
    read: (): boolean => true, // Everyone can read csv
  },
  admin: {
    useAsTitle: "filename",
    group: "Content",
  },
  upload: {
    adminThumbnail: "card",
  },
  fields: [],
};

export default CSV;
