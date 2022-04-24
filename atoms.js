import { atom } from "recoil";

export const currentPointState = atom({
  key: "currentPointState", // unique ID (with respect to other atoms/selectors)
  default: "0", // default value (aka initial value)
});
