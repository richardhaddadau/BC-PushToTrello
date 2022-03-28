import React, { useState, useEffect } from "react";
import { GlobalStyles } from "@bigcommerce/big-design";
import PromptLogin from "../components/Trello/PromptLogin";
import PushSettings from "../components/Trello/PushSettings";
import CardTemplate from "../components/Trello/CardTemplate";
import {checkForToken, cookieExists, clearCookie, setCookie} from '../components/ManageCookies';

const Home = () => {
    // Declare States
    const [checked, setChecked] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [hasToken, setHasToken] = useState(false);

    // Declare Variables
    const trelloToken = checkForToken();

    // Check if token passed is valid
    const isTokenValid = (token, tokenSource) => {
        axios.get(`trello-api/valid-token/${token}`)
            .then(res => {
                clearCookie('trToken');
                setCookie(token);
                setIsValid(true);
                setHasToken(true);
            })
            .catch(error => {
                if (tokenSource === 'token') {
                    const trelloCookie = cookieExists('trToken');
                    if (!trelloToken) {
                        setIsValid(false)
                        setHasToken(false);
                    } else {
                        processCookie(trelloCookie);
                    }
                }
            });
    };

    const processCookie = (cookie) => {
        isTokenValid(cookie, 'cookie');
    };

    if (trelloToken) {
        isTokenValid(trelloToken, 'token');
    }

    <GlobalStyles />

    return (
        <div className="container p-2 mb-2">

            {!hasToken ?
                <PromptLogin /> : <PushSettings token={trelloToken} />
            }

            {!hasToken ?
                null : <CardTemplate />
            }

        </div>
    );
}

export default Home;
