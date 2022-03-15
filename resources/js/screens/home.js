import React, { useState } from "react";
import { Form, FormGroup, Checkbox, Button, GlobalStyles, Select, Datepicker } from "@bigcommerce/big-design";

// When Select Option Changes
const handleOption = () => {

}

const getToday = () => {
    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${month <10 ? `0${month}` : `${month}`}/${day}/${year}`;
}

// export default class Home extends Component {
const Home = () => {
    const todayIs = getToday();
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(`${todayIs}`);
    return (
       <div className="container">
           <div className="row">
               <div className="col-md-8">
                   <div className="card">
                       <div className="card-header">Home Page</div>

                       <div className="card-body">
                           {getToday()}
                           <GlobalStyles />
                           <Form>
                               <FormGroup>
                                   <Select
                                       filterable={true}
                                       label="When do you want to sync from?"
                                       maxHeight={300}
                                       onOptionChange={handleOption}
                                       options={[
                                           { value: 'beginning', content: 'Beginning of time' },
                                           { value: 'from', content: 'Specific date' },
                                       ]}
                                       placeholder={'Select an option'}
                                       placement={'bottom-start'}
                                       required
                                       value=''
                                   />
                               </FormGroup>

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

                               <FormGroup>
                                   <Checkbox
                                       label='Turn on automatic sync'
                                       checked={checked}
                                       onChange='' />
                               </FormGroup>
                           </Form>
                           <Button>Sync Now</Button>
                       </div>
                   </div>
               </div>

               <div className="col-md-4">
                   <div className="card">
                       <div className="card-header">Side Bar</div>

                       <div className="card-body">
                           This is a Side Bar.
                       </div>
                   </div>
               </div>
           </div>
       </div>
    );
}

export default Home;
