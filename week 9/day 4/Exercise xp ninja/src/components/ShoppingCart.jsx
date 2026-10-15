import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectCartCount,
  selectCartTotal,
} from "../features/cart/cartSlice.js";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const itemCount = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setOrderPlaced(false);
    }
  }, [items.length]);

  const placeDemoOrder = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  return (
    <aside className="cart-panel" id="cart" aria-label="Shopping cart">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR EDIT</p>
          <h2>Shopping bag</h2>
        </div>
        <span className="cart-count">{itemCount}</span>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          {orderPlaced ? (
            <>
              <span className="bag-icon" aria-hidden="true">✓</span>
              <p>Your demo order is confirmed. Thanks for shopping.</p>
            </>
          ) : (
            <>
              <span className="bag-icon" aria-hidden="true">⌑</span>
              <p>Your bag is waiting for something good.</p>
              <a href="#shop">Explore the collection</a>
            </>
          )}
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt="" />
                </div>
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <span>{formatPrice(item.price)}</span>
                  <div className="quantity-controls" aria-label={`Quantity for ${item.title}`}>
                    <button
                      type="button"
                      aria-label={`Decrease ${item.title} quantity`}
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.title} quantity`}
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                    <button
                      className="remove-item"
                      type="button"
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <span className="cart-line-total">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <p>Shipping and taxes calculated at checkout.</p>
            <button className="checkout-button" type="button" onClick={placeDemoOrder}>
              Place demo order
              <span aria-hidden="true">→</span>
            </button>
            <button
              className="clear-cart"
              type="button"
              onClick={() => dispatch(clearCart())}
            >
              Clear bag
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
