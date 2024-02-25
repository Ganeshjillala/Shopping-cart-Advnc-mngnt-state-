import { useContext } from "react";
import { Cartcontext } from "./Store/Createcart-context";
export default function Cart({ onUpdateItemQuantity }) {
  const CartCtxt = useContext(Cartcontext);
  /*we can destructure it as const {items}  and replace CartCtxt.items with items */
  const totalPrice = CartCtxt.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {CartCtxt.items.length === 0 && <p>No items in cart!</p>}
      {CartCtxt.items.length > 0 && (
        <ul id="cart-items">
          {CartCtxt.items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => CartCtxt.toUpdateCart(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => CartCtxt.toUpdateCart(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
