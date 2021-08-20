export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      let updatedArray = [...state.basket];
      let [existingItem] = updatedArray.filter(
        (item) => item.id === action.item.id
      );
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + action.item.quantity;
        return {
          ...state,
          basket: updatedArray,
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      }
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default reducer;
