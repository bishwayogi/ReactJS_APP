export const initialState = {
  cart: [],
};

export function storeReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, cart: [...state.cart, action.id] };
    case 'REMOVE':
      return { ...state, cart: state.cart.filter((x) => x !== action.id) };
    default:
      return state;
  }
}
