import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "../sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Snakzee Admin Studio",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});
