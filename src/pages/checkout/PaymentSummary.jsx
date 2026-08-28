import { useEffect } from "react";
import { formatMoney } from "../../utils/money";
import StripeElements from "./StripeElements";

export const PaymentSummary = ({ paymentSummary, totalQuantity }) => {
  useEffect(() => {
    if (!paymentSummary) {
      return;
    }

    const orderSummary = {
      id: crypto.randomUUID(),
      orderDate: new Date().toISOString(),
      ...paymentSummary,
    };

    localStorage.setItem("lastOrderSummary", JSON.stringify(orderSummary));
  }, [paymentSummary]);

  return (
    <>
      <div className="payment-summary-row">
        <div>Items ({totalQuantity}):</div>
        <div className="payment-summary-money">
          {formatMoney(paymentSummary?.productCostCents || "Not Available")}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          {paymentSummary?.shippingCostCents > 0
            ? formatMoney(paymentSummary?.shippingCostCents)
            : "Free"}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          {formatMoney(
            paymentSummary?.totalCostBeforeTaxCents || "Not Available",
          )}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">
          {formatMoney(paymentSummary?.taxCents || "Not Available")}
        </div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">
          {formatMoney(paymentSummary?.totalCostCents || "Not Available")}
        </div>
      </div>

      <StripeElements />
    </>
  );
};
