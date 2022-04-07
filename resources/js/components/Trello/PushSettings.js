import React, { useEffect, useState } from "react";
import {
    Form,
    FormGroup,
    Select,
    Datepicker,
    Checkbox,
    Button,
} from "@bigcommerce/big-design";
import axios from "axios";

// Get Today's Date
const getToday = () => {
    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${month < 10 ? `0${month}` : `${month}`}/${day}/${year}`;
};

const PushSettings = ({ token }) => {
    // Variables
    const todayIs = getToday();

    // States
    const [boardOption, setBoardOption] = useState(0);
    const [listOption, setListOption] = useState(0);
    const [boardsList, setBoardsList] = useState([]);
    const [listsList, setListsList] = useState([]);
    const [currentList, setCurrentList] = useState("No list chosen");
    const [dateOption, setDateOption] = useState("beginning");
    const [date, setDate] = useState(`${todayIs}`);
    const [checked, setChecked] = useState(false);

    // When Checkbox Changes
    const handleCheckbox = () => setChecked(!checked);

    // Getting list of Boards
    const getBoards = () => {
        axios
            .get(
                `trello-api/callTrello/token/${token}/endpoint/members/me/boards`
            )
            .then((res) => {
                const boards = res.data;

                setBoardsList(
                    boards.map((item) => {
                        return { value: item["id"], content: item["name"] };
                    })
                );
            });
    };

    // Process Board Change
    const processBoardChange = (key) => {
        if (key !== null) {
            axios
                .get(
                    `trello-api/callTrello/token/${token}/endpoint/boards/${key}/lists`
                )
                .then((response) => {
                    const lists = response.data;

                    setListsList(
                        lists.map((item) => {
                            return { value: item["id"], content: item["name"] };
                        })
                    );
                });
        }
    };

    // Process List Change
    const processListChange = (key) => {
        if (key !== null) {
            axios
                .get(
                    `trello-api/callTrello/token/${token}/endpoint/lists/${key}/cards`
                )
                .then((response) => {
                    const cards = response.data;

                    console.log(cards);
                    setCurrentList(
                        cards.map((item) => {
                            return (
                                <tr key={item["id"]}>
                                    <td
                                        key={item["id"]}
                                        style={{
                                            fontStyle: "italic",
                                            fontSize: "80%",
                                        }}
                                    >
                                        {item["name"]}
                                    </td>
                                </tr>
                            );
                        })
                    );
                });
        }
    };

    // Get Order Numbers
    const getOrderNumbers = () => {
        let config = {
            method: "get",
            url: "/bc-api/v3/order",
        };

        axios(config)
            .then((response) => {
                const orders = response.data;

                console.log(response.data);
                // setListsList(
                //     lists.map((item) => {
                //         return { value: item["id"], content: item["name"] };
                //     })
                // );
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        getBoards();
    }, []);

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">Push to Trello</div>
                    <div className="card-body">
                        <Form>
                            <FormGroup>
                                {boardsList !== null ? (
                                    <Select
                                        filterable={true}
                                        label="Choose a Trello Board to Sync to:"
                                        maxHeight={300}
                                        options={boardsList}
                                        onOptionChange={(boardOption) => {
                                            setBoardOption(boardOption);
                                            processBoardChange(boardOption);
                                        }}
                                        placeholder={"Select a board"}
                                        placement={"bottom-start"}
                                        value={boardOption}
                                        required
                                    />
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                {boardsList !== "" ? (
                                    listsList !== null ? (
                                        <Select
                                            filterable={true}
                                            label="Choose a Trello List to Sync to:"
                                            maxHeight={300}
                                            onOptionChange={(listOption) => {
                                                setListOption(listOption);
                                                processListChange(listOption);
                                            }}
                                            options={listsList}
                                            placeholder={"Select a list"}
                                            placement={"bottom-start"}
                                            required
                                            value={listOption}
                                        />
                                    ) : null
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                <Checkbox
                                    label="Turn on automatic sync"
                                    checked={checked}
                                    onChange={handleCheckbox}
                                />
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
                                    onOptionChange={(dateOption) =>
                                        setDateOption(dateOption)
                                    }
                                    options={[
                                        {
                                            value: "beginning",
                                            content: "Beginning of time",
                                        },
                                        {
                                            value: "date",
                                            content: "Specific date",
                                        },
                                        {
                                            value: "order",
                                            content: "Specific Order",
                                        },
                                    ]}
                                    placeholder={"Select an option"}
                                    placement={"bottom-start"}
                                    required
                                    value={dateOption}
                                />
                            </FormGroup>
                            {dateOption === "date" ? (
                                <FormGroup>
                                    <Datepicker
                                        label="Pick a date"
                                        min="01/01/2021"
                                        max={getToday()}
                                        onDateChange={(value) => setDate(value)}
                                        value={date}
                                        locale="en-AU"
                                    />
                                </FormGroup>
                            ) : null}

                            {dateOption === "order" ? (
                                <FormGroup>
                                    <Select></Select>
                                </FormGroup>
                            ) : null}
                            <FormGroup>
                                <Button>Sync Now</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PushSettings;
