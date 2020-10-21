import { SET_SCHOOL_YEAR } from "../actions/types";

export const managementReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SCHOOL_YEAR:
      return {
        ...state,
        management: {
          ...state.management,
          schoolYear: action.payload.year,
        },
      };
    default:
      return state;
  }
};
