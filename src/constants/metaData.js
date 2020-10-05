export const TITLE = "NMC Registered"
export const DATE_FORMAT = "DD/MM/YYYY"
export const TIME_FORMAT = "HH:mm"
export const GET_ADDRESS_API_KEY = "dVsQRsLdEkasx1cfi4PGMg25238"
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

export const GENDER_OPTIONS = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Others' }
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
        text: 'The licence for this software product is wholly owned by Nmc Registered Ltd, hereafter referred to as the "proprietor" and is defined as a Proprietary licence.'
    },
    {
        id: 2,
        title: 'Licence',
        text: 'The licence for this software product remains wholly the ownership of the Proprietor and if infringed can be withdrawn or suspended from the User without notice.'
    },
    {
        id: 3,
        title: 'User',
        text: 'Defined as an authorised licensed individual or company using the software product.'
    },
    {
        id: 4,
        title: 'User Rights',
        text: 'No rights apply for changes, redistribution, 3rd Party usage or copying of the software without the pre-authorised written consent of the Proprietor.'
    },
    {
        id: 5, 
        title: 'Infringement',
        text: 'Infringement will be deemed as any action initiated by the User which breeches any clause or implied clauses below:',
        options: [
            {
                id: 1,
                text: 'Failure to pay the licence fee'
            },
            {
                id: 2,
                text: 'Failure to pay the full amount owed to any professional or 3rd Party sourced through the software system within the agreed set time period of 2 weeks inclusive who has completed the shift duties stipulated by the User beforehand'
            },
            {
                id: 3,
                text: 'Failure to comply with any or all of the proprietors User Rights stipulated above'
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
        text: 'The primary purpose of nmcregistered.org.uk is to be a resource and business tool to help maintain your business. We want you to feel secure when visiting our site and vigorously work to ensure your privacy is secured at all times'
    },
    {
        id: 2,
        title: '',
        text: 'An overview of how we protect your privacy when connected to nmcregistered.org.uk is as follows'
    },
    {
        id: 3,
        title: 'Do we solicit information/Data?',
        text: 'Only by one method, voluntary submissions. The use of "cookies" and other technologies is not incorporated, monitored or logged by us for any information gathering agenda'
    },
    {
        id: 4,
        title: '',
        text: 'It is completely at the individual’s discretion whether or not to provide details of any kind'
    },
    {
        id: 5,
        title: 'Do we share information or data with third parties?',
        text: 'As an organisation the data we collect may be transferred throughout NMC Registered network this is a necessary requirement in order for us to provide the quality of service expected by our clients. We do not or will not sell individual information and will share it only with the relevant members of our organisation aligned to providing our services. Before you submit any information, we will notify you as to why we are asking for specific information and it is completely upon your own discretion as to whether or not you wish to provide it'
    },
    {
        id: 6,
        title: 'Do we share personal information or data with third parties?',
        text: 'No, all information submitted is secure and data protected'
    },
    {
        id: 7,
        title: 'Your right access your personal data/freedom of information.',
        text: 'You are entitled to know whether we hold data/information about you; if we do you can obtain access to that data/information to ensure its accuracy or to have it amended where necessary. You can do this by sending us an e-mail to "Privacy Data" via ',
        buttonText: 'Contact Us'
    }
]