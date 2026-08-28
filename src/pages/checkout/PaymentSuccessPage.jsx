import { Link } from "react-router";
import Header from "../../components/Header";
import { formatMoney } from "../../utils/money";
import "./PaymentSuccessPage.css";

function PaymentSuccessPage() {
  const storedOrder = JSON.parse(
    localStorage.getItem("lastOrderSummary") || "null",
  );
  const orderTotal = storedOrder?.totalCostCents ?? 0;
  const orderId = storedOrder?.id ?? "N/A";

  return (
    <>
      <Header />
      <main className="payment-success-page">
        <section className="success-panel">
          <div className="success-icon">✓</div>
          <p className="success-eyebrow">Payment successful</p>
          <h1>Thank you for your order</h1>
          <p className="success-message">
            Thank you! Your order has been placed and a confirmation email is on
            the way.
          </p>

          <div className="success-summary">
            <div className="success-summary-row">
              <span>Order ID</span>
              <strong>{orderId}</strong>
            </div>
            <div className="success-summary-row">
              <span>Total</span>
              <strong>${formatMoney(orderTotal)}</strong>
            </div>
          </div>

          <div className="success-actions">
            <Link className="button-primary success-button" to="/orders">
              View orders
            </Link>
            <Link className="button-secondary success-button" to="/">
              Continue shopping
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default PaymentSuccessPage;
