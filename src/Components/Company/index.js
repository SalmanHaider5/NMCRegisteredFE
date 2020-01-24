import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { map } from 'ramda'
import { Steps, Button, message, Row, Col, Icon } from 'antd'
import { getCompanyFormValues } from '../../utils/helpers'
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
      subsidiary: false
    };
  }
  
  next() {
    const { current } = this.state
    this.setState({ current: current + 1 })
  }

  prev() {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }

  charityStatusChange = () => {
    const { charity } = this.state
    this.setState({ charity: !charity })
  }

  subsidiaryStatusChange = () => {
    const { subsidiary } = this.state
    this.setState({ subsidiary: !subsidiary })
  }
  
  render() {
    const { current, charity, subsidiary } = this.state
    const steps = [
      {
        title: 'Basic Information',
        content: <BasicForm/>,
      },
      {
        title: 'Address',
        content:<BusinessForm
                  charity={charity}
                  subsidiary={subsidiary}
                  charityStatusChange={this.charityStatusChange}
                  subsidiaryStatusChange={this.subsidiaryStatusChange}
                />,
      },
      {
        title: 'Payment Method',
        content: 'Third-content',
      },
      {
        title: 'Done',
        content: 'Last-content',
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
                    <Button ghost>Logout</Button>
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
                  current < steps.length - 1 && (
                    <Button className="next-button" type="primary" size="large" onClick={() => this.next()}>
                      Next <Icon type="right" />
                    </Button>
                  )
                }
                {
                  current === steps.length - 1 && (
                    <Button size="large" className="next-button" type="primary" onClick={() => message.success('Varification link has been sent your Email ')}>
                      <Icon type="save" /> Done
                    </Button>
                  )
                }
                {
                  current > 0 && (
                    <Button size="large" className="prev-button" onClick={() => this.prev()}>
                      <Icon type="left" /> Previous
                    </Button>
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
    formValues: getFormValues('company')(state)
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'company',
    initialValues: getCompanyFormValues()
  })(Company)
)