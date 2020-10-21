import { SET_SCHOOL_YEAR } from "./types";

export const changeSchoolYear = (year) => {
  return {
    type: SET_SCHOOL_YEAR,
    payload: { year },
  };
};
