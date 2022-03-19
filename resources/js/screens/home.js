import React, { useState, useEffect } from "react";
import { GlobalStyles } from "@bigcommerce/big-design";
import PromptLogin from "../components/Trello/PromptLogin";
import PushSettings from "../components/Trello/PushSettings";
import CardTemplate from "../components/Trello/CardTemplate";
import {checkForToken, cookieExists, isTokenValid, clearCookie, setCookie} from '../components/ManageCookies';

const Home = () => {
    // Declare States
    const [checked, setChecked] = useState(false);

    const trelloToken = checkForToken();
    const trelloCookie = cookieExists('trToken');
    let promptLogin = false;

    console.log(`${trelloToken}, ${trelloCookie}`);
    console.log(isTokenValid(trelloToken));

    if (trelloToken) {
        if (isTokenValid(trelloToken)) {

            clearCookie('trToken');
            setCookie(trelloToken);
            promptLogin = false;

        } else {

            if (isTokenValid(trelloCookie)) {

                setTrelloToken(trelloCookie);
                promptLogin = false;

            } else {

                promptLogin = true;

            }
        }
    }

    // When Checkbox Changes
    const handleCheckbox = () => setChecked(!checked);

    <GlobalStyles />

    return (
        <div className="container p-2 mb-2">
            {promptLogin ?
                <PromptLogin /> : <PushSettings token={trelloToken} />
            }

            {promptLogin ?
                null : <CardTemplate />
            }

        </div>
    );
}

export default Home;
