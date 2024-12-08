// noinspection JSUnusedGlobalSymbols

import { recommended } from "./configs/recommended";
import { align_enums, align_objects, alignTypes } from "./rules";

export const configs = {
  recommended,
};

export const rules = {
  "align-objects" /**/: align_objects,
  "align-enums" /*  */: align_enums,
  "align-types" /*  */: alignTypes,
};
