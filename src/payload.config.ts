import { buildConfig } from "payload/config";
import path from "path";
// import Examples from './collections/Examples';
import Users from "./collections/Users";
import Companies from "./collections/Companies";
import Media from "./collections/Media";
import Mines from "./collections/Mines";
import Procurements from "./collections/Procurements";
import Sites from "./collections/Sites";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  collections: [Users, Companies, Media, Mines, Sites, Procurements],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
