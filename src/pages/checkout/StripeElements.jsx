import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutStripeForm from "./CheckoutStripeForm";

// Use your Stripe Publishable Key here (safe for public code)
const stripePromise = loadStripe(
  "pk_test_51FXpBpIdAH106Wrqp2WMIDvTEaJOZYy0YmTYULsdGs2oOwfGTpVjK7wrt04MpddutqLPcJKe1jht3x5bKpq5AX6900zrAx5Mr5",
);

function StripeElements() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Request the PaymentIntent from your Express backend as soon as the page loads
    fetch("http://localhost:3000/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error fetching payment intent:", err));
  }, []);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className="App">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutStripeForm />
        </Elements>
      ) : (
        <div>Loading payment systems...</div>
      )}
    </div>
  );
}

export default StripeElements;
