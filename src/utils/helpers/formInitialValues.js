export const getUsersFormValues = () => {
    return {
        signup: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        login: {
            email: '',
            password: ''
        }
    }
}

export const getCompanyFormValues = () => {
    return {
        firstName: '',
        lastName: '',
        organization: '',
        tradingName: '',
        businessAdressLineOne: '',
        businessAdressLineTwo: '',
        city: '',
        county: '',
        postalCode: '',
        website: '',
        phone: '',
        registration: '',
        charity: '',
        subsidiary: false,
        subsidiaryName: '',
        subsidiaryAddress: ''
    }
}

export const getProfessionalFormValues = () => {
    return {
        status: '',
        fullName: '',
        phone: '',
        dateOfBirth: '',
        postalCode: '',
        address: '',
        city: '',
        nmcPin: '',
        hasTransport: false,
        experience: ''
    }
}