const checkForToken = (hashResponse) => {
    let foundToken = false;
    const hashTemplate = "#token=";

    if (hashResponse.length > 0) {
        foundToken =
            hashResponse.toLowerCase().substring(0, hashTemplate.length) ===
            hashTemplate
                ? hashResponse.substring(hashTemplate.length)
                : false;
    }

    return foundToken;
};

const checkForCookie = () => {
    let trelloToken;
    const cookieName = "trToken";

    // Split Cookie value by semi-colon
    const cookiesArray = document.cookie.split(";");

    for (let item in cookiesArray) {
        // Remove whitespace from the start of every cookie found
        cookiesArray[item] = decodeURIComponent(cookiesArray[item].trimStart());

        // Check if cookie we need exists
        if (cookiesArray[item].indexOf(cookieName) === 0) {
            trelloToken = cookiesArray[item].substring(
                cookieName.length + 1,
                cookiesArray[item].length
            );
            break;
        }
    }

    return trelloToken ? trelloToken : false;
};

const setCookie = (value) => {
    document.cookie = "trToken" + "=" + value;
};

// Delete Cookie
const clearCookie = () => {
    document.cookie = "trToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};

export { checkForToken, checkForCookie, setCookie, clearCookie };
