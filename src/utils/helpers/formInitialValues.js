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
        },
        forgetPassword: {
            email: ''
        }
    }
}

export const getResetPasswordFormValues = () => {
    return{
        password: '',
        confirmPassword: ''
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

const changePassword = {
    twoFactorAuthentication: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
}

export const getProfessionalFormValues = () => {
    return {
        profilePicture: '',
        status: '',
        fullName: '',
        phone: '',
        dateOfBirth: '',
        postalCode: '',
        address: '',
        city: '',
        nmcPin: '',
        hasTransport: false,
        experience: '',
        changePassword
    }
}

export const getTimesheetValues = () => {
    return{
        id: 0,
        day: '',
        shift: '',
        startTime: '',
        endTime: ''
    }
}