import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, firebaseAuth } from "../../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";
import Navbar from "../../components/Navbar/Navbar";
import getStripe from "../../utils/getStripe";

const Pricing = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleCheckout = async (plan) => {
    const stripe = await getStripe();
    if (plan === "yearly" && email) {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: "price_1OzNCdSB4ftS0cSqg4vpSAjr",
            quantity: 1,
          },
        ],
        mode: "subscription",
        successUrl: `https://flixxit-main.netlify.app`,
        cancelUrl: `https://flixxit-main.netlify.app`,
        customerEmail: email,
      });
      console.warn(error.message);
    } else if (plan === "monthly" && email) {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: "price_1OzNCOSB4ftS0cSqfogCDfH8",
            quantity: 1,
          },
        ],
        mode: "subscription",
        successUrl: `https://flixxit-main.netlify.app`,
        cancelUrl: `https://flixxit-main.netlify.app`,
        customerEmail: email,
      });
      console.warn(error.message);
    }
  };

  return (
    <div>
      <Navbar isScrolled={isScrolled} />
      <div className="pricing-container">
        <h1>Welcome, {email && String(email.slice(0, email.indexOf("@")))}</h1>
        <h2>Choose a subscription plan</h2>
        <div className="plans">
          <button onClick={() => handleCheckout("yearly")}>
            <span>Yearly plan</span>
            <span>&#8377; 2388/year</span>
          </button>
          <button onClick={() => handleCheckout("monthly")}>
            <span>Monthly plan</span>
            <span>&#8377; 199/month</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
