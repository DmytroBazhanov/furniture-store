import category from "../assets/Categories.svg";
import bestSellers from "../assets/BestSellers.svg";
import faq from "../assets/FAQ.svg";
import profile from "../assets/profile.svg";

export const links = {
    headerLinks: [
        { text: "Categories", src: "/categories", svg: category },
        { text: "Best Sellers", src: "/categories/kitchen", svg: bestSellers },
        { text: "FAQs", src: "/FAQ", svg: faq },
    ],
    navigationLinks: [
        { text: "Categories", src: "/categories", svg: category },
        { text: "Best Sellers", src: "/categories/kitchen", svg: bestSellers },
        { text: "FAQs", src: "/FAQ", svg: faq },
        { text: "Profile", src: "/profile", svg: profile },
    ],
    profileDropdownLinks: [{ text: "Profile", src: "/profile", svg: profile }],
};
