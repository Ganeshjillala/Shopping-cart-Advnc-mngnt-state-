import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../../dummy-products";
export const Cartcontext = createContext({
  items: [],
  addItemtoCart: () => {},
  toUpdateCart: () => {},
});
function Reducerfunction(state, action) {
  if (action.type === "ADD-ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload,
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
     ...state , // [here it is not needed but when we have multiple states, we should also write this line, so that other  state values will not erased/changed]
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE-ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId,
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
  return state;
}
export default function CartcontextProvider({ children }) {
  const [shoppingCartr, dispatchShoppingCart] = useReducer(Reducerfunction, {
    items: [],
  });

  function handleAddItemToCart(id) {
    dispatchShoppingCart({
      type: "ADD-ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    dispatchShoppingCart({
      type: "UPDATE-ITEM",
      payload: { productId, amount }, //used destructring here(productId:productId,amount:amount)
    });
  }

  // to use context not only to read values, usecontext also used to update the values(without passing as props) from one component to other
  const CartCntxt = {
    items: shoppingCartr.items,
    addItemtoCart: handleAddItemToCart,
    toUpdateCart: handleUpdateCartItemQuantity,
  };
  return (
    <Cartcontext.Provider value={CartCntxt}>{children}</Cartcontext.Provider>
  );
}
