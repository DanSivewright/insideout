import { CollectionConfig } from "payload/types";
import { CallToAction } from "../blocks/CallToAction";
import { Content } from "../blocks/Content";
import { MediaBlock } from "../blocks/Media";
import { hero } from "../fields/hero";
import { slugField } from "../fields/slug";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    group: "Content",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [hero],
        },
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              required: true,
              blocks: [CallToAction, Content, MediaBlock],
            },
          ],
        },
      ],
    },
    slugField(),
  ],
};
