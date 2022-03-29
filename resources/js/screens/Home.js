import React, { useEffect, useState } from "react";
import { checkForToken, checkForCookie } from "../components/TokenMethods";

const Home = () => {
    // States
    const [validToken, setValidToken] = useState(false);

    // Token Functions
    const validatetoken = (token) => {
        let result = axios
            .get("/trello-api/valid-token/" + foundToken)
            .then((response) => response.data)
            .catch((err) => err);

        if (result === 200) {
            setValidToken(foundToken);
        } else {
            checkForCookie();
        }
    };

    useEffect(() => {
        const getHash = window.location.hash;
        let foundToken = checkForToken(getHash);

        if (foundToken) {
            validatetoken(foundToken);
        }
    }, []);

    return (
        <div>
            <p>Token: {validToken}</p>
        </div>
    );
};

export default Home;
