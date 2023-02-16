import { buildConfig } from "payload/config";
import path from "path";
// import Examples from './collections/Examples';
import Users from "./collections/Users";
import Companies from "./collections/Companies";
import Media from "./collections/Media";
import Mines from "./collections/Mines";
import Procurements from "./collections/Procurements";
import Sites from "./collections/Sites";
import { Logo } from "./components/Logo";
import { Icon } from "./components/Icon";
import CSV from "./collections/CSV";
import { CustomCell } from "./components/CustomCell";
import { LinkToDownload } from "./components/LinkToDownload";
import { ShortCut } from "./components/ShortCut";
import ReturnNull from "./components/ReturnNull";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_BASE_DNS,
  rateLimit: {
    trustProxy: true,
  },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "- Insideout",
    },
    components: {
      Nav: ReturnNull,
      afterDashboard: [ShortCut],
      routes: [
        {
          path: "/download",
          Component: CustomCell,
        },
      ],
      graphics: {
        Logo: Logo,
        Icon: Icon,
      },
    },
  },
  collections: [Users, Companies, Media, Mines, Sites, Procurements, CSV],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
