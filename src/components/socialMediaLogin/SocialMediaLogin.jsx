import googleImg from "../../assets/Google.png";
import facebookImg from "../../assets/Facebook.png";
import appleImg from "../../assets/Apple.png";

import { signInWithGoogle, signInWithFacebook } from "../../queries/auth";
import { useNavigate } from "react-router-dom";

import "./socialMediaLogin.scss";

export default function SocialMediaLogin() {
    const navigate = useNavigate();

    const redirectToApple = () => navigate("dont/Want/To/Pay/100/Bucks/For/Apple/Login");

    return (
        <div className="socialMediaLogin">
            <img src={googleImg} alt="google logo" onClick={signInWithGoogle} />
            <img src={facebookImg} alt="facebook logo" onClick={signInWithFacebook} />
            <img src={appleImg} alt="apple logo" onClick={redirectToApple} />
        </div>
    );
}
