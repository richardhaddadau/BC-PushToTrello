import React from 'react';

export {
    cookieExists,
    checkForToken,
    clearCookie,
    setCookie
};

// If Cookie Exists, return Token. Otherwise, return false
const cookieExists = (cookieName) => {
    if (!cookieName) return false;

    // Get all cookie values
    const cookiesArray = document.cookie.split(';');

    let trelloToken;

    // Remove whitespace from the start of every cookie found
    for (let item in cookiesArray) {
        cookiesArray[item] = decodeURIComponent(cookiesArray[item].trimStart());

        if (cookiesArray[item].indexOf(cookieName) === 0) {
            trelloToken = cookiesArray[item].substring(cookieName.length + 1, cookiesArray[item].length);
            break;
        }
    }

    return trelloToken ? trelloToken : false;
}

// Check if a token is passed in the URL
const checkForToken = () => {
    // Process Trello
    const findToken = window.location.hash;

    if (findToken.length === 0) return false;

    const tokenHash = '#token=';

    const getToken = findToken.toLowerCase().substring(0, tokenHash.length) === tokenHash ?
        findToken.substring(tokenHash.length)
        : false;

    return getToken;
}

// Set a new cookie
const setCookie = (token) => {
    document.cookie = 'trToken' + '=' + token;
}

// Delete Cookie
const clearCookie = (token) => {
    document.cookie = token + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
}
