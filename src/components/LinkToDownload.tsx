import React from "react";
import { NavLink } from "react-router-dom";
import { Chevron } from "payload/components";
import { useAuth, useConfig } from "payload/components/utilities";
import type { User } from "../payload-types";
type Props = {};

export const LinkToDownload = (props: Props) => {
  const {
    routes: { admin: adminRoute },
  } = useConfig();
  const { user } = useAuth();

  console.log("user::: ", user);

  if (user?.role !== "admin") {
    return null;
  }
  return (
    <div className="after-nav-links">
      <span className="nav__label">Custom Routes</span>
      <nav>
        <NavLink
          className="nav__link"
          activeClassName="active"
          to={`${adminRoute}/custom-default-route`}
        >
          <Chevron />
          Default Template
        </NavLink>
        <NavLink
          className="nav__link"
          activeClassName="active"
          to={`${adminRoute}/custom-minimal-route`}
        >
          <Chevron />
          Minimal Template
        </NavLink>
      </nav>
    </div>
  );
};
