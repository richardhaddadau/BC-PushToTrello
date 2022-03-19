import React from "react";
import {Button} from "@bigcommerce/big-design";

const PromptLogin = () => {
    return (
        <div className="row">
            <div className="col-md-12 mb-3">
                <a href='/trello'><Button isLoading={false} variant="primary">Login to Trello</Button></a>
            </div>
        </div>
    );
};

export default PromptLogin;
