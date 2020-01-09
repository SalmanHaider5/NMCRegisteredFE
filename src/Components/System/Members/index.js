import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues, reset } from 'redux-form'
import { Button, Icon, notification, List, Avatar } from 'antd'
import { TextField, MultilineTextField, FileInput } from '../../../utils/custom-components/'
import { isRequired, SERVER_URL } from '../../../constants'
import { getMembers, addMember, deleteMember } from '../../../actions'
import { getMembersInitialValues } from '../../../utils/helpers'

import '../settings.css'

class Members extends Component {
  
  componentWillReceiveProps(nextProps){
    if(this.props.settings.addMemberRequest !== nextProps.settings.addMemberRequest){
      if(!nextProps.settings.addMemberRequest){
        notification.success({
          message: 'Add Success',
          description: 'New member is successfully added',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
    if(this.props.settings.deleteMemberRequest !== nextProps.settings.deleteMemberRequest){
      if(!nextProps.settings.deleteMemberRequest){
        notification.success({
          message: 'Delete Success',
          description: 'Member is successfully deleted',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
  }
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getMembers())
  }
  addMembers = () => {
    const { formValues, dispatch } = this.props
    dispatch(addMember(formValues))
    dispatch(reset('members'))
  }
  deleteMembers = id => {
    const { dispatch } = this.props
    dispatch(deleteMember(id))
  }

  render() {
    const { invalid, settings: { members } } = this.props
    return (
      <div className="members-container">
        <div className="form">
          <div className="form-fields">
            <div className="field">
              <Field
                name="name"
                label="Name"
                component={TextField}
                hintText="Enter Member's Name"
                type="text"
                validate={[isRequired]}
              />
            </div>
            <div className="field">
              <Field
                name="email"
                label="Email"
                component={TextField}
                hintText="Enter Member's email"
                type="text"
              />
            </div>
          </div>
          <div className="form-fields">
            <div className="field">
              <Field
                name="phone"
                label="Phone"
                component={TextField}
                hintText="Enter Member's Phone"
                type="text"
              />
            </div>
          </div>
          <div className="form-feilds" style={{ display: 'inline-flex' }}>
            <div className="field">
              <Field
                name="img"
                component={FileInput}
                label="Attach an Image"
              />
            </div>
          </div>
          <div className="form-feilds" style={{ display: 'flex' }}>
            <div className="field">
              <Field
                name="address"
                label="Address"
                component={MultilineTextField}
                rows={4}
                rowsMax={7}
                placeholder="Enter Address..."
              />
            </div>
          </div>
          <div className="form-buttons">
            <Button type="primary" disabled={invalid} onClick={this.addMembers}>
              <Icon type="check" /> Save
            </Button>
          </div>
        </div>
        <div className="members-list">
          <List
            itemLayout="horizontal"
            dataSource={members}
            renderItem={member => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`${SERVER_URL}members/${member.img}`} />}
                  title={<span><h3>{member.name}</h3><h6>{member.email} | {member.phone}</h6></span>}
                  description={member.address}
                />
                <div>
                  <Icon type="delete" onClick={() => this.deleteMembers(member.id)} />
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('members')(state),
    settings: state.settings
  }
}

export default withRouter(connect(mapStateToProps)(
  reduxForm({
    form: 'members',
    initialValues: getMembersInitialValues()
  })(Members)
))