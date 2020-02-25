import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change } from 'redux-form'
import { map, concat, omit, trim, find, propEq, split, prop } from 'ramda'
import { Steps, Button, Row, Col, Icon } from 'antd'
import { addDetails, logoutUser, getCompanyDetails, getAdresses } from '../../actions'
import { getCompanyFormValues, showToast } from '../../utils/helpers'
import { Response } from '../../utils/custom-components'
import BasicForm from './BasicForm'
import BusinessForm from './BusinessForm'

import './company.css'

const { Step } = Steps;

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
    const address = split(',', prop('name', find(propEq('id', addressId))(addresses)))
    dispatch(change('company', 'businessAdressLineOne', address[0]))
    dispatch(change('company', 'businessAdressLineTwo', address[1]))
    dispatch(change('company', 'city', address[5]))
    dispatch(change('company', 'county', address[6]))
  }
  
  render() {
    const { current, charity, subsidiary } = this.state
    const { invalid, company: { companyDetails, isLoading }, addresses } = this.props
    const steps = [
      {
        title: 'Address',
        content:<BusinessForm
          charity={charity}
          subsidiary={subsidiary}
          charityStatusChange={this.charityStatusChange}
          subsidiaryStatusChange={this.subsidiaryStatusChange}
          addresses={addresses}
          findAddresses={this.findAddresses}
          addressSelectHandler={this.addressSelectHandler}
        />,
      },
      {
        title: 'Basic Information',
        content: <BasicForm/>,
      },
      
      {
        title: 'Done',
        content: <Response
          isLoading={isLoading}
          code={companyDetails.code}
          response={companyDetails.response}
        />,
      },
    ]    
    return (
      <div>
        <header>
          <div className='signup-headers'>
            <div className='header-body'>
                <Row>
                  <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                    <p className='logo'>LOGO</p>
                  </Col>
                  <Col xs={15} sm={16} md={16} lg={16} xl={16}></Col>
                  <Col xs={5} sm={4} md={4} lg={4} xl={4}>
                    <Button ghost onClick={this.logout}>Logout</Button>
                  </Col>
                </Row>
              </div>
          </div>
        </header>
          <div className='signup-wrapper'>
              <div className='inner-wrapper'>
                <Steps current={current}>
                    { 
                      map(item => (
                        <Step key={item.title} title={item.title} />
                      ), steps)
                    }
                </Steps>
                <div className="steps-content">
                  <div>
                    {steps[current].content}
                  </div>
                </div>
                <div className="steps-action">
                {
                  current < steps.length - 1 && current !== 1 && (
                    <Button className="next-button" type="primary" size="large" onClick={() => this.next()}>
                      Next <Icon type="right" />
                    </Button>
                  )
                }
                {
                  current === 1 && (
                    <>
                      <Button size="large" type="primary" className="prev-button" onClick={() => this.prev()}>
                        <Icon type="left" /> Previous
                      </Button>
                      <Button
                        className="next-button success-btn"
                        type="primary"
                        size="large"
                        onClick={this.saveDetails}
                        disabled={invalid}
                      >
                        <Icon type="check" />  Save
                      </Button>
                    </>
                  )
                }
              </div>
            </div>
        </div>
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