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

const shiftsForm = {
    shift1: false,
    shift2: false,
    shift3: false,
    shift4: false,
    shift5: false
}

const searchForm = {
    skill: '',
    day0: shiftsForm,
    day1: shiftsForm,
    day2: shiftsForm,
    day3: shiftsForm,
    day4: shiftsForm,
    day5: shiftsForm,
    day6: shiftsForm
}
const offerForm = {
    shiftRate: '',
    shifts: [],
    address: '',
    message: ''
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
        paymentCycle: '',
        subsidiaryName: '',
        subsidiaryAddress: '',
        paymentMethod: '',
        changePassword: changeCompanyPassword,
        contactForm,
        searchForm,
        offerForm
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