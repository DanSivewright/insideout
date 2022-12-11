import { CollectionConfig } from "payload/types";
import { Company } from "../payload-types";

const Procurements: CollectionConfig = {
  slug: "procurements",
  admin: {
    useAsTitle: "name",
  },
  access: {
    // read: isCompanyEditor("site", "mine"),
    read: async ({ req: { user, payload } }) => {
      if (!user) return false;
      if (user.role === "admin") return true;

      const mines = await payload.find({
        collection: "mines",
        where: {},
      });
      console.log("MINES::: ", mines);
      // if (!company) return false;
      console.log();
      return true;
      // return {
      //   mine: {
      //     // @ts-ignore
      //     equals: company.mines?.[0],
      //   },
      // };
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "site",
      type: "relationship",
      relationTo: "sites",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Requisition",
          fields: [
            {
              label: "Requisition",
              type: "collapsible",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "applicant",
                      label: "Applicant",
                      type: "relationship",
                      relationTo: "users",
                      access: {
                        update: ({ req: { user } }) => {
                          if (user?.role === "user") {
                            return false;
                          }
                          return true;
                        },
                        create: ({ req: { user } }) => {
                          if (user?.role === "user") {
                            return false;
                          }
                          return true;
                        },
                      },
                      defaultValue: ({ user }) => {
                        if (user?.role === "user") {
                          return user.id;
                        }
                      },
                      admin: {
                        isSortable: true,
                        width: "50%",
                      },
                    },
                    {
                      name: "administrator",
                      label: "Administrator",
                      type: "text",
                      admin: {
                        width: "50%",
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "department",
                      type: "text",
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "project",
                      label: "Project",
                      type: "text",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "equipmentNumber",
                      label: "Equipment Number",
                      type: "text",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "description",
                      label: "Description",
                      type: "text",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                  ],
                },
              ],
            },
            {
              label: "Line Items",
              type: "collapsible",
              fields: [
                {
                  name: "item",
                  type: "array",
                  label: "Line Items",
                  minRows: 1,
                  labels: {
                    singular: "Line Item",
                    plural: "Line Items",
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "quantity",
                          label: "Quantity",
                          type: "number",
                          required: true,
                          min: 1,
                          admin: {
                            width: "15%",
                          },
                        },
                        {
                          name: "unit",
                          label: "Unit",
                          type: "text",
                          required: true,
                          admin: {
                            width: "15%",
                          },
                        },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                          admin: {
                            width: "60%",
                          },
                        },
                        {
                          name: "partNumber",
                          label: "Part No.",
                          type: "text",
                          admin: {
                            width: "10%",
                          },
                        },
                      ],
                    },
                  ],
                  admin: {
                    components: {
                      // @ts-ignore
                      RowLabel: ({ index }) => {
                        return `${String(index).padStart(2, "0")}`;
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Quotations",
          fields: [
            {
              name: "quote",
              label: "Quote",
              type: "upload",
              relationTo: "media",
              unique: true,
            },
            {
              name: "quoteComment",
              label: "Comment",
              type: "text",
            },
          ],
        },
        {
          label: "Invoices",
          fields: [
            {
              name: "invoice",
              label: "Invoice",
              type: "upload",
              relationTo: "media",
              unique: true,
            },
            {
              name: "invoiceComment",
              label: "Comment",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};

export default Procurements;
