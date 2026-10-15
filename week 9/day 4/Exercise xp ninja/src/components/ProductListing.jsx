import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/cartSlice.js";
import { fetchProducts } from "../features/products/productThunks.js";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export default function ProductListing() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  if (status === "loading" && items.length === 0) {
    return (
      <div className="catalog-state" role="status">
        <span className="loading-spinner" aria-hidden="true" />
        <p>Gathering the good things…</p>
      </div>
    );
  }

  if (status === "failed" && items.length === 0) {
    return (
      <div className="catalog-state catalog-error">
        <p>{error}</p>
        <button className="retry-button" type="button" onClick={() => dispatch(fetchProducts())}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      {error && (
        <p className="inline-error" role="alert">
          {error}
          <button type="button" onClick={() => dispatch(fetchProducts())}>Retry</button>
        </p>
      )}
      <div className="product-grid">
        {items.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img src={product.image} alt={product.title} loading="lazy" />
              <span className="product-category">{product.category}</span>
            </div>
            <div className="product-info">
              <div className="product-rating" aria-label={`Rated ${product.rating.rate} out of 5`}>
                <span aria-hidden="true">★</span> {product.rating.rate}
                <span className="rating-count">({product.rating.count})</span>
              </div>
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-buy">
                <span className="product-price">{formatPrice(product.price)}</span>
                <button
                  className="add-to-cart"
                  type="button"
                  onClick={() => dispatch(addItem(product))}
                >
                  Add <span aria-hidden="true">+</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
