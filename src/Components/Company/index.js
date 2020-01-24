import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { getCompanyFormValues } from '../../utils/helpers'
import { Steps, Button, message, Row, Col } from 'antd';
import BasicForm from './BasicForm'
import './index.css'

const { Step } = Steps;
const steps = [
    {
      title: 'Basic Information',
      content: <BasicForm/>,
    },
    {
      title: 'Address',
      content: 'Second-content',
    },
    {
      title: 'Payment Method',
      content: 'Third-content',
    },
    {
      title: 'Done',
      content: 'Last-content',
    },
  ];

class Company extends Component {
  constructor(props) {
      super(props);
      this.state = {
        current: 0,
      };
    }
  
    next() {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  
    prev() {
      const current = this.state.current - 1;
      this.setState({ current });
    }
  
    render() {
      const { current } = this.state;
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
                        {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content"><div>{steps[current].content}
                    <p>let me check its working or not</p></div></div>
                    <div className="steps-action">
                {current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                    Next
                </Button>
                )}
                {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Varification link has been sent your Email ')}>
                    Done
                </Button>
                )}
                {current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                </Button>
                )}
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