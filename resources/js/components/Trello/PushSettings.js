import {Button, Checkbox, Datepicker, Form, FormGroup, Select} from "@bigcommerce/big-design";
import React from "react";

const PushSettings = () => {
    return (
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
    );
};

export default PushSettings;
