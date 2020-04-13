import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change } from 'redux-form'
import { Icon } from 'antd'
import { concat, omit, trim, find, propEq, split, prop, defaultTo } from 'ramda'
import { addDetails, logoutUser, getCompanyDetails, getAdresses, updatePassword, contactUs, updateProfile, searchProfessionals } from '../../actions'
import { QUALIFICATION_OPTIONS as skills } from '../../constants'
import { getCompanyFormValues, isEmptyOrNull } from '../../utils/helpers'
import AddDetails from './AddDetails'
import ViewDetails from './ViewDetails'
import Header from '../Header'

import './company.css'

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      charity: false,
      subsidiary: false,
      paymentSkipped: false,
      paymentMethod: '',
      collapsed: false,
      formName: '',
      editFormModal: false
    };
  }

  componentDidMount(){
    const { match: { params: { userId } }, dispatch, application: { authentication: { auth, role } }, history } = this.props
    dispatch(getCompanyDetails(userId))
    if(!auth && role !== 'company'){
      history.push('/')
    }
  }
  
  next = () => {
    const { current } = this.state
    this.setState({ current: current + 1 })
  }

  prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }

  onCollapse = () => {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  changePassword = () => {
    const { dispatch, formValues, match: { params: { userId } } } = this.props
    const { changePassword } = formValues
    const values = omit(['confirmPassword'], changePassword)
    dispatch(updatePassword(userId, values))
  }

  sendMessage = () => {
    const { dispatch, formValues: { contactForm } } = this.props
    const { subject } = contactForm
    contactForm.subject = `${subject} [Contact Form | Company]`
    dispatch(contactUs(contactForm))
  }
  updateCompany = () => {
    const { formValues, dispatch, match: { params: { userId } } } = this.props
    const values = omit(['contactForm', 'searchForm', 'changePassword', 'email', 'isVerified'], formValues)
    dispatch(updateProfile(userId, values))
    this.hideEditFormModal()
  }

  saveDetails = () => {
    const { dispatch, formValues, match: { params: { userId } } } = this.props
    const values = omit(['changePassword', 'contactForm', 'searchForm'], formValues)
    dispatch(addDetails(userId, values))
    dispatch(reset('company'))
    this.setState({ current: 0 })
  }

  logout = () => {
    const { dispatch, application: { auth, role }, history } = this.props
    dispatch(logoutUser())
    if(!auth && role !== 'company'){
      history.push('/')
    }
  }

  searchProfessionalsBySkills = skillId => {
    const { match: { params: { userId } }, dispatch, company: { companyDetails: { postalCode } } } = this.props
    const skill = prop('name', find(propEq('id', skillId))(skills))
    dispatch(searchProfessionals(userId, postalCode, skill))
  } 

  charityStatusChange = () => {
    const { charity } = this.state
    this.setState({ charity: !charity })
  }

  showEditFormModal = (name) => {
    this.setState({
      editFormModal: true,
      formName: name
    })
  }

  hideEditFormModal = () => {
    this.setState({
      editFormModal: false,
      formName: ''
    })
  }

  logout = () => {
    const { dispatch, history } = this.props
    dispatch(logoutUser())
    history.push('/')
  }

  subsidiaryStatusChange = () => {
    const { subsidiary } = this.state
    this.setState({ subsidiary: !subsidiary })
  }

  findAddresses = () => {
    const { dispatch, formValues: { postCode } } = this.props
    dispatch(getAdresses(trim(postCode)))
  }

  skipPaymentOption = () => {
    this.setState({ paymentSkipped: true })
  }

  changePaymentMethod = e => {
    this.setState({ paymentMethod: e.target.value })
  }

  addressSelectHandler = addressId => {
    const { dispatch, addresses: { addresses } } = this.props
    if(!isEmptyOrNull(addressId)){
      const address = split(',', prop('name', find(propEq('id', addressId))(addresses)))
      dispatch(change('company', 'address', concat(address[0], address[1])))
      dispatch(change('company', 'city', address[5]))
      dispatch(change('company', 'county', address[6]))
    }
  }

  getFormIcon = (id, className) => {
    switch(id){
      case 0:
        return <Icon type="user" className={className} />
      case 1:
        return <Icon type="environment" className={className} />
      default:
        return <Icon type="highlight" className={className} />
    }
  }

  getFormName = current => {
    switch(current){
      case 0:
        return `Personal Details`
      default:
        return `Professional Details`
    }
  }
  
  render() {
    const { current, charity, subsidiary, paymentSkipped, collapsed, formName, editFormModal } = this.state
    const { invalid, addresses, company: { companyDetails, isLoading, professionals }, application: { authentication: { userId } }, formValues } = this.props
    const isPaid = defaultTo(false, prop('isPaid', companyDetails))
    return(
      <div>
        <Header
          logout={this.logout}
        />
        {
          !isEmptyOrNull(companyDetails) && (isPaid || paymentSkipped) ?
          <ViewDetails
            collapsed={collapsed}
            userId={userId}
            formValues={formValues}
            isPaid={isPaid}
            isLoading={isLoading}
            company={companyDetails}
            formName={formName}
            editFormModal={editFormModal}
            addresses={addresses}
            charity={charity}
            subsidiary={subsidiary}
            professionals={professionals}
            findAddresses={this.findAddresses}
            addressSelectHandler={this.addressSelectHandler}
            showEditFormModal={this.showEditFormModal}
            hideEditFormModal={this.hideEditFormModal}
            charityStatusChange={this.charityStatusChange}
            subsidiaryStatusChange={this.subsidiaryStatusChange}
            onCollapse={this.onCollapse}
            changePassword={this.changePassword}
            sendMessage={this.sendMessage}
            updateCompany={this.updateCompany}
            searchProfessionalsBySkills={this.searchProfessionalsBySkills}
          /> 
          :
          <AddDetails
            current={current}
            charity={charity}
            subsidiary={subsidiary}
            invalid={invalid}
            addresses={addresses}
            paymentSkipped={paymentSkipped}
            companyDetails={companyDetails}
            next={this.next}  
            prev={this.prev}
            getFormIcon={this.getFormIcon}
            getFormName={this.getFormName}
            findAddresses={this.findAddresses}
            addressSelectHandler={this.addressSelectHandler}
            charityStatusChange={this.charityStatusChange}
            subsidiaryStatusChange={this.subsidiaryStatusChange}
            saveDetails={this.saveDetails}
            skipPaymentOption={this.skipPaymentOption}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('company')(state),
    company: state.company,
    addresses: state.addresses,
    application: state.account
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'company',
    initialValues: getCompanyFormValues()
  })(Company)
)