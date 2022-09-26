import * as crypto from "crypto";
import * as yaml from "js-yaml";
import type {
  Config,
  Path,
  TransformOptions,
  TransformedSource,
  Transformer,
} from "./jest-types";

const getCacheKey = (
  fileData: string,
  filePath: string,
  configString: string,
  options: TransformOptions
): string => {
  return crypto
    .createHash("md5")
    .update(fileData)
    .update(
      typeof configString === "string"
        ? configString
        : JSON.stringify(configString)
    )
    .digest("hex");
};

export const process = (
  sourceText: string,
  sourcePath: Path,
  config: Config,
  options?: TransformOptions
): TransformedSource => {
  const result = yaml.load(sourceText);
  const json = JSON.stringify(result, undefined, "\t");

  // process() and processAsync() methods of a custom transformer module cannot
  // return a string anymore. They must always return an object.
  //
  // https://jestjs.io/docs/28.x/upgrading-to-jest28#transformer
  return { code: `module.exports = ${json}` };
};

const transformer: Transformer = {
  getCacheKey,
  process,
};

export default transformer;
