import React from 'react';

export {
    CheckTrello
};

const CheckTrello = () => {
    // Process Trello
    const findToken = window.location.hash;
    const tokenHash = '#token=';

    if (findToken.substring(0, tokenHash.length) === tokenHash) {
        const getToken = findToken.substring(tokenHash.length);
    }
}
