import React, { useEffect, useState } from "react";

import {
    checkForToken,
    checkForCookie,
    setCookie,
    clearCookie,
} from "../components/TokenMethods";
import PromptLogin from "../components/Trello/PromptLogin";
import HomeMain from "../components/HomeMain";

const Home = () => {
    // States
    const [validToken, setValidToken] = useState(false);

    // Token Functions
    const validateToken = async (token) => {
        let result = await axios.get("/trello-api/valid-token/" + token);

        console.log(result);

        if ((await result.data) === 200) {
            clearCookie();
            setCookie(token);
            return token;
        } else {
            return false;
        }
    };

    // Run on load
    useEffect(() => {
        // Check hash for token
        // Example: /?#token=a5701ed85cca8050e47ad879831c740d3457f44351f09ad75fbf5cb306b35874
        const getHash = window.location.hash;
        let foundToken = checkForToken(getHash);

        if (foundToken && validateToken(foundToken)) {
            setValidToken(foundToken);
        } else {
            let foundCookie = checkForCookie();
            if (foundCookie && validateToken(foundCookie)) {
                setValidToken(foundCookie);
            }
        }
    }, []);

    return (
        <div>
            {validToken ? <HomeMain token={validToken} /> : <PromptLogin />}
        </div>
    );
};

export default Home;
