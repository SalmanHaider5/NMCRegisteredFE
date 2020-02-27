import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change, initialize } from 'redux-form'
import { trim, split, prop, propEq, concat, find, isNil } from 'ramda'
import { getAdresses, createDetails, addPhone, verifyPhone, logoutUser, getProfessionalDetails } from '../../actions'
import { getProfessionalFormValues } from '../../utils/helpers'
import Header from '../Header'
import AddDetails from './DetailForms'
import ViewDetails from './ViewDetails'

class Professional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      verificationModal: false,
      collapsed: false,
      formModal: false,
      formName: ''
    };
  }

  componentDidMount(){
    const { application: { authentication: { auth, role } }, history, dispatch, match: { params: { userId } } } = this.props
    // dispatch(getProfessionalDetails(userId))
    // if(!auth && role !== 'professional'){
    //   history.push('/')
    // }
  }
  
  next = () => {
    const { current } = this.state
    this.setState({ current: current + 1 })
  }

  prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }

  showVerificationModal = () => {
    const { formValues: { phone }, match: { params: { userId } }, dispatch } = this.props
    const values = {}
    values.phone = phone
    dispatch(addPhone(userId, values))
  }

  showEditFormModal = (name) => {
    const { dispatch, professional: { professionalDetails: { professional } } } = this.props
    dispatch(initialize('professional', professional))
    this.setState({
      formModal: true,
      formName: name
    })
  }

  hideEditFormModal = () => {
    this.setState({
      formModal: false,
      formName: ''
    })
  }

  saveDetails = () => {
    const { dispatch, match: { params: { userId } }, formValues } = this.props
    dispatch(createDetails(userId, formValues))
    dispatch(reset('professional'))
    this.next()
  }

  logout = () => {
    const { dispatch, application: { auth, role }, history } = this.props
    dispatch(logoutUser())
    if(!auth && role !== 'professional'){
      history.push('/')
    }
  }

  findAddresses = () => {
    const { dispatch, formValues: { postCode } } = this.props
    dispatch(getAdresses(trim(postCode)))
  }

  addressSelectHandler = () => {
    const { dispatch, formValues: { addressId }, addresses: { addresses } } = this.props
    const address = split(',', prop('name', find(propEq('id', addressId))(addresses)))
    dispatch(change('professional', 'address', concat(address[0], address[1])))
    dispatch(change('professional', 'city', address[5]))
    dispatch(change('professional', 'county', address[6]))
  }

  verifyProfessionalPhone = () => {
    const { formValues: { phoneCode }, dispatch, match: { params: { userId } } } = this.props
    const values = {}
    values.code = phoneCode
    dispatch(verifyPhone(userId, values))
    dispatch(reset('professional'))
  }

  hideVerificationModal = () => {
    const { formValues: { phone }, match: { params: { userId } }, dispatch } = this.props
    const values = {}
    values.phone = phone
    dispatch(addPhone(userId, values))
  }

  onCollapse = () => {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  render() {
    const { collapsed, formModal, formName } = this.state
    const {
      addresses,
      professional: {
        isLoading,
        professionalDetails
      },
      match: {
        params: {
          userId
        }
      }
    } = this.props
    console.log('Props', this.props)
    return (
      <div>
        <Header
          logout={this.logout}
        />
        {
          !isNil(professionalDetails) ? 
          <ViewDetails
            userId={userId}
            isLoading={isLoading}
            collapsed={collapsed}
            onCollapse={this.onCollapse}
            professional={professionalDetails.professional}
            formModal={formModal}
            formName={formName}
            showEditFormModal={this.showEditFormModal}
            hideEditFormModal={this.hideEditFormModal}
            findAddresses={this.findAddresses}
            addressSelectHandler={this.addressSelectHandler}
            addresses={addresses}
          /> :
          <AddDetails />
        }
          
      </div>
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
