import React, { useState } from "react";
import { GlobalStyles } from "@bigcommerce/big-design";
import PromptLogin from "../components/Trello/PromptLogin";
import PushSettings from "../components/Trello/PushSettings";
import CardTemplate from "../components/Trello/CardTemplate";
import {
    checkForToken,
    cookieExists,
    clearCookie,
    setCookie,
} from "../components/ManageCookies";
import HomeMain from "../components/HomeMain";

const Home = () => {
    // Declare States
    const [checked, setChecked] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [hasToken, setHasToken] = useState(false);

    const tokenPassed = () => {
        // Process Trello
        const findToken = window.location.hash;

        if (findToken.length === 0) return false;

        const tokenHash = "#token=";

        return findToken.toLowerCase().substring(0, tokenHash.length) ===
            tokenHash
            ? findToken.substring(tokenHash.length)
            : false;
    };

    // Declare Variables
    const trelloToken = tokenPassed();

    return trelloToken;

    // Check if token passed is valid
    const isTokenValid = (token, tokenSource) => {
        axios
            .get(`trello-api/valid-token/${token}`)
            .then((res) => {
                clearCookie("trToken");
                setCookie(token);
                setIsValid(true);
                setHasToken(true);
            })
            .catch((error) => {
                if (tokenSource === "token") {
                    const trelloCookie = cookieExists("trToken");
                    if (!trelloToken) {
                        setIsValid(false);
                        setHasToken(false);
                    } else {
                        processCookie(trelloCookie);
                    }
                }
            });
    };

    const processCookie = (cookie) => {
        isTokenValid(cookie, "cookie");
    };

    if (trelloToken) {
        isTokenValid(trelloToken, "token");
    }

    <GlobalStyles />;

    return (
        <div className="container p-2 mb-2">
            {!hasToken ? <PromptLogin /> : <HomeMain trello={trelloToken} />}
        </div>
    );
};

export default Home;
