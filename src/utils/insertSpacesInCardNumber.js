import { MAX_CARD_LENGTH } from "../components/checkoutForm/config";

export default function insertSpacesInCardNumber(cardNumber) {
    let trimedValue = cardNumber.split(" ").join("");

    if (trimedValue > MAX_CARD_LENGTH) trimedValue = trimedValue.substring(0, 16);

    const cardCharArray = trimedValue.split("");
    const editedArray = cardCharArray.map((char, index) => {
        if (index % 4 === 0 && index !== 0 && index < MAX_CARD_LENGTH) {
            return ` ${char}`;
        } else {
            return char;
        }
    });

    return editedArray.join("");
}
