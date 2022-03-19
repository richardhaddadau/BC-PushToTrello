import React, { useState, useEffect } from "react";
import { Form, FormGroup, Checkbox, Button, GlobalStyles, Select, Datepicker } from "@bigcommerce/big-design";
import PromptLogin from "../components/Trello/PromptLogin";
import PushSettings from "../components/Trello/PushSettings";
import CardTemplate from "../components/Trello/CardTemplate";

const templateShortcodes = {
    'jobNumber': '204',
    'customerFirstName': 'Jane',
    'customerLastName': 'Doe',
    'shippingStreet1': '64 Adelaide St',
    'shippingStreet2': '-',
    'shippingSuburb': 'Brisbane City',
    'shippingState': 'QLD',
    'shippingPostcode': '4000',
    'shippingCountry': 'Australia',
    'shippingEmail': 'jane.doe@example.com',
    'shippingPhone': '+61 0412 345 678',
};

const getToday = () => {
    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${month <10 ? `0${month}` : `${month}`}/${day}/${year}`;
}

const Home = () => {
    // Declare States
    const todayIs = getToday();
    const [dateOption, setDateOption] = useState('beginning');
    const [boardOption, setBoardOption] = useState('');
    const [listOption, setListOption] = useState('');
    const [currentList, setCurrentList] = useState('No list chosen');
    const [date, setDate] = useState(`${todayIs}`);
    const [checked, setChecked] = useState(false);
    const [cardPreview, setCardPreview] = useState('');
    const [cardTemplate, setCardTemplate] = useState(previewTemplate);
    const [boardsList, setBoardsList] = useState(null);
    const [listsList, setListsList] = useState(null);

    let boardsObj;
    let listsObj;

    useEffect(() => {
        fetch("https://api.trello.com/1/members/me/boards?key=366d3a7f27ff81fde9157811979f86e7&token=2aa9ac92d328f0f441c7a8d6cd4eb3c3cbf3a6578822ac2672a22d00584c426f")
            .then((response) => response.json())
            .then((actualData) => {
                setBoardsList(actualData.filter(entity => {
                    return !entity.closed;
                }).map(item => {
                    return {value: item['shortLink'], content: item['name']};
                }));

                // setBoardsList(boardsObj);
            });
    }, []);

    const processBoardChange = (key) => {
        if (key !== null) {
            fetch("https://api.trello.com/1/boards/" + key +"/lists?key=366d3a7f27ff81fde9157811979f86e7&token=2aa9ac92d328f0f441c7a8d6cd4eb3c3cbf3a6578822ac2672a22d00584c426f")
                .then((response) => response.json())
                .then((actualData) => {
                    setListsList(actualData.map(item => {
                        return {value: item['id'], content: item['name']};
                    }));

                    // setListsList(listsObj);
            });
        }
    }

    const processListChange = (key) => {
        if (key !== null) {
            fetch("https://api.trello.com/1/lists/" + key + "/cards?key=366d3a7f27ff81fde9157811979f86e7&token=2aa9ac92d328f0f441c7a8d6cd4eb3c3cbf3a6578822ac2672a22d00584c426f")
                .then(respose => respose.json())
                .then(actualData => {
                    setCurrentList(actualData.map(item => {
                        return <tr key={item['id']}><td key={item['id']} style={{ fontStyle: 'italic', fontSize: '80%' }}>{item['name']}</td></tr>;
                    }));
            });
        }
    }

    const previewTemplate = `
        {'{Customer_Name}'}<br/>
        {'{{Every}}'}}<br/>
        <div className="ps-4">
            {'{Product_Name}'}<br/>
            SKU: {'{Product_SKU}'}<br/>
            QTY: {'{Product_Quantity}'}<br/>
        </div>
        {'{{/Every}}'}<br/><br/>
        Address: {'{Shipping_Address}'}<br/><br/>
        Shipping Type: {'{Shipping_Method}'}<br/><br/>
        Phone: {'{Customer_Phone}'}<br/>
        Email: {'{Customer_Email}'}<br/><br/>
        ---<br/><br/>
        Details:<br/>
        {'{Customer_Comments}'}
        `;

    // When Checkbox Changes
    const handleCheckbox = () => setChecked(!checked);

    <GlobalStyles />

    return (
        //
        <div className="container p-2 mb-2">

            <PromptLogin />
            <PushSettings />
            <CardTemplate />
        </div>
    );
}

export default Home;
