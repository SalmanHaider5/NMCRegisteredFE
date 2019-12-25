import React, { Component } from 'react';

import { TITLE, PROFILE_NAME, PROFILE_LINK } from '../../constants'

import './home.css'

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