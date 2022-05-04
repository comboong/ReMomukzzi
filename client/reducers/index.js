const initialState = {
  isLoading: true,
  shopInfo: [],
};

// action creator
export const loadingAction = () => {
  return {
    type: "LOADING",
  };
};

export const getShopInfo = (data) => {
  return {
    type: "GET_SHOPINFO",
    data,
  };
};

// (이전 상태, 액션) => 다음 상태
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_SHOPINFO":
      return {
        ...state,
        shopInfo: action.data,
      };
    default:
      return state;
  }
};

export default rootReducer;
