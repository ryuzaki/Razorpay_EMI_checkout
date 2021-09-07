import { useEffect } from "react";

import "./styles.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function App() {
  useEffect(() => {
    const loadRazorPay = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/razorpay.js"
      );
      if (!res) {
        console.log("RazorPay not loaded");
      }
    };
    loadRazorPay();
  }, []);

  const handlePay = () => {
    let orderId = "anc123213123213123";
    var newCard = {
      callback_url: `https://app.arzooo.com/order/success?%7B%22orderId%22:%${orderId}%22,%22amount%22:%${300000}%22%7D/`,
      amount: 300000,
      email: "gaurav.kumar@example.com",
      contact: "9123456780",
      account_id: "acc_HbE5PgV3DbtDjr",
      method: "emi",
      emi_duration: 9,
      "card[name]": "Gaurav Kumar",
      "card[number]": "5241810000000000",
      "card[cvv]": "566",
      "card[expiry_month]": "10",
      "card[expiry_year]": "25"
    };

    // var cardLessEMI = {
    //   amount: 5000000,
    //   email: "gaurav.kumar@example.com",
    //   contact: "9123456780",
    //   order_id: "order_9A33XWu170gUtm",
    //   method: "cardless_emi",
    //   provider: "icic"
    // };

    const razorPay = new window.Razorpay({
      key: "rzp_test_partner_HbE040J2xMfsqU"
    });

    razorPay.on("payment.success", function (cardLessEMI) {
      alert(newCard.razorpay_payment_id);
      alert(newCard.razorpay_order_id);
      alert(newCard.razorpay_signature);
    }); // will pass payment ID, order ID, and Razorpay signature to success handler.
    razorPay.on("payment.error", function (cardLessEMI) {
      alert(newCard.error.description);
    });

    razorPay.createPayment(newCard);
  };

  return (
    <div className="App">
      <h1>Pay with razorPay</h1>
      <h2>click on pay for EMI</h2>
      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
}
