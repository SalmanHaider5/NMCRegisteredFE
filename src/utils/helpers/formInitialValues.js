export const getProductInitialValues = () => {
    return {
        id: '',
        title: '',
        price: 10,
        discount: 0,
        openlength: 0,
        bladelength: 0,
        handlelength: 0,
        shipping: 0,
        stock: 0,
        tips: '',
        description: '',
        data: '2020-01-01'
    }
}
export const getSettingsInitialValues = () =>{
    return{
        primaryemail: '',
        secondaryemail: '',
        phone: '',
        whatsapp: '',
        address: '',
        paypal: ''
    }
}
export const getMembersInitialValues = () => {
    return{
        name: '',
        phone: '',
        email: '',
        address: '',
        img: ''
    }
}