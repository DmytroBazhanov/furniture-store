import Profile from "../../components/profile/Profile";
import PurchaseHistory from "../../components/purchaseHistory/PurchaseHistory";

import "./profilePage.scss";

export default function ProfilePage() {
    return (
        <div className="profilePage">
            <Profile />
            <PurchaseHistory />
        </div>
    );
}
