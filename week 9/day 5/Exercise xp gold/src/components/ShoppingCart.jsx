import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  calculateTotalPrice,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
  selectProducts,
} from "../app/cartSlice.js";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(calculateTotalPrice);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = useCallback(
    (productId) => dispatch(addToCart(productId)),
    [dispatch],
  );

  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">THOUGHTFULLY MADE, EVERYDAY</p>
        <h1>A few good things.</h1>
        <p className="intro">
          Useful little finds for a home that feels like you.
        </p>
      </header>

      <div className="shop-layout">
        <section className="products-section" aria-labelledby="products-title">
          <div className="section-heading">
            <div>
              <p className="section-label">THE COLLECTION</p>
              <h2 id="products-title">Shop the edit</h2>
            </div>
            <span className="product-count">{products.length} pieces</span>
          </div>

          <ul className="product-grid">
            {products.map((product, index) => (
              <li className="product-card" key={product.id}>
                <div className={`product-art art-${product.color}`} aria-hidden="true">
                  <span className="art-number">0{index + 1}</span>
                  <span className="art-shape">{product.name.charAt(0)}</span>
                  <span className="art-caption">{product.category}</span>
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <span className="product-price">{currency.format(product.price)}</span>
                </div>
                <button
                  className="add-button"
                  type="button"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <span aria-hidden="true">+</span> Add to cart
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="cart-panel" aria-labelledby="cart-title">
          <div className="cart-heading">
            <div>
              <p className="section-label">YOUR PICKS</p>
              <h2 id="cart-title">Your bag</h2>
            </div>
            <span className="cart-count" aria-live="polite">{itemCount}</span>
          </div>

          {cartItems.length > 0 ? (
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className={`cart-thumbnail art-${item.color}`} aria-hidden="true">
                    {item.name.charAt(0)}
                  </div>
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <span>{currency.format(item.price)}</span>
                    <div className="quantity-control" aria-label={`Quantity of ${item.name}`}>
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => handleAddToCart(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-end">
                    <strong>{currency.format(item.price * item.quantity)}</strong>
                    <button
                      className="remove-button"
                      type="button"
                      aria-label={`Remove ${item.name} from bag`}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-cart">
              <span className="empty-bag" aria-hidden="true">○</span>
              <p>Your bag is waiting for something lovely.</p>
            </div>
          )}

          <div className="cart-total">
            <span>Total</span>
            <strong aria-live="polite">{currency.format(totalPrice)}</strong>
          </div>
          <p className="cart-note">Shipping and taxes calculated at checkout.</p>
        </aside>
      </div>

      <footer className="page-footer">
        <span aria-hidden="true">✳</span>
        Small things, made to last.
      </footer>
    </main>
  );
}
