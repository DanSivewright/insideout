import payload from "payload";
import { useAuth, useConfig } from "payload/components/utilities";
import React from "react";
import { jsonToCsv } from "../utilities/jsonToCsv";

type Props = {};

const ProcDownload = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  console.log(window.location.pathname?.split("/")[4]);

  if (user?.role !== "admin") {
    return null;
  }

  const fetchPros = async () => {
    let url = `${process.env.PAYLOAD_PUBLIC_BASE_DNS}/api/procurements/${
      window.location.pathname?.split("/")[4]
    }`;

    console.log("url::: ", url);
    setLoading(true);
    const response = await fetch(
      `${process.env.PAYLOAD_PUBLIC_BASE_DNS}/api/procurements/${
        window.location.pathname?.split("/")[4]
      }`,
      {
        credentials: "include",
      }
    );

    const procurements = await response.json();
    setLoading(false);

    if (!procurements) {
      return;
    }

    let data = [];

    procurements.item?.forEach((item) => {
      data?.push({
        itemCode: item?.code,
        itemQuantity: item?.quantity,
        itemDescription: item?.description,
        itemEquipmentNumber: item?.equipmentNumber,
        link: `${process.env.PAYLOAD_PUBLIC_BASE_DNS}/admin/collections/procurements/${procurements?.id}`,
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
    <button
      className="btn btn--style-primary btn--icon-style-without-border btn--size-medium btn--icon-position-right"
      onClick={async () => await fetchPros()}
      type="button"
    >
      {loading ? "Downloading..." : "Download"}
    </button>
  );
};

export { ProcDownload };
