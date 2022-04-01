import React, { useEffect } from "react";

import { boys_names } from "../assets/boys_names";
import { girls_names } from "../assets/girls_names";
import { lastnames } from "../assets/lastnames";
import { domains } from "../assets/domains";

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

        newSet.push({
            first_name: newFirst,
            last_name: newLast,
            email: generateEmail(newFirst, newLast),
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

const ShopInfoGenerator = () => {
    useEffect(() => {
        generateCustomers(15);
    }, []);

    return <div></div>;
};

export default ShopInfoGenerator;
