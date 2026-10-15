import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "./components/AuthForm.jsx";
import ProductListing from "./components/ProductListing.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import { selectCartCount } from "./features/cart/cartSlice.js";
import { fetchProducts } from "./features/products/productThunks.js";

export default function App() {
  const dispatch = useDispatch();
  const productStatus = useSelector((state) => state.products.status);
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productStatus]);

  return (
    <div className="storefront">
      <div className="announcement">
        Considered goods for a life well lived <span>·</span> Complimentary shipping over $100
      </div>

      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Form and Field home">
          FORM<span>&amp;</span>FIELD
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#shop">Shop all</a>
          <a href="#story">Our story</a>
        </nav>
        <div className="header-actions">
          <AuthForm />
          <a className="cart-link" href="#cart" aria-label={`Shopping bag, ${cartCount} items`}>
            Bag <span>{cartCount}</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="story">
          <div className="hero-copy">
            <p className="eyebrow">THE EVERYDAY, ELEVATED</p>
            <h1>Thoughtful things.<br />Made to <em>last.</em></h1>
            <p className="hero-description">
              A considered collection of useful, beautiful objects for the rituals
              that make a home.
            </p>
            <a className="hero-link" href="#shop">
              Discover the collection <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-art" aria-label="Curated collection of everyday objects">
            <div className="hero-disc disc-one" />
            <div className="hero-disc disc-two" />
            <div className="hero-vase vase-one" />
            <div className="hero-vase vase-two" />
            <div className="hero-caption">OBJECTS FOR SLOWER DAYS — NO. 04</div>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2>Objects with intention</h2>
            </div>
            <span>01 — 08</span>
          </div>
          <div className="shop-layout">
            <section className="catalog" aria-label="Products">
              <ProductListing />
            </section>
            <ShoppingCart />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#">FORM<span>&amp;</span>FIELD</a>
        <p>Fewer, better things.</p>
        <span>© 2026 Form &amp; Field</span>
      </footer>
    </div>
  );
}
