import { useState } from "react";
import { useForm } from "react-hook-form";
import { MAX_CVV_LENGTH, MAX_DATE_LENGTH, MAX_INPUT_CARD_LENGTH, MAX_INPUT_LENGTH } from "./config";

import visa from "../../assets/visa.png";
import masterCard from "../../assets/masterCard.jpg";
import amExpress from "../../assets/americanExpress.png";
import insertSpacesInCardNumber from "../../utils/insertSpacesInCardNumber";
import isInteger from "../../utils/isInteger";

import "./checkoutForm.scss";

export default function CheckoutForm() {
    const [triggeredErrors, setErrors] = useState({});

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const cardValue = watch("cardNumber");

    const onSubmit = (formData) => {
        console.log(formData);
    };

    const handleError = (error) => {
        setErrors(error);
    };

    const handleChange = (regName) => {
        setErrors((prev) => {
            const newErrorObj = { ...prev };
            delete newErrorObj[regName];
            return newErrorObj;
        });
    };

    const handleCardChange = (ev) => {
        handleChange("cardNumber");
        const { value } = ev.target;
        const trimedValue = value.split(" ").join("");

        const isInt = isInteger(trimedValue);

        if (!isInt && value !== "") {
            setValue("cardNumber", cardValue);
            return;
        }

        setValue("cardNumber", insertSpacesInCardNumber(value));
    };

    const errorClass = (regName) => (triggeredErrors[regName] ? "active" : "none");

    return (
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit, handleError)}>
            <h1 className="checkout-form__header">Billing Address</h1>
            <div className="checkout-form__fields">
                <input
                    className={`checkout-form__input-fullname_error_${errorClass("fullname")}`}
                    {...register("fullname", {
                        required: {
                            value: true,
                            message: "This field is required",
                        },
                        maxLength: {
                            value: 50,
                            message: "This field should contain at maximum 50 symbols",
                        },
                    })}
                    onChange={() => handleChange("fullname")}
                    placeholder="Full name"
                    maxLength={MAX_INPUT_LENGTH}
                />
                <input
                    className={`checkout-form__input-email_error_${errorClass("email")}`}
                    {...register("email", {
                        required: {
                            value: true,
                            message: "This field is required",
                        },
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Not valid email, please enter valid email address",
                        },
                        maxLength: {
                            value: 50,
                            message: "This field should contain at maximum 50 symbols",
                        },
                    })}
                    onChange={() => handleChange("email")}
                    placeholder="Email"
                    type="text"
                    maxLength={MAX_INPUT_LENGTH}
                />
                <input
                    className={`checkout-form__input-address_error_${errorClass("address")}`}
                    {...register("address", {
                        required: {
                            value: true,
                            message: "This field is required",
                        },
                        maxLength: {
                            value: 50,
                            message: "This field should contain at maximum 50 symbols",
                        },
                    })}
                    onChange={() => handleChange("address")}
                    placeholder="Address"
                />
                <input
                    className={`checkout-form__input-city_error_${errorClass("city")}`}
                    {...register("city", {
                        required: {
                            value: true,
                            message: "This field is required",
                        },
                        maxLength: {
                            value: 50,
                            message: "This field should contain at maximum 50 symbols",
                        },
                    })}
                    onChange={() => handleChange("city")}
                    placeholder="City"
                />
            </div>
            <h1 className="checkout-form__header">Payment Details</h1>
            <div className="checkout-form__details-holder">
                <div className="checkout-form__details-container">
                    <input
                        className={`checkout-form__card-number_error_${errorClass("cardNumber")}`}
                        {...register("cardNumber", {
                            required: {
                                value: true,
                                message: "This field is required",
                            },
                            maxLength: {
                                value: MAX_INPUT_CARD_LENGTH,
                                message: "Card number contains of 16 digits",
                            },
                            minLength: {
                                value: MAX_INPUT_CARD_LENGTH,
                                message: "Card number contains of 16 digits",
                            },
                        })}
                        placeholder="Card number"
                        maxLength={MAX_INPUT_CARD_LENGTH}
                        onChange={handleCardChange}
                    />
                    <div className="checkout-form__card-backside">
                        <input
                            className={`checkout-form__card-expiration_error_${errorClass(
                                "expiration"
                            )}`}
                            {...register("expiration", {
                                required: {
                                    value: true,
                                    message: "This field is required",
                                },
                                maxLength: {
                                    value: MAX_DATE_LENGTH,
                                    message: "Date contains of 4 digits",
                                },
                                minLength: {
                                    value: MAX_DATE_LENGTH,
                                    message: "Date contains of 4 digits",
                                },
                            })}
                            onChange={() => handleChange("expiration")}
                            type="text"
                            placeholder="Date"
                            maxLength={MAX_DATE_LENGTH}
                        />
                        <input
                            className={`checkout-form__card-cvv_error_${errorClass("cvv")}`}
                            {...register("cvv", {
                                required: {
                                    value: true,
                                    message: "This field is required",
                                },
                                maxLength: {
                                    value: MAX_CVV_LENGTH,
                                    message: "CVV contains of 3 digits",
                                },
                                minLength: {
                                    value: MAX_CVV_LENGTH,
                                    message: "CVV contains of 3 digits",
                                },
                            })}
                            onChange={() => handleChange("cvv")}
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
