import React, {useState} from "react";

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

const previewTemplate = `
    {'{Customer_Name}'}<br/>
    {'{{Every}}'}}<br/>
    <div class="ps-4">
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

const CardTemplate = () => {
    const [cardPreview, setCardPreview] = useState('');
    const [cardTemplate, setCardTemplate] = useState(previewTemplate);

    return (
        <div className="row">
            <div className="col-md-16">
                <div className="card mt-3">
                    <div className="card-header">Trello Card Template</div>
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
                                            Address:<br/>
                                            {'{shippingStreet1}'}<br/>
                                            {'{shippingStreet2}'}<br/>
                                            {'{shippingSuburb}'}, {'{shippingState}'} - {'{shippingPostcode}'}<br/>
                                            {'{shippingCountry}'}<br/><br/>
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
                                            Address:<br/>
                                            {'{shippingStreet1}'}<br/>
                                            {'{shippingStreet2}'}<br/>
                                            {'{shippingSuburb}'}, {'{shippingState}'} - {'{shippingPostcode}'}<br/>
                                            {'{shippingCountry}'}<br/><br/>
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
    );
};

export default CardTemplate;
