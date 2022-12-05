import { CollectionConfig } from "payload/types";

const Procurements: CollectionConfig = {
  slug: "procurements",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Requisition",
          description: "All requisition details",
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
                      admin: {
                        isSortable: true,
                        width: "50%",
                      },
                    },
                    {
                      name: "administrator",
                      label: "Administrator",
                      type: "relationship",
                      relationTo: "users",
                      admin: {
                        isSortable: true,
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
                      type: "select",
                      admin: {
                        isClearable: true,
                        isSortable: true,
                        width: "50%",
                      },
                      options: [
                        {
                          label: "Department Option One",
                          value: "Department Option One",
                        },
                        {
                          label: "Department Option Two",
                          value: "Department Option Two",
                        },
                        {
                          label: "Department Option Three",
                          value: "Department Option Three",
                        },
                        {
                          label: "Department Option Four",
                          value: "Department Option Four",
                        },
                      ],
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
      ],
    },
    {
      name: "invoice",
      label: "Invoice",
      type: "upload",
      relationTo: "media",
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "quote",
      label: "Quote",
      type: "upload",
      relationTo: "media",
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Procurements;
