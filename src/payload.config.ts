import { buildConfig } from "payload/config";
import path from "path";
// import Examples from './collections/Examples';
import Users from "./collections/Users";
import Companies from "./collections/Companies";
import Media from "./collections/Media";
import Mines from "./collections/Mines";
import Sites from "./collections/Sites";
import Procurements from "./collections/Procurements";
import Menus from "./collections/Menus";
import { Pages } from "./collections/Pages";
import { Logo } from "./components/Logo";
import { Icon } from "./components/Icon";

export default buildConfig({
  serverURL:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : process.env.PAYLOAD_PUBLIC_BASE_DNS,
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: Logo,
        Icon: Icon,
      },
    },
  },
  rateLimit: {
    trustProxy: true,
  },
  collections: [
    Users,
    Companies,
    Media,
    Mines,
    Sites,
    Procurements,
    Menus,
    Pages,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
