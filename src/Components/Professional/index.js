import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change } from 'redux-form'
import moment from 'moment'
import { trim, split, prop, propEq, concat, find, omit, dissoc, type, last, equals, defaultTo, not } from 'ramda'
import {
  getAdresses,
  createDetails,
  addPhone,
  verifyPhone,
  logoutUser,
  getProfessionalDetails,
  updateProfessionalProfile,
  updateSecurityDetails,
  changePhoneRequest,
  clearAddresses,
  contactMessage,
  addBankDetails,
  updateBankDetails,
  changeOfferStatus,
  modifyPhone
} from '../../actions'
import { GENDER_OPTIONS as genders, QUALIFICATION_OPTIONS as qualifications } from '../../constants'
import { getProfessionalFormValues, isEmptyOrNull } from '../../utils/helpers'
import Header from '../Header'
import { Container } from './Container'
import { Loader } from '../../utils/custom-components'
import { modifyEmail } from '../../actions/professional'

class Professional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      formModal: false,
      formName: '',
      current: 0,
      imageModal: false,
      documentFile: '',
      imageFile: '',
      crbFile: '',
      documentModalType: '',
      documentModal: false,
      pageKey: 0,
      emailForm: false,
      phoneForm: false
    };
  }

  componentDidMount(){
    
    const {
      application: { authentication: { auth, role } },
      history,
      dispatch,
      match: { params: { userId } },
      location: { pathname }
    } = this.props

    dispatch(getProfessionalDetails(userId))
    if(last(split('/', pathname)) === 'timesheet'){
      this.setState({ pageKey: '1' })
    }
    if(last(split('/', pathname)) === 'requests'){
      this.setState({ pageKey: '2' })
    }
    if(last(split('/', pathname)) === 'profile'){
      this.setState({ pageKey: '3' })
    }
    if(last(split('/', pathname)) === 'security'){
      this.setState({ pageKey: '4' })
    }
    if(last(split('/', pathname)) === 'contact'){
      this.setState({ pageKey: '5' })
    }
    if(!auth && role !== 'professional'){
      history.push('/')
    }
  }

  switchPage = key => {
    this.setState({ pageKey: key })
  }

  updateOfferStatus = (offerId, status) => {

    const {
      dispatch,
      professional: {
        profile: { offers }
      },
      formValues: { shiftMessage: { msg } },
      match: {
        params: { userId }
      }
    } = this.props

    const offer = find(propEq('id', offerId))(offers)
    offer.professionalMsg = defaultTo('', msg)
    offer.status = status
    offer.professional = userId
    
    dispatch(changeOfferStatus(userId, offer, offer.id))

  }
  
  updateProfessionalDetails = () => {

    const {
      match: {
        params: { userId }
      },
      dispatch,
      formValues
    } = this.props,
      { status, dateOfBirth, qualification } = formValues

    let values = formValues

    if(equals(type(status), 'String'))
      values.status = status
    else
      values.status = prop('name', find(propEq('id', status))(genders))
    if(equals(type(qualification), 'String'))
      values.qualification = qualification
    else
      values.qualification = prop('name', find(propEq('id', qualification))(qualifications))
    
    values.dateOfBirth = moment(dateOfBirth).format('YYYY-MM-DD')

    dispatch(updateProfessionalProfile(userId, values))
    dispatch(change('professional', 'password', ''))

    this.setState({ imageFile: '' })
    this.hideEditFormModal()
  }

  updateSecurityandLoginDetails = () => {

    const {
      formValues: { changePassword },
      dispatch,
      match: {
        params: { userId }
      }
    } = this.props,
      { currentPassword, newPassword, confirmPassword } = changePassword,
      values = dissoc('confirmPassword', changePassword),
      passwordNotFound = isEmptyOrNull(currentPassword) || isEmptyOrNull(newPassword) || isEmptyOrNull(confirmPassword)
      
    if(passwordNotFound){
      dispatch(updateSecurityDetails(userId, values, '2fa'))
    }else{
      dispatch(updateSecurityDetails(userId, values, 'password'))
    }

  }

  sendVerificationCode = () => {

    const {
      formValues: { phone },
      match: { params: { userId } },
      dispatch
    } = this.props

    const values = {}
    values.phone = phone
    dispatch(addPhone(userId, values))
  }

  dateHandler = value => {
    const { dispatch } = this.props
    dispatch(change('professional', 'dateOfBirth', moment(value).format('YYYY-MM-DD')))
  }

  showEditFormModal = name => {
    if(name === 'Email'){
      this.setState({ formModal: true, formName: name, emailForm: true, phoneForm: false})
    }else if(name === 'Phone'){
      this.setState({ formModal: true, formName: name, phoneForm: true, emailForm: false})
    }else{
      this.setState({ formModal: true, formName: name})
    }
  }

  hideEditFormModal = () => {
    const { imageFile } = this.state,
      { dispatch, professional: { profile } } = this.props,
      { profilePicture } = profile

    if(isEmptyOrNull(imageFile)){
      dispatch(change('professional', 'profilePicture', profilePicture))
    }else{
      dispatch(change('professional', 'profilePicture', imageFile))
    }

    this.setState({ formModal: false, formName: '', emailForm: false })
  }


  updateEmail = () => {
    const {
      dispatch,
      match: {
        params: { userId }
      },
      formValues: { userEmail }
    } = this.props

    dispatch(change('professional', 'email', userEmail))
    dispatch(modifyEmail(userId, { email: userEmail }))
    dispatch(change('professional', 'password', ''))
    this.hideEditFormModal()
  }

  updatePhone = () => {
    const {
      dispatch,
      match: {
        params: { userId }
      },
      formValues,
      formValues: { userPhone }
    } = this.props
    dispatch(change('professional', 'phone', userPhone))
    dispatch(modifyPhone(userId, { phone: userPhone }, formValues))
    dispatch(change('professional', 'password', ''))
    this.hideEditFormModal()
  }

  saveDetails = () => {
    const {
      dispatch,
      match: { params: { userId } },
      formValues
    } = this.props

    const { status, qualification, dateOfBirth } = formValues,
      values = omit(['status', 'postalCode', 'changePassword', 'addressId'], formValues)

    values.status = prop('name', find(propEq('id', status))(genders))
    values.qualification = prop('name', find(propEq('id', qualification))(qualifications))
    values.dateOfBirth = dateOfBirth

    dispatch(createDetails(userId, values))
    dispatch(reset('professional'))
  }

  logout = () => {
    const { dispatch, application: { auth, role }, history } = this.props
    dispatch(logoutUser())
    if(!auth && role !== 'professional'){
      history.push('/')
    }
  }

  changePostalCode = () => {
    const { dispatch } = this.props
    dispatch(change('professional', 'postCode', ''))
    dispatch(clearAddresses())
  }

  findAddresses = () => {
    const { 
      dispatch,
      formValues: { postCode }
    } = this.props

    dispatch(getAdresses(trim(postCode)))
  }

  addressSelectHandler = addressId => {
    const { dispatch, addresses: { addresses } } = this.props
    if(!isEmptyOrNull(addressId)){
      const address = split(',', prop('name', find(propEq('id', addressId))(addresses)))
      dispatch(change('professional', 'address', concat(address[0], address[1])))
      dispatch(change('professional', 'city', address[5]))
      dispatch(change('professional', 'county', address[6]))
    }
  }

  verifyProfessionalPhone = () => {
    const {
      formValues: { phoneCode, phone },
      dispatch,
      match: { params: { userId } }
    } = this.props

    const values = {}
    values.code = phoneCode
    values.phone = phone
    dispatch(verifyPhone(userId, values))
  }

  editPhoneNumber = () => {
    const { dispatch } = this.props
    dispatch(changePhoneRequest())
  }

  imageRemoveHandler = () => {
    const { dispatch, formValues: { profilePicture } } = this.props
    this.setState({ imageFile: profilePicture })
    dispatch(change('professional', 'profilePicture', ''))
  }

  saveBankDetails = () => {
    const {
      formValues: { bankDetails },
      dispatch,
      match: { params: { userId } }
    } = this.props

    dispatch(addBankDetails(userId, bankDetails))
  }

  modifyBankDetails = () => {

    const {
      formValues: { bankDetails, password },
      dispatch,
      match: {
        params: { userId }
      }
    } = this.props

    dispatch(updateBankDetails(userId, { password, ...bankDetails } ))
    dispatch(change('professional', 'password', ''))

    this.hideEditFormModal()
  }

  sendMessage = () => {
    
    const {
      dispatch,
      formValues: { contactForm },
      match: {
        params: { userId }
      }
    } = this.props,
    { subject } = contactForm

    contactForm.subject = `${subject} [Contact Form | Professional]`

    dispatch(contactMessage(userId, contactForm))

  }

  render() {

    const { formModal, formName, pageKey, emailForm, phoneForm } = this.state

    const {
      addresses,
      invalid,
      formValues,
      professional: {
        isLoading,
        profile,
        phoneVerified,
        codeSent
      },
      match: {
        params: {
          userId
        }
      },
      application: {
        authentication: {
          auth
        }
      }
    } = this.props

    const { bankDetails } = defaultTo({}, profile)
    const perfectProfile = not(isEmptyOrNull(prop('insurance', bankDetails)))
    
    if(!auth){
      return <Redirect to="/" />
    }
  
    return (
      <>
        <Header clickHandler={this.logout} perfectProfile={perfectProfile} />
        <Loader
          size="large"
          isLoading={isLoading}
          loadingText={'Loading...'}
          wrapper={
            <Container
              userId={userId}
              profile={profile}
              phoneVerified={phoneVerified}
              formValues={formValues}
              codeSent={codeSent}
              formInvalid={invalid}
              addresses={addresses}
              pageKey={pageKey}
              emailForm={emailForm}
              formName={formName}
              formModal={formModal}
              phoneForm={phoneForm}
              updatePhone={this.updatePhone}
              updateEmail={this.updateEmail}
              updateOfferStatus={this.updateOfferStatus}
              editPhoneNumber={this.editPhoneNumber}
              switchPage={this.switchPage}
              showEditFormModal={this.showEditFormModal}
              dateHandler={this.dateHandler}
              verifyProfessionalPhone={this.verifyProfessionalPhone}
              saveDetails={this.saveDetails}
              hideEditFormModal={this.hideEditFormModal}
              sendMessage={this.sendMessage}
              updateProfessionalDetails={this.updateProfessionalDetails}
              findAddresses={this.findAddresses}
              saveBankDetails={this.saveBankDetails}
              changePostalCode={this.changePostalCode}
              modifyBankDetails={this.modifyBankDetails}
              imageRemoveHandler={this.imageRemoveHandler}
              addressSelectHandler={this.addressSelectHandler}
              sendVerificationCode={this.sendVerificationCode}
              updateSecurityandLoginDetails={this.updateSecurityandLoginDetails}
            />
          }
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return{
    formValues: getFormValues('professional')(state),
    professional: state.professional,
    addresses: state.addresses,
    application: state.account
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'professional',
    initialValues: getProfessionalFormValues()
  })(Professional)
)
