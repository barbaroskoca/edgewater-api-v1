import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleHelmetSecurity
} from "./common";
import { handleLoggingWithMorgan } from "./logging";
import { handleStaticFiles } from "./staticFiles";

export default [
  handleLoggingWithMorgan,
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleHelmetSecurity,
  handleStaticFiles,
];
