import React, { useState } from "react";
import { GlobalStyles } from "@bigcommerce/big-design";
import PromptLogin from "../components/Trello/PromptLogin";
import PushSettings from "../components/Trello/PushSettings";
import CardTemplate from "../components/Trello/CardTemplate";

import HomeMain from "../components/HomeMain";

const Home = () => {
    const [hasToken, setHasToken] = useState(false);

    const checkForToken = () => {
        const getHash = window.location.hash;
        return getHash;
    };

    console.log(checkForToken());
    return <div></div>;

    // Declare States
    const [checked, setChecked] = useState(false);
    const [isValid, setIsValid] = useState(false);

    console.log("Run");
    console.log(`Token: ${tokenPassed()}`);
    console.log("Finished");

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
