const initialState = {
  isLoading: true,
  isFirstGet: false,
  shopInfo: [],
  randomInt: 0,
};

// action creator
export const loadingAction = () => {
  return {
    type: "LOADING",
  };
};

export const firstGetAction = () => {
  return {
    type: "FIRST_GET",
  };
};

export const getShopInfo = (data) => {
  return {
    type: "GET_SHOP_INFO",
    data,
  };
};

export const setRandomInt = (data) => {
  return {
    type: "SET_RANDOM_INT",
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
    case "GET_SHOP_INFO":
      return {
        ...state,
        shopInfo: action.data,
      };
    case "FIRST_GET":
      return {
        ...state,
        isFirstGet: true,
      };
    case "SET_RANDOM_INT":
      return {
        ...state,
        randomInt: action.data,
      };
    default:
      return state;
  }
};

export default rootReducer;
