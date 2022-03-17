import React, { useState, useEffect } from "react";
import { Form, FormGroup, Checkbox, Button, GlobalStyles, Select, Datepicker } from "@bigcommerce/big-design";

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
                boardsObj = actualData.filter(entity => {
                    return !entity.closed;
                }).map(item => {
                    return {value: item['shortLink'], content: item['name']};
                });

                setBoardsList(boardsObj);
            });
    }, []);

    const authorizeTrello = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://trello.com/1/authorize?expiration=1day&name=token&scope=read&response_type=token&key=366d3a7f27ff81fde9157811979f86e7", requestOptions)
            .then(response => response)
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

    const processBoardChange = (key) => {
        if (key !== null) {
            fetch("https://api.trello.com/1/boards/" + key +"/lists?key=366d3a7f27ff81fde9157811979f86e7&token=2aa9ac92d328f0f441c7a8d6cd4eb3c3cbf3a6578822ac2672a22d00584c426f")
                .then((response) => response.json())
                .then((actualData) => {
                    listsObj = actualData.map(item => {
                        return {value: item['id'], content: item['name']};
                    });

                    setListsList(listsObj);
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

    const todayIs = getToday();
    const [dateOption, setDateOption] = useState('beginning');
    const [boardOption, setBoardOption] = useState('');
    const [listOption, setListOption] = useState('');
    const [currentList, setCurrentList] = useState('No list chosen');
    const [date, setDate] = useState(`${todayIs}`);
    const [checked, setChecked] = useState(false);

    // When Checkbox Changes
    const handleCheckbox = () => setChecked(!checked);

    useEffect(() => {
        console.log(authorizeTrello());
    }, []);

    <GlobalStyles />

    return (
       <div className="container">
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

                   <div className="card mt-2">
                       <div className="card-header">Current Chosen List: {listOption}</div>

                       <div className="card-body">
                           { listOption !== '' ?
                               <table>{currentList}</table>
                               : <p>No list chosen</p> }
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
       </div>
    );
}

export default Home;
