import payload from "payload";
import { useAuth, useConfig } from "payload/components/utilities";
import React from "react";
import { jsonToCsv } from "../utilities/jsonToCsv";

type Props = {};

const ShortCut = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return null;
  }

  const fetchPros = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_BASE_DNS}/api/procurements`,
      {
        credentials: "include",
      }
    );

    const procurements = await response.json();
    setLoading(false);

    if (!procurements?.docs?.length) {
      alert("There are no docs to be downloaded");
      return;
    }

    let data = [];

    procurements?.docs?.forEach((doc) => {
      doc.item?.forEach((item) => {
        console.log("item::: ", item);
        data?.push({
          itemCode: item?.code,
          itemQuantity: item?.quantity,
          itemDescription: item?.description,
          itemEquipmentNumber: item?.equipmentNumber,
          administrator: doc?.administrator,
          applicant: doc?.applicant?.name,
          applicantEmail: doc?.applicant?.email,
          company: doc?.company?.name,
          mine: doc?.site?.mine?.name,
          site: doc?.site?.name,
          department: doc?.department,
          description: doc?.description,
          equipmentNumber: doc?.equipmentNumber,
          project: doc?.project,
          state: doc?.state,
          link: `${process.env.PAYLOAD_PUBLIC_BASE_DNS}/admin/collections/procurements/${doc?.id}`,
          createdAt: doc?.createdAt,
          updatedAt: doc?.updatedAt,
        });
      });
    });
    const { download } = jsonToCsv(
      data,
      // @ts-ignore
      "procurements.csv"
    );
    download();
  };
  return (
    <>
      {/* <hr
        style={{
          margin: "2rem 0",
          height: "1px",
          border: "1px solid lightgrey",
        }}
      /> */}
      <h2 className="dashboard__label">Shortcuts</h2>
      <li
        onClick={async () => await fetchPros()}
        style={{ listStyle: "none", width: "fit-content" }}
      >
        <div
          className="card card-procurements card--has-onclick"
          id="card-procurements"
        >
          <h5>{loading ? "Downloading..." : "Download All Procurements"}</h5>
          <div className="card__actions">
            <button
              type="button"
              className="btn btn--style-icon-label btn--icon btn--icon-style-with-border btn--icon-only btn--round btn--size-medium btn--icon-position-right"
            ></button>
          </div>
          <button
            type="button"
            className="btn card__click btn--style-none btn--icon-style-without-border btn--size-medium btn--icon-position-right"
          >
            <aside className="tooltip btn__tooltip"></aside>
            <span className="btn__content"></span>
          </button>
        </div>
      </li>
    </>
  );
};

export { ShortCut };
