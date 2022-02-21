const initialState = {
  token: []
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CART":
      return {
        token: [...state.token, action.data]
      };
    case "REMOVE_CART":
      return {
        token: state.token?.filter(e => e?.id !== action.data?.id)
      };
      case "EDIT_CART":
        return {
          token: state.token?.filter(e => e?.id !== action.data?.id)
        };
    default:
      return state;
  }
}
