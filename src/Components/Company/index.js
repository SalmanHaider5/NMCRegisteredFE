import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change } from 'redux-form'
import { Icon } from 'antd'
import { concat, omit, trim, find, propEq, split, prop } from 'ramda'
import { addDetails, logoutUser, getCompanyDetails, getAdresses } from '../../actions'
import { getCompanyFormValues, showToast, isEmptyOrNull } from '../../utils/helpers'
import AddDetails from './AddDetails'
import Header from '../Header'

import './company.css'

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      charity: false,
      subsidiary: false,
      paymentMethod: ''
    };
  }

  componentDidMount(){
    const { match: { params: { userId } }, dispatch, application: { authentication: { auth, role } }, history } = this.props
    dispatch(getCompanyDetails(userId))
    if(!auth && role !== 'company'){
      history.push('/')
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.company.companyDetails !== this.props.company.companyDetails){
      const { company: { companyDetails: { code, response: { title, message } } } } = this.props
      if(code === 'success'){
        this.setState({ current: 2 })
      }else{
        showToast(title, message, code)
      }
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

  saveDetails = () => {
    const { dispatch, formValues, match: { params: { userId } } } = this.props
    const { businessAdressLineOne, businessAdressLineTwo } = formValues
    const address = concat(businessAdressLineOne, businessAdressLineTwo)
    const values = omit(['businessAdressLineOne', 'businessAdressLineTwo'], formValues)
    values.address = address
    dispatch(addDetails(userId, values))
    dispatch(reset('company'))
    const { current } = this.state
    this.setState({ current: current + 1 })
  }

  logout = () => {
    const { dispatch, application: { auth, role }, history } = this.props
    dispatch(logoutUser())
    if(!auth && role !== 'company'){
      history.push('/')
    }
  }

  charityStatusChange = () => {
    const { charity } = this.state
    this.setState({ charity: !charity })
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

  changePaymentMethod = e => {
    this.setState({ paymentMethod: e.target.value })
  }

  addressSelectHandler = () => {
    const { dispatch, formValues: { addressId }, addresses: { addresses } } = this.props
    if(!isEmptyOrNull(addresses) && !isEmptyOrNull(addressId)){
      const address = split(',', prop('name', find(propEq('id', addressId))(addresses)))
      dispatch(change('company', 'businessAdressLineOne', address[0]))
      dispatch(change('company', 'businessAdressLineTwo', address[1]))
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
    const { current, charity, subsidiary } = this.state
    const { invalid, addresses } = this.props
    return(
      <div>
        <Header
          logout={this.logout}
        />
        {
          current === 2 ?
          <div>
            <h3>Company Record is already added!</h3>
          </div> :
          <AddDetails
            current={current}
            charity={charity}
            subsidiary={subsidiary}
            invalid={invalid}
            addresses={addresses}
            next={this.next}
            prev={this.prev}
            getFormIcon={this.getFormIcon}
            getFormName={this.getFormName}
            findAddresses={this.findAddresses}
            addressSelectHandler={this.addressSelectHandler}
            charityStatusChange={this.charityStatusChange}
            subsidiaryStatusChange={this.subsidiaryStatusChange}
            saveDetails={this.saveDetails}
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