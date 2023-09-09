import { useForm } from "react-hook-form";
import { MAX_CVV_LENGTH, MAX_DATE_LENGTH, MAX_INPUT_CARD_LENGTH } from "./config";

import visa from "../../assets/visa.png";
import masterCard from "../../assets/masterCard.jpg";
import amExpress from "../../assets/americanExpress.png";

import "./checkoutForm.scss";
import insertSpacesInCardNumber from "../../utils/insertSpacesInCardNumber";
import isInteger from "../../utils/isInteger";

export default function CheckoutForm() {
    const { register, handleSubmit, watch, setValue, errors } = useForm();

    const cardValue = watch("cardNumber");

    // console.log(cardValue);

    const onSubmit = (formData) => {
        console.log(formData);
    };

    const handleCardChange = (ev) => {
        const { value } = ev.target;
        const trimedValue = value.split(" ").join("");

        const isInt = isInteger(trimedValue);

        if (!isInt && value !== "") {
            setValue("cardNumber", cardValue);
            return;
        }

        setValue("cardNumber", insertSpacesInCardNumber(value));

        // console.log(isInt);
    };
    // Input - separate component
    // Create input groups

    return (
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="checkout-form__header">Billing Address</h1>
            <div className="checkout-form__fields">
                <input
                    className="checkout-form__input-fullname"
                    {...register("fullname")}
                    placeholder="Full name"
                />
                <input
                    className="checkout-form__input-email"
                    {...register("email")}
                    placeholder="Email"
                />
                <input
                    className="checkout-form__input-address"
                    {...register("address")}
                    placeholder="Address"
                />
                <input
                    className="checkout-form__input-city"
                    {...register("city")}
                    placeholder="City"
                />
            </div>
            <h1 className="checkout-form__header">Payment Details</h1>
            <div className="checkout-form__details-holder">
                <div className="checkout-form__details-container">
                    <input
                        className="checkout-form__card-number"
                        {...register("cardNumber")}
                        placeholder="Card number"
                        maxLength={MAX_INPUT_CARD_LENGTH}
                        onChange={handleCardChange}
                    />
                    <div className="checkout-form__card-backside">
                        <input
                            className="checkout-form__card-expiration"
                            {...register("expiration")}
                            type="text"
                            placeholder="Date"
                            maxLength={MAX_DATE_LENGTH}
                        />
                        <input
                            className="checkout-form__card-cvv"
                            {...register("cvv")}
                            type="text"
                            placeholder="CVV"
                            maxLength={MAX_CVV_LENGTH}
                        />
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
