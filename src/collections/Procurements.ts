import payload from "payload";
import { CollectionBeforeOperationHook, CollectionConfig } from "payload/types";
import { belongsToCompany } from "../access/belongsToCompany";
import { belongsToCompanyAndAuthored } from "../access/belongsToCompanyAndAuthored";
import { isCompanyEditor } from "../access/isCompanyEditor";
import { isProcFinalizedAndPublished } from "../access/isProcFinalizedAndPublished";
import { populateAuthor } from "../hooks/populateAuthor";
import { populateCompany } from "../hooks/populateCompany";
import Papa from "papaparse";

const Procurements: CollectionConfig = {
  slug: "procurements",
  admin: {
    useAsTitle: "name",
    group: "Procurements",
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // console.log("data::: ", data);
        if (!data.csv) return data;
        const csvRes = await payload.findByID({
          collection: "csv",
          id: data.csv,
        });

        // console.log("csv::: ", csv);
        const res = await fetch(csvRes.url);
        const csv = await res.text();

        const lines = csv.split("\n");

        const headers = lines[0]
          .split(",")
          .map((header) => header.replace(/\r/g, "").trim().toLowerCase());

        const json = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i]
            .split(",")
            .map((value) => value.replace(/\r/g, "").trim());

          const obj = {};

          headers.forEach((header, index) => {
            obj[header] = values[index];
          });

          if (Object.values(obj).join("")) json.push(obj);
        }

        return {
          ...data,
          item: json,
          csv: null,
        };
      },
    ],
  },
  versions: {
    drafts: true,
  },
  access: {
    delete: isCompanyEditor("company"),
    update: belongsToCompany("company"),
    read: belongsToCompanyAndAuthored("company"),
    create: belongsToCompany("company"),
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
      name: "company",
      label: "Company",
      type: "relationship",
      relationTo: "companies",
      admin: {
        condition: () => false,
        readOnly: true,
        position: "sidebar",
      },
      hooks: {
        beforeChange: [populateCompany],
      },
    },
    {
      admin: {
        position: "sidebar",
      },
      name: "state",
      label: "State",
      type: "select",
      options: [
        { label: "Accepted", value: "accepted" },
        { label: "Rejected", value: "rejected" },
        { label: "Finalized", value: "finalized" },
      ],
    },
    {
      name: "author",
      relationTo: "users",
      type: "relationship",
      hooks: {
        beforeChange: [populateAuthor],
      },
      admin: {
        condition: () => false,
        readOnly: true,
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
                  type: "upload",
                  name: "csv",
                  relationTo: "csv",
                  label: "Upload from CSV",
                },
                {
                  name: "item",
                  type: "array",
                  access: {
                    create: (e) => !isProcFinalizedAndPublished(e),
                    update: (e) => !isProcFinalizedAndPublished(e),
                  },
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
                          access: {
                            create: (e) => !isProcFinalizedAndPublished(e),
                            update: (e) => !isProcFinalizedAndPublished(e),
                          },
                        },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                          admin: {
                            width: "70%",
                          },
                          access: {
                            create: (e) => !isProcFinalizedAndPublished(e),
                            update: (e) => !isProcFinalizedAndPublished(e),
                          },
                        },
                        {
                          name: "code",
                          label: "Code",
                          type: "text",
                          admin: {
                            width: "15%",
                          },
                          access: {
                            create: (e) => !isProcFinalizedAndPublished(e),
                            update: (e) => !isProcFinalizedAndPublished(e),
                          },
                        },
                      ],
                    },
                    {
                      admin: {
                        condition: (data) => {
                          const { _status = undefined, state = undefined } =
                            data;
                          if (
                            _status === "published" &&
                            state === "finalized"
                          ) {
                            return true;
                          }
                          return false;
                        },
                      },
                      name: "image",
                      label: "Delivery Proof",
                      type: "upload",
                      relationTo: "media",
                      unique: true,
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
              access: {
                create: isProcFinalizedAndPublished,
                update: isProcFinalizedAndPublished,
              },
            },
            {
              name: "quoteComment",
              label: "Comment",
              type: "text",
              access: {
                create: isProcFinalizedAndPublished,
                update: isProcFinalizedAndPublished,
              },
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
              access: {
                create: isProcFinalizedAndPublished,
                update: isProcFinalizedAndPublished,
              },
            },
            {
              name: "invoiceComment",
              label: "Comment",
              type: "text",
              access: {
                create: isProcFinalizedAndPublished,
                update: isProcFinalizedAndPublished,
              },
            },
          ],
        },
      ],
    },
  ],
};

export default Procurements;
