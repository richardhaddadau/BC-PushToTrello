import React, { useEffect, useState } from "react";
import axios from "axios";

import { boys_names } from "../assets/boys_names";
import { girls_names } from "../assets/girls_names";
import { lastnames } from "../assets/lastnames";
import { domains } from "../assets/domains";
import { states } from "../assets/states";
import { cities } from "../assets/cities";
import { addresses } from "../assets/addresses";

const shuffleArray = (array) => {
    let copyArr = [...array];
    let pointerB;

    for (let iteration = 0; iteration < 5; iteration++) {
        for (let pointerA = 0; pointerA < copyArr.length; pointerA++) {
            // Math.random() gives a random decimal between 0 and 1, exclusively
            // we multiply by (M + 1) and add N where N is the lower limit, M is the higher limit
            while (true) {
                pointerB = Math.floor(Math.random() * copyArr.length);

                if (pointerB !== pointerA) break;
            }

            swapElements(copyArr, pointerA, pointerB);
        }
    }

    return copyArr;
};

const swapElements = (dataStructure, elementA, elementB) => {
    let temp = dataStructure[elementA];
    dataStructure[elementA] = dataStructure[elementB];
    dataStructure[elementB] = temp;
};

const generateCustomers = (iterations) => {
    let newSet = [];

    for (let counter = 0; counter < iterations; counter++) {
        let newFirst = generateFirstName();
        let newLast = generateLastName();
        let newAddress1 = generateStreetAddress();
        let newCity = generateCity();
        let newCountryCode = generateCountryCode();

        newSet.push({
            first_name: newFirst,
            last_name: newLast,
            email: generateEmail(newFirst, newLast),
            addresses: [
                {
                    address1: newAddress1,
                    city: newCity,
                    country_code: newCountryCode,
                    first_name: newFirst,
                    last_name: newLast,
                },
            ],
        });
    }

    console.log(newSet);
};

const generateOrders = (iterations) => {
    let newSet = [];

    for (let counter = 0; counter < iterations; counter++) {
        let newFirst = generateFirstName();
        let newLast = generateLastName();
        let newStreet = generateStreetAddress();
        let newCity = generateCity();
        let newState = generateState();
        let newZip = generateZip();
        let newCountry = generateCountry();
        let newCountryCode = generateCountryCode();
        let newEmail = generateEmail();

        console.log(getProducts());

        newSet.push({
            billing_address: {
                first_name: newFirst,
                last_name: newLast,
                street_1: newStreet,
                city: newCity,
                state: newState,
                zip: newZip,
                country: newCountry,
                country_iso2: newCountryCode,
                email: newEmail,
            },
            products: [
                {
                    name: "",
                    quantity: Math.floor(Math.random() * 10 + 1),
                    prince_inc_tax: 0,
                    prince_ex_tax: 0,
                },
            ],
        });
    }

    console.log(newSet);
};

const generateFirstName = () => {
    let useArray = shuffleArray([...boys_names, ...girls_names]);
    return useArray[Math.floor(Math.random() * useArray.length)];
};

const generateLastName = () => {
    return lastnames[Math.floor(Math.random() * lastnames.length)];
};

const generateEmail = (first, last) => {
    let emailTemplateObj = [
        `${first[0]}.${last}`,
        `${first}.${last[0]}`,
        `${first}${last}`,
        `${first}${Math.floor(Math.random() * (99 + 1) + 10)}`,
        `${first}${Math.floor(Math.random() * (999 + 1) + 100)}`,
        `${last}${Math.floor(Math.random() * (9 + 1) + 1)}`,
        `${last.slice(0, Math.floor(last.length / 2))}${first}`,
    ];

    return `${emailTemplateObj[
        Math.floor(Math.random() * emailTemplateObj.length)
    ].toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
};

const generateStreetAddress = () => {
    let street = addresses[Math.floor(Math.random() * addresses.length)];

    return `${Math.floor(Math.random() * (1999 + 1) + 1)} ${street},`;
};

const generateCity = () => {
    return cities[Math.floor(Math.random() * cities.length)];
};

const generateState = () => {
    return states[Math.floor(Math.random() * states.length)];
};

const generateZip = () => {
    return `${Math.floor(Math.random() * (9999 + 1) + 1000)}`;
};

const generateCountry = () => {
    return "Australia";
};

const generateCountryCode = () => {
    return "AU";
};

const ShopInfoGenerator = () => {
    const [products, setProducts] = useState({});

    const getProducts = () => {
        let config = {
            method: "get",
            url: "/bc-api/v3/catalog/products",
        };

        axios(config)
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        // generateCustomers(10);
        // generateOrders(5);
        getProducts();
    }, []);

    return <div></div>;
};

export default ShopInfoGenerator;
