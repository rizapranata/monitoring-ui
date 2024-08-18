import { getMedicalRecords } from "../../api/medicalRecord";
import {
    SUCCESS_FETCHING_MEDICAL,
    START_FETCHING_MEDICAL,
    ERROR_FETCHING_MEDICAL,
    SET_PAGE,
    SET_KEYWORD,
    NEXT_PAGE,
    PREV_PAGE
} from "./constants";
import debounce from "debounce-promise";

let debouncheFetchMedical = debounce(getMedicalRecords, 1000);

export const fetchMedicalRec = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingMedical());

        let keyword = getState().medicalRecords.keyword || "";
        console.log("get keyword:", keyword);

        let params = {};

        if (keyword === "") {
          params = {
            size: 50,
          };
        }else{
          params = {
            size: 50,
            noRm: keyword
          };
        }

        try {
            let {
                data: {data, count},
            } = await debouncheFetchMedical(params);

            dispatch(successFetchingMedical({data, count}));
        } catch (err) {
            dispatch(errorFetchingMedical())
        }

    }
}

export const startFetchingMedical = () => {
    return {
        type: START_FETCHING_MEDICAL,
    }
}

export const errorFetchingMedical = () => {
    return {
        type: ERROR_FETCHING_MEDICAL,
    }
}

export const successFetchingMedical = ({data, count}) => {
    return {
        type: SUCCESS_FETCHING_MEDICAL,
        data,
        count
    }
}


export const setPage = (number = 1) => {
    return {
      type: SET_PAGE,
      currentPage: number,
    };
  };
  
  export const setKeyword = (keyword) => {
    return {
      type: SET_KEYWORD,
      keyword,
    };
  };
  
  export const goToNextPage = () => {
    return {
      type: NEXT_PAGE,
    };
  };
  
  export const goToPrevPage = () => {
    return {
      type: PREV_PAGE,
    };
  };
  