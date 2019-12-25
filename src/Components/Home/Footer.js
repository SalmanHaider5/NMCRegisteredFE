import React, { Component } from 'react';
import { Layout } from 'antd'

import { TITLE, PROFILE_NAME, PROFILE_LINK } from '../../constants'

import './home.css'

const { Footer } = Layout

class FooterComponent extends Component {
  render() {
    return (
      <div className="footer">
          {TITLE} created by <a href={PROFILE_LINK}>{PROFILE_NAME}</a>
      </div>
    );
  }
}

export default FooterComponent