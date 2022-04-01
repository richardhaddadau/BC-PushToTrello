import React, { useEffect, useState } from "react";

import {
    checkForToken,
    checkForCookie,
    setCookie,
    clearCookie,
} from "../components/TokenMethods";
import PromptLogin from "../components/Trello/PromptLogin";
import HomeMain from "../components/HomeMain";

import ShopInfoGenerator from "../components/shopInfoGenerator";

const Home = () => {
    // States
    const [validToken, setValidToken] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(true);

    // Token Functions
    const validateToken = (token, cookie) => {
        axios
            .all([
                axios.get("/trello-api/valid-token/" + token),
                axios.get("/trello-api/valid-token/" + cookie),
            ])
            .then(
                axios.spread((...responses) => {
                    const tokenStatus = responses[0].data;
                    const cookieStatus = responses[1].data;

                    if (tokenStatus === 200) {
                        clearCookie();
                        setCookie(token);

                        setValidated(true);
                        setValidToken(token);
                    } else if (cookieStatus === 200) {
                        setValidated(true);
                        setValidToken(cookie);
                    } else {
                        clearCookie();
                        setValidated(false);
                    }

                    setLoading(false);
                })
            )
            .catch((err) => {
                console.log("Oops");
                // handle errors
            });
    };

    // Run on load
    useEffect(() => {
        // Check hash for token
        // Example: /?#token=a5701ed85cca8050e47ad879831c740d3457f44351f09ad75fbf5cb306b35874
        const getHash = window.location.hash;
        let foundToken = checkForToken(getHash);
        let foundCookie = checkForCookie();

        validateToken(foundToken, foundCookie);
    }, []);

    return (
        <div className="container">
            <div className="row">
                {validated ? (
                    <HomeMain token={validToken} />
                ) : (
                    <PromptLogin loading={isLoading} />
                )}
                <ShopInfoGenerator />
            </div>
        </div>
    );
};

export default Home;
