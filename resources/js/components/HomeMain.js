import React from "react";
import PushSettings from "./Trello/PushSettings";
import CardTemplate from "./Trello/CardTemplate";

const HomeMain = (token) => {
    return (
        <PushSettings token={token} />
        // <CardTemplate />
    );
};

export default HomeMain;
