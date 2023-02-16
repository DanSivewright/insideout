import React from "react";
import { Redirect } from "react-router-dom";
import { DefaultTemplate } from "payload/components/templates";
import { Button, Eyebrow } from "payload/components/elements";
import { AdminView } from "payload/config";
import { useStepNav } from "payload/components/hooks";
import { Meta, useConfig } from "payload/components/utilities";

export const CustomCell: AdminView = ({ user, canAccessAdmin }) => {
  const {
    routes: { admin: adminRoute },
  } = useConfig();
  const { setStepNav } = useStepNav();

  React.useEffect(() => {
    setStepNav([
      {
        label: "Custom Route with Default Template",
      },
    ]);
  }, [setStepNav]);

  if (!user || (user && !canAccessAdmin)) {
    return <Redirect to={`${adminRoute}/unauthorized`} />;
  }

  return (
    <DefaultTemplate>
      <Meta
        title="Custom Route with Default Template"
        description="Building custom routes into Payload is easy."
        keywords="Custom React Components, Payload, CMS"
      />
      <Eyebrow />
      <h1>Custom Route</h1>
      <p>
        Here is a custom route that was added in the Payload config. It uses the
        Default Template, so the sidebar is rendered.
      </p>
      <Button el="link" to={`${adminRoute}`} buttonStyle="secondary">
        Go to Dashboard
      </Button>
    </DefaultTemplate>
  );
};
