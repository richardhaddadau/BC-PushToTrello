import React, { useState } from "react";
import PushSettings from "./Trello/PushSettings";
import CardTemplate from "./Trello/CardTemplate";

const HomeMain = ({ token }) => {
    return (
        <div>
            {token ? <PushSettings token={token} /> : null}
            <CardTemplate />
        </div>
    );
};

export default HomeMain;
