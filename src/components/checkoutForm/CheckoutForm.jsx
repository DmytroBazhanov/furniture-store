import { useForm } from "react-hook-form";

import visa from "../../assets/visa.png";
import masterCard from "../../assets/masterCard.jpg";
import amExpress from "../../assets/americanExpress.png";

import "./checkoutForm.scss";

export default function CheckoutForm() {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (ev) => {
        console.log(ev);
    };

    // Input - separate component
    // Create input groups

    return (
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="checkout-form__header">Billing Address</h1>
            <div className="checkout-form__fields">
                <input className="checkout-form__input-fullname" placeholder="Full name" />
                <input className="checkout-form__input-email" placeholder="Email" />
                <input className="checkout-form__input-address" placeholder="Address" />
                <input className="checkout-form__input-city" placeholder="City" />
            </div>
            <h1 className="checkout-form__header">Payment Details</h1>
            <div className="checkout-form__details-holder">
                <div className="checkout-form__details-container">
                    <input className="checkout-form__card-number" placeholder="Card number" />
                    <div className="checkout-form__card-backside">
                        <input className="checkout-form__card-expiration" placeholder="Date" />
                        <input className="checkout-form__card-cvv" placeholder="CVV" />
                    </div>
                </div>
                <div className="checkout-form__accepted-cards">
                    <p className="checkout-form__accepted-header">Accepted cards:</p>
                    <div className="checkout-form__preview">
                        <img className="checkout-form__preview-image" src={visa} alt="card" />
                        <img className="checkout-form__preview-image" src={masterCard} alt="card" />
                        <img className="checkout-form__preview-image" src={amExpress} alt="card" />
                    </div>
                </div>
            </div>
            <input className="checkout-form__submit" type="submit" value="Checkout" />
        </form>
    );
}
