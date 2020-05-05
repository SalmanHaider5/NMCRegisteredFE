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
const changeCompanyPassword = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
}

const contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
}
const searchForm = {
    skill: '',
    searchDate: '',
    shift: ''
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
        charity: false,
        charityReg: '',
        subsidiary: false,
        subsidiaryName: '',
        subsidiaryAddress: '',
        changePassword: changeCompanyPassword,
        contactForm,
        searchForm
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
        changePassword,
        contactForm
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