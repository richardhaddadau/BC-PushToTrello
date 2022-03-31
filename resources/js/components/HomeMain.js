import React, { useState } from "react";
import PushSettings from "./Trello/PushSettings";
import CardTemplate from "./Trello/CardTemplate";

const HomeMain = ({ token }) => {
    // States
    const [isLoading, setLoading] = useState(true);

    return (
        <div>
            {token ? <PushSettings token={token} /> : null}
            <CardTemplate />
        </div>
    );
};

export default HomeMain;
