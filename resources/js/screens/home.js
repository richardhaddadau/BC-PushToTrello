import React, { useState, useEffect } from "react";
import { Form, FormGroup, Checkbox, Button, GlobalStyles, Select, Datepicker } from "@bigcommerce/big-design";
import axios from "axios";

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
    const [boardsList, setBoardsList] = useState(null);
    const [listsList, setListsList] = useState(null);

    // useEffect(() => {
    //     fetch("https://api.bigcommerce.com/stores/8nrrjpcfao/v3/catalog/products", {
    //         "method": "GET",
    //         "headers": {
    //             "Content-Type": "application/json",
    //             "X-Auth-Token": "d7vb4fg8lzs80o63jxikyh89w3hxrja"
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((actualData) => console.log(actualData))
    //         .catch(err => console.error(err));
    // },[]);

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

    const callTrello = () => {
        console.log("Running ..");
        axios({
            url: '/trello'
        });
    };

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

    const todayIs = getToday();
    const [dateOption, setDateOption] = useState('beginning');
    const [boardOption, setBoardOption] = useState('');
    const [listOption, setListOption] = useState('');
    const [currentList, setCurrentList] = useState('No list chosen');
    const [date, setDate] = useState(`${todayIs}`);
    const [checked, setChecked] = useState(false);
    const [cardPreview, setCardPreview] = useState('');
    const [cardTemplate, setCardTemplate] = useState(previewTemplate);

    // When Checkbox Changes
    const handleCheckbox = () => setChecked(!checked);

    <GlobalStyles />

    return (
        <div className="container p-2 mb-2">
            <div className="row">
                <div className="col-md-12 mb-3">
                    <Button isLoading={false} variant="primary" onClick={callTrello}>
                       Login to Trello
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Push to Trello</div>

                        <div className="card-body">
                            <Form>
                                <FormGroup>
                                   { boardsList !== null ?
                                    <Select
                                       filterable={true}
                                       label="Choose a Trello Board to Sync to:"
                                       maxHeight={300}
                                       onOptionChange={boardOption => {setBoardOption(boardOption); processBoardChange(boardOption)}}
                                       options={boardsList}
                                       placeholder={'Select a board'}
                                       placement={'bottom-start'}
                                       required
                                       value={boardOption}
                                    />
                                       : null }
                               </FormGroup>

                               <FormGroup>
                                   {boardOption !== '' ?
                                       listsList !== null ?
                                           <Select
                                               filterable={true}
                                               label="Choose a Trello List to Sync to:"
                                               maxHeight={300}
                                               onOptionChange={listOption => {setListOption(listOption); processListChange(listOption)}}
                                               options={listsList}
                                               placeholder={'Select a list'}
                                               placement={'bottom-start'}
                                               required
                                               value={listOption}
                                           />
                                       : null
                                   : null }
                               </FormGroup>

                               <FormGroup>
                                   <Checkbox
                                       label='Turn on automatic sync'
                                       checked={checked}
                                       onChange={ handleCheckbox } />
                               </FormGroup>
                           </Form>
                       </div>
                   </div>
               </div>

               <div className="col-md-6">
                   <div className="card">
                       <div className="card-header">Manual Push</div>

                       <div className="card-body">
                           <Form>
                               <FormGroup>
                                   <Select
                                       filterable={true}
                                       label="When do you want to sync from?"
                                       maxHeight={300}
                                       onOptionChange={dateOption => setDateOption(dateOption)}
                                       options={[
                                           { value: 'beginning', content: 'Beginning of time' },
                                           { value: 'from', content: 'Specific date' },
                                       ]}
                                       placeholder={'Select an option'}
                                       placement={'bottom-start'}
                                       required
                                       value={dateOption}
                                   />
                               </FormGroup>

                               { dateOption === 'from' ?
                                   <FormGroup>
                                       <Datepicker
                                           label="Pick a date"
                                           min="01/01/2021"
                                           max={getToday()}
                                           onDateChange={value => setDate(value)}
                                           value={date}
                                           locale="en-AU"
                                       />
                                   </FormGroup>
                                   : null }

                               <FormGroup>
                                   <Button>Sync Now</Button>
                               </FormGroup>
                           </Form>
                       </div>
                   </div>
               </div>
            </div>

            <div className="row">
                <div className="col-md-16">
                    <div className="card mt-3">
                        <div className="card-header">Card Template</div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <h6>Preview:</h6>
                                    <div className="card border border-secondary mt-2">
                                        <div className="card-header bg-primary bg-gradient text-light"><span className="fw-bold me-2">Title</span> Order: {'{Job_Number}'}</div>
                                        <div className="card-body">
                                            <p className="fw-bold">Description</p>
                                            <div>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mx-auto">
                                    <h6>Template:</h6>
                                    <div className="card border border-secondary mt-2 opacity-50">
                                        <div className="card-header bg-secondary bg-gradient text-light">
                                            <span className="fw-bold me-2">Title</span> Order: {'{Job_Number}'}
                                        </div>
                                        <div className="card-body">
                                            <p className="fw-bold">Description</p>
                                            <div>
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
                                            </div>
                                        </div>
                                    </div>
                                    <p className="fst-italic fs-6 mt-1">Template customisations coming soon.</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
