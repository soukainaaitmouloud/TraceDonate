import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

function PaymentModal({
  onClose,
  requestId,
  requestTitle,
  requestImage,
  onSuccess,
  darkMode,
}) {

  const stripe =
    useStripe();

  const elements =
    useElements();

  const mountedRef =
    useRef(false);

  const paymentProcessingRef =
    useRef(false);

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ================================================= */
  /* ================= FIX REACT DUPLICATION ========= */
  /* ================================================= */

  useEffect(() => {

    mountedRef.current =
      true;

    return () => {

      mountedRef.current =
        false;

    };

  }, []);

  /* ================================================= */
  /* ================= PAYMENT ======================= */
  /* ================================================= */

  const handlePayment =
    async () => {

      /* ================= BLOCK DOUBLE CLICK ================= */

      if (
        paymentProcessingRef.current
      ) {

        return;

      }

      paymentProcessingRef.current =
        true;

      setError("");

      if (
        !stripe ||
        !elements
      ) {

        setError(
          "Stripe is still loading."
        );

        paymentProcessingRef.current =
          false;

        return;

      }

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {

        setError(
          "Please login first."
        );

        paymentProcessingRef.current =
          false;

        return;

      }

      const amountNumber =
        Number(amount);

      if (
        !amountNumber ||
        amountNumber <= 0
      ) {

        setError(
          "Please enter a valid amount."
        );

        paymentProcessingRef.current =
          false;

        return;

      }

      try {

        setLoading(true);

        /* ================================================= */
        /* ================= CARD ========================== */
        /* ================================================= */

        const cardElement =
          elements.getElement(
            CardElement
          );

        if (!cardElement) {

          throw new Error(
            "Card form not ready."
          );

        }

        /* ================================================= */
        /* ================= CREATE PAYMENT INTENT ========= */
        /* ================================================= */

        const response =
          await fetch(
            "http://localhost:5000/api/payments/create-payment-intent",
            {
              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,

              },

              body:
                JSON.stringify({

                  amount:
                    amountNumber,

                }),

            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(

            data.message ||

            "Payment initialization failed."

          );

        }

        if (
          !data.clientSecret
        ) {

          throw new Error(
            "Missing Stripe client secret."
          );

        }

        /* ================================================= */
        /* ================= CONFIRM PAYMENT =============== */
        /* ================================================= */

        const paymentResult =
          await stripe.confirmCardPayment(
            data.clientSecret,
            {

              payment_method: {

                card:
                  cardElement,

              },

            }
          );

        if (
          paymentResult.error
        ) {

          throw new Error(
            paymentResult.error
              .message
          );

        }

        if (

          paymentResult
            .paymentIntent
            .status !==
          "succeeded"

        ) {

          throw new Error(
            "Payment failed."
          );

        }

        /* ================================================= */
        /* ================= SAVE API ====================== */
        /* ================================================= */

        const saveResponse =
          await fetch(
            "http://localhost:5000/api/donations",
            {
              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,

              },

              body:
                JSON.stringify({

                  requestId,

                  amount:
                    amountNumber,

                  paymentIntentId:

                    paymentResult
                      .paymentIntent
                      .id,

                  message:
                    "Donation 💚",

                }),

            }
          );

        const saveData =
          await saveResponse.json();

        if (
          !saveResponse.ok
        ) {

          throw new Error(

            saveData.message ||

            "Failed to save donation."

          );

        }

        /* ================================================= */
        /* ================= LOCAL STORAGE ================= */
        /* ================================================= */

        const existingDonations =
          JSON.parse(
            localStorage.getItem(
              "donations"
            ) || "[]"
          );

        /* ================= UNIQUE DONATION ============== */

        const donationItem = {

          id:
            `${requestId}-${Date.now()}-${Math.random()}`,

          requestId,

          title:
            requestTitle ||
            "Donation Campaign",

          image:
            requestImage ||
            "/images/water.jpg",

          amount:
            Number(amountNumber),

          created_at:
            new Date().toISOString(),

          status:
            "Completed",

          paymentIntentId:

            paymentResult
              .paymentIntent
              .id,

        };

        /* ================= PREVENT DUPLICATES =========== */

        const alreadyExists =
          existingDonations.some(
            (d) =>

              d.paymentIntentId ===

              donationItem.paymentIntentId
          );

        if (
          !alreadyExists
        ) {

          localStorage.setItem(

            "donations",

            JSON.stringify([

              donationItem,

              ...existingDonations,

            ])
          );

        }

        /* ================================================= */
        /* ================= SUCCESS ======================= */
        /* ================================================= */
if (onSuccess) {

  onSuccess({

    id:
      donationItem.id,

    requestId,

    title:
      donationItem.title,

    image:
      donationItem.image,

    amount:
      donationItem.amount,

    created_at:
      donationItem.created_at,

    status:
      "Completed",

    paymentIntentId:
      donationItem.paymentIntentId,

  });

}
      
        alert(
          "Payment Successful 🎉"
        );

        onClose();

      }

      catch (err) {

        console.error(err);

        setError(

          err.message ||

          "Payment failed."

        );

      }

      finally {

        paymentProcessingRef.current =
          false;

        if (
          mountedRef.current
        ) {

          setLoading(false);

        }

      }

    };

  return (

    <div style={overlay}>

      <div
        style={modal(
          darkMode
        )}
      >

        {/* CLOSE */}

        <button
          onClick={onClose}
          style={closeBtn}
        >

          ✕

        </button>

        {/* HEADER */}

        <h2
          style={title(
            darkMode
          )}
        >

          Donate Securely 💚

        </h2>

        <p
          style={subtitle(
            darkMode
          )}
        >

          Your support changes lives.

        </p>

        {/* AMOUNT */}

        <div style={field}>

          <label
            style={label(
              darkMode
            )}
          >

            Donation Amount

          </label>

          <input
            type="number"
            min="1"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            style={input(
              darkMode
            )}
          />

        </div>

        {/* CARD */}

        <div style={field}>

          <label
            style={label(
              darkMode
            )}
          >

            Card Information

          </label>

          <div
            style={cardBox(
              darkMode
            )}
          >

            <CardElement
              options={{

                hidePostalCode:
                  true,

                style: {

                  base: {

                    color:
                      darkMode
                        ? "#ffffff"
                        : "#111827",

                    fontSize:
                      "16px",

                    "::placeholder": {

                      color:
                        "#94a3b8",

                    },

                  },

                },

              }}
            />

          </div>

        </div>

        {/* ERROR */}

        {error && (

          <div style={errorBox}>

            {error}

          </div>

        )}

        {/* PAY */}

        <button
          onClick={
            handlePayment
          }
          disabled={loading}
          style={
            loading
              ? disabledButton
              : payButton
          }
        >

          {loading

            ? "Processing..."

            : `Pay $${amount || 0}`}

        </button>

        {/* CANCEL */}

        <button
          onClick={onClose}
          disabled={loading}
          style={cancelButton(
            darkMode
          )}
        >

          Cancel

        </button>

      </div>

    </div>

  );

}

export default PaymentModal;

/* ================================================= */
/* ================= STYLES ======================== */
/* ================================================= */

const overlay = {

  position: "fixed",

  inset: 0,

  background:
    "rgba(0,0,0,0.72)",

  backdropFilter:
    "blur(10px)",

  WebkitBackdropFilter:
    "blur(10px)",

  display: "flex",

  justifyContent:
    "center",

  alignItems: "center",

  zIndex: 9999,

  padding: "20px",

};

const modal = (
  darkMode
) => ({

  width: "100%",

  maxWidth: "460px",

  background: darkMode

    ? `
      linear-gradient(
        145deg,
        rgba(15,23,42,0.96),
        rgba(30,41,59,0.94)
      )
    `

    : `
      linear-gradient(
        145deg,
        rgba(255,255,255,0.98),
        rgba(248,250,252,0.94)
      )
    `,

  borderRadius: "32px",

  padding: "32px",

  position: "relative",

  border:
    darkMode

      ? "1px solid rgba(255,255,255,0.06)"

      : "1px solid rgba(255,255,255,0.9)",

  boxShadow:
    "0 30px 80px rgba(0,0,0,0.35)",

});

const closeBtn = {

  position: "absolute",

  top: "18px",

  right: "18px",

  width: "44px",

  height: "44px",

  border: "none",

  borderRadius: "16px",

  background:
    "rgba(255,255,255,0.08)",

  color: "#ffffff",

  fontSize: "18px",

  fontWeight: "800",

  cursor: "pointer",

};

const title = (
  darkMode
) => ({

  margin: 0,

  marginBottom: "12px",

  color: darkMode
    ? "#fff"
    : "#111827",

  fontSize: "32px",

  fontWeight: "900",

});

const subtitle = (
  darkMode
) => ({

  marginBottom: "28px",

  color: darkMode
    ? "#cbd5e1"
    : "#64748b",

  fontSize: "15px",

});

const field = {

  marginBottom: "20px",

};

const label = (
  darkMode
) => ({

  display: "block",

  marginBottom: "10px",

  fontWeight: "700",

  fontSize: "14px",

  color: darkMode
    ? "#e2e8f0"
    : "#374151",

});

const input = (
  darkMode
) => ({

  width: "100%",

  padding: "16px",

  borderRadius: "18px",

  border: darkMode
    ? "1px solid #334155"
    : "1px solid #d1d5db",

  background: darkMode
    ? "#020617"
    : "#ffffff",

  color: darkMode
    ? "#fff"
    : "#111827",

  fontSize: "15px",

  outline: "none",

  boxSizing:
    "border-box",

});

const cardBox = (
  darkMode
) => ({

  padding: "18px",

  borderRadius: "18px",

  border: darkMode
    ? "1px solid #334155"
    : "1px solid #d1d5db",

  background: darkMode
    ? "#020617"
    : "#ffffff",

});

const errorBox = {

  background:
    "#fee2e2",

  color:
    "#dc2626",

  padding: "14px",

  borderRadius: "14px",

  marginBottom: "18px",

  fontSize: "14px",

  fontWeight: "700",

};

const payButton = {

  width: "100%",

  padding: "16px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(90deg,#22c55e,#16a34a)",

  color: "#fff",

  fontWeight: "800",

  fontSize: "16px",

  cursor: "pointer",

  marginBottom: "14px",

};

const disabledButton = {

  ...payButton,

  opacity: 0.7,

  cursor: "not-allowed",

};

const cancelButton = (
  darkMode
) => ({

  width: "100%",

  padding: "16px",

  borderRadius: "18px",

  border: darkMode
    ? "1px solid #334155"
    : "1px solid #d1d5db",

  background:
    "transparent",

  color: darkMode
    ? "#fff"
    : "#111827",

  fontWeight: "700",

  cursor: "pointer",

});