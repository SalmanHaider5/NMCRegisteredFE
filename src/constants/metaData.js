export const TITLE = "NMC Registered"
export const DATE_FORMAT = "DD/MM/YYYY"
export const TIME_FORMAT = "HH:mm"
export const GENERAL_ERROR = { title: 'Server Error', name: "Something went wrong!" }
export const GET_ADDRESS_API_KEY = "dVsQRsLdEkasx1cfi4PGMg25238"
export const ADDRESSES_ERROR_TITLE = 'Invalid Post Code'
export const ADDRESSES_ERROR_MESSAGE = 'Please check your post code and request again'
export const ADBLOCKER_MESSAGE = 'Please disable your ad-blocker to make payment and reload the page again or skip payment option right now' 
export const PAYPAL_WEB_LINK = 'https://www.paypal.com/us/webapps/mpp/paypal-safety-and-security'
export const STRIPE_WEB_LINK = 'https://stripe.com/payments'
export const NMC_WEB_LINK = 'https://www.nmc.org.uk/registration/search-the-register/'
export const DBS_WEB_LINK = 'https://secure.crbonline.gov.uk/crsc/check?execution=e1s1'
export const STRIPE_KEY = 'pk_test_cmqEvoYCsQr8Ur3q2AoEY5V800VuRo430P'
export const PAYPAL_OPTIONS = {
    'client-id': 'ATET_OBKQsm2EXXHAEenw8kALfnbgERBkb9U_I2ZVVvATJXtRsrY9easUR2UU_U1I9UYp0ZMYoMo8S6O',
    'currency': 'GBP'
}
export const PAYPAL_BUTTON_STYLE = {
    color: 'blue',
    height: 35,
    shape: 'pill',
    label: 'checkout',
    layout: 'horizontal'
}
export const TIMESHEET_DAYS = [
    {id: 1, name: 'Monday'},
    {id: 2, name: 'Tuesday'},
    {id: 3, name: 'Wednesday'},
    {id: 4, name: 'Thursday'},
    {id: 5, name: 'Friday'},
    {id: 6, name: 'Saturday'},
    {id: 7, name: 'Sunday'}
]
export const TIMESHEET_SHIFTS = [
    {id: 1, name: 'Early Shift', startTime: '07:00', endTime: '15:00'},
    {id: 2, name: 'Early Long Shift', startTime: '07:00', endTime: '20:00'},
    {id: 3, name: 'Late Shift', startTime: '14:00', endTime: '22:00'},
    {id: 4, name: 'Night Shift', startTime: '20:00', endTime: '08:00'},
    {id: 5, name: 'Customized Shift'}
]

export const OFFER_OPTIONS = [
    { label: 'Pending Requests', value: 'pending' },
    { label: 'Accepted Requests', value: 'accepted' },
    { label: 'Declined Requests', value: 'declined' },
    { label: 'Approved Shifts', value: 'approved' },
    { label: 'Rejected Shifts', value: 'rejected' }
];

export const GENDER_OPTIONS = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' }
]
export const QUALIFICATION_OPTIONS = [
    { id: 1, name: 'Registered Nurse Learning Disabilities' },
    { id: 2, name: 'Registered General Nurse' },
    { id: 3, name: 'Registered Mental Nurse' },
    { id: 4, name: `Registered Sick Children's Nurse` },
    { id: 5, name: 'Advanced Nursing Practitioner' },
    { id: 6, name: 'Emergency Nursing Practitioner' },
    { id: 7, name: 'Operating Department Practitioner' },
    { id: 8, name: 'ICU HDU Nurse' },
    { id: 9, name: 'Nursing Associate' }
]

export const paymentCycleDescription = "The payment cycle can affect the uptake of shifts. Faster payment will result in more uptake of shift offers"

export const TERMS = [
    {
        id: 1,
        title: '',
        text: 'The legal licence for this software product is wholly owned by Nmc Registered Ltd, hereafter referred to as the “proprietor” and is a Proprietary licence.'
    },
    {
        id: 2,
        title: 'Licence',
        text: 'The Software is licensed, not sold. USER will not remove any identification, modify or obscure any proprietary or copyright notice of the Company from any copy of the Software or documents.The licence for this software product remains wholly the ownership of the proprietor and if infringed can be withdrawn or suspended from the User without notice or dispute.'
    },
    {
        id: 3,
        title: 'User',
        text: 'Defined as an authorised licensed individual or company using the software product.'
    },
    {
        id: 4,
        title: 'User Rights',
        text: 'No rights apply for changes, redistribution, 3rd Party usage or copying of the software without the pre-authorised written consent of Nmc Registered Ltd.'
    },
    {
        id: 5, 
        title: 'Infringement',
        text: 'Infringement will be deemed as any action initiated by the User which breeches any clause or implied clauses below.',
        options: [
            {
                id: 1,
                text: 'Failure to comply with the',
                button: 'Terms of Purchase'
            },
            {
                id: 2,
                text: 'Failure to pay the full amount owed to any professional or 3rd Party sourced through the software system who has completed the normal and reasonable duties* stipulated by the User beforehand; within the agreed set time period of 1 Pay Cycle proceeding the completed shift.'
            },
            {
                id: 3,
                text: 'Failure to comply with any or all of the proprietors User Rights stipulated above.'
            },
            {
                id: 4,
                text: 'Failure to comply with the stated Data Protection Act 2018 rules and principles. See link provided ',
                linkText: 'here',
                link: 'http://www.legislation.gov.uk/ukpga/2018/12/contents/enacted'
            }
        ]
    }
]

export const PRIVACY_POLICY = [
    {
        id: 1,
        title: '',
        text: 'The primary purpose of nmcregistered.org.uk is to be a resource and business tool to help you create and sustain your business growth. We want you to feel secure when visiting our site and vigorously work to ensure your privacy to the best of our ability at all times. This site is fully PCI DSS and GDRP compliant'
    },
    {
        id: 2,
        title: '',
        text: 'An overview of how we protect your privacy when connected to nmcregistered.org.uk.'
    },
    {
        id: 3,
        title: 'Do we solicit information/Data?',
        text: 'Information on nmcregistered.org.uk is gathered by one method, voluntary submissions. Only when you agree to share the information/data when you voluntarily submit information on various pages of nmcregistered.org.uk. The use of cookies and other technologies is not monitored or logged by us for any information gathering agenda.'
    },
    {
        id: 4,
        title: 'How do we use this information?',
        text: 'Submitted information is assessed to determine what is most beneficial about our site in relation to our clients and to help us identify ways to improve and eventually determine how we can tailor nmcregistered.org.uk to make it a more effective site to service our clients.'
    },
    {
        id: 5,
        title: 'Do we share information or data with third parties?',
        text: 'As an organisation the data we collect may be transferred throughout NMC Registered network this is a necessary requirement in order for us to provide the quality of service expected by our clients. We do not or will not sell individual information and will share it only with the relevant members of our organisation aligned to providing our services. Before you submit any information, we will notify you as to why we are asking for specific information and it is completely upon your own discretion as to whether or not you wish to provide it'
    },
    {
        id: 6,
        title: 'Do we share personal information or data with third parties?',
        text: 'No. As an organisation the data submitted may be transferred throughout NMC Registered network, this is a necessary requirement in order for us to provide the quality of service expected by our clients. We do not and will not sell or disclose individual information and will share it only with the relevant members of our organisation aligned to providing our services.'
    },
    {
        id: 7,
        title: 'Your right access your personal data/freedom of information.',
        text: 'You are entitled to know whether we hold data/information about you; if we do you can obtain access to that data/information to ensure its accuracy or to have it amended where necessary. You can do this by sending an e-mail via our “Contact Us” page, please mark the subject as “FOI”.'
    },
    {
        id: 8,
        title: '',
        text: 'At nmcregistered.org.uk we are focused on maintaining your privacy and creating a sustainable and valuable resource for you to use. If you have any questions regarding the security of our site, please email us via our “Contact Us” page, please mark the subject as “Privacy”.'
    }
]

export const TERMS_OF_PURCHASE = [
    {
        id: 1,
        title: '',
        text: 'Last modified on October 26th 2020'
    },
    {
        id: 2,
        title: 'Introduction',
        text: 'The Software is licensed, not sold. These terms governing card payments, “Terms of Purchase” apply between you and NMC Registered Ltd, having its registered office located at Kemp House, 160 City Road, London, EC1V 2NX, United Kingdom. By purchasing this service licence, you stipulate that you have read, understand, and agree to be bound by these Terms of Purchase in effect at the time of purchase. You will be required to confirm that you agree to these Terms of Purchase before you purchase our service licence.'
    },
    {
        id: 3,
        title: 'Payment method and terms',
        text: 'All our prices are in Pound Sterling currency. Only GBP Invoices will be issued. We accept the following methods of payment:',
        options: [
            {
                id: 1,
                text: 'All mainstream Debit and Credit Cards'
            },
            {
                id: 2,
                text: 'PayPal'
            }
        ] 
    },
    {
        id: 4,
        title: '',
        text: 'You are subject to all terms and conditions of the payment method you select. By submitting any card details you authorise NMC Registered Ltd, or its designated payment processor, to charge the account you have specified for the purchase amount.'
    },
    {
        id: 5,
        title: 'Taxes',
        text: 'You are responsible for the payment of any and all applicable taxes.'
    },
    {
        id: 6,
        title: 'Data Policy',
        text: 'Your data is important to NMC Registered Ltd. When you purchase a service licence by credit or debit card through our website, you are giving NMC Registered Ltd your permission to securely transmit the information provided to our designated payment processor for the sole purpose of processing your card payment and delivering the service license to you.'
    },
    {
        id: 7,
        title: '',
        text: 'We will not store your card details or disclose any financial information about you to any third parties.'
    },
    {
        id: 8,
        title: '',
        text: 'By entering your card information, you are stating that you are an authorised user of the card and that the associated information entered (card holder name, card number, billing information, etc.) is accurate, and you authorise NMC Registered Ltd to charge the purchase amount to your card.'
    },
    {
        id: 9,
        title: '',
        text: 'By clicking Make Payment you agree to these Terms of Purchase and consent to receiving a one-time confirmation of payment electronically to the email address you have provided.'
    },
    {
        id: 10,
        title: 'Warranties and Limitation of Liability',
        text: 'Except as specifically provided in this Agreement, the Software is provided “as is” without warranty of any kind, express or implied, including but not limited to warranties of performance. The customer accepts full liability for all and any professionals shift availability status registered on our system.'
    },
    {
        id: 11,
        title: 'Legal',
        text: 'In the event of legal matters, all proceedings will be conducted in accordance with applicable UK law and any disputes shall be subject to the exclusive jurisdiction of the English Courts.'
    }
]