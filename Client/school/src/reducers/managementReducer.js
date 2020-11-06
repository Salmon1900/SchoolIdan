import { SET_SCHOOL_YEAR } from "../actions/types";

export const managementReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SCHOOL_YEAR:
      return {
        schoolYear: String(new Date().getFullYear()),
        selectedSchoolYear: action.payload.year
      };
    default:
      return state;
  }
};
