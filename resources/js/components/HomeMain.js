import React from "react";
import PushSettings from "./Trello/PushSettings";
import CardTemplate from "./Trello/CardTemplate";

const HomeMain = (token) => {
    return (
        <div>
            <PushSettings token={token} />
            <CardTemplate />
        </div>
    );
};

export default HomeMain;
