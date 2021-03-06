import React, { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Datepicker,
    Form,
    FormGroup,
    Select,
} from "@bigcommerce/big-design";

const getToday = () => {
    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${month < 10 ? `0${month}` : `${month}`}/${day}/${year}`;
};

const PushSettings = (token) => {
    // Declare Variables
    const todayIs = getToday();

    // Declare States
    const [checked, setChecked] = useState(false);
    const [trelloToken, setTrelloToken] = useState(token);
    const [dateOption, setDateOption] = useState("beginning");
    const [boardOption, setBoardOption] = useState("");
    const [listOption, setListOption] = useState("");
    const [currentList, setCurrentList] = useState("No list chosen");
    const [date, setDate] = useState(`${todayIs}`);
    const [boardsList, setBoardsList] = useState(null);
    const [listsList, setListsList] = useState(null);

    let listsObj;

    console.log("Found: " + token);

    const getBoards = async () => {
        let result = await axios(
            `trello-api/callTrello/members/me/boards/${token}`
        );

        console.log(result);
        return false;
    };

    useEffect(() => {
        getBoards();
    }, []);

    const processBoardChange = (key) => {
        if (key !== null) {
            fetch(
                "https://api.trello.com/1/boards/" +
                    key +
                    "/lists?key=366d3a7f27ff81fde9157811979f86e7&token=2aa9ac92d328f0f441c7a8d6cd4eb3c3cbf3a6578822ac2672a22d00584c426f"
            )
                .then((response) => response.json())
                .then((actualData) => {
                    setListsList(
                        actualData.map((item) => {
                            return { value: item["id"], content: item["name"] };
                        })
                    );

                    setListsList(listsObj);
                });
        }
    };

    const processListChange = (key) => {
        if (key !== null) {
            fetch(
                "https://api.trello.com/1/lists/" +
                    key +
                    "/cards?key=366d3a7f27ff81fde9157811979f86e7&token=2aa9ac92d328f0f441c7a8d6cd4eb3c3cbf3a6578822ac2672a22d00584c426f"
            )
                .then((respose) => respose.json())
                .then((actualData) => {
                    setCurrentList(
                        actualData.map((item) => {
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

    useEffect(() => {
        console.log("Start...");
        getBoards();
    });

    // When Checkbox Changes
    const handleCheckbox = () => setChecked(!checked);

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
                                        onOptionChange={(boardOption) => {
                                            setBoardOption(boardOption);
                                            processBoardChange(boardOption);
                                        }}
                                        options={boardsList}
                                        placeholder={"Select a board"}
                                        placement={"bottom-start"}
                                        required
                                        value={boardOption}
                                    />
                                ) : null}
                            </FormGroup>

                            <FormGroup>
                                {boardOption !== "" ? (
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
                                            value: "from",
                                            content: "Specific date",
                                        },
                                    ]}
                                    placeholder={"Select an option"}
                                    placement={"bottom-start"}
                                    required
                                    value={dateOption}
                                />
                            </FormGroup>

                            {dateOption === "from" ? (
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
