import { Link } from "react-router";
import { useAuth } from "../context/useAuth";
import "./Header.css";

function Header({ cart = [] }) {
  const { isAuthenticated } = useAuth();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src="images/logo-white.png" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link
          className="account-link header-link"
          to={isAuthenticated ? "/account" : "/auth"}
        >
          <span className="account-text">
            {isAuthenticated ? "Account" : "Sign in"}
          </span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          {totalQuantity > 0 && (
            <div className="cart-quantity">{totalQuantity}</div>
          )}
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
