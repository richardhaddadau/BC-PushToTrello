const checkForToken = (hashResponse) => {
    let foundToken;
    const hashTemplate = "#token=";

    if (hashResponse.length > 0) {
        foundToken =
            hashResponse.toLowerCase().substring(0, hashTemplate.length) ===
            hashTemplate
                ? hashResponse.substring(hashTemplate.length)
                : false;
    }
};

const checkForCookie = () => {};

export { checkForToken, checkForCookie };
