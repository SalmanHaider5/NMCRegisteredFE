export const getSignupFormValues = () => {
    return {
        email: '',
        password: '',
        confirmPassword: ''
    }
}

export const getCompanyFormValues = () => {
    return {
        firstName: '',
        lastName: '',
        organization: '',
        businessAdressLineOne: '',
        businessAdressLineTwo: '',
        city: '',
        country: '',
        postalCode: '',
        website: '',
        phone: '',
        registration: '',
        charity: '',
        subsidiary: false,
        subsidiaryName: ''
    }
}

export const getProfessionalFormValues = () => {
    return {
        status: false,
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