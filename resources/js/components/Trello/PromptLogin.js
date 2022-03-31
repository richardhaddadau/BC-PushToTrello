import React from "react";
import { Button } from "@bigcommerce/big-design";

const PromptLogin = ({ loading }) => {
    // States

    return (
        <div className="row">
            <div className="col-md-12 mb-3">
                <a href="/trello">
                    <Button isLoading={loading} variant="primary">
                        Login to Trello
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default PromptLogin;
