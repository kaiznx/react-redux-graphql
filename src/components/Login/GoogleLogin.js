import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.state = {
      disabled: true,
    };
  }
  componentDidMount() {
    const { clientId, cookiePolicy, loginHint, hostedDomain, autoLoad, isSignedIn, fetchBasicProfile, redirectUri, discoveryDocs, onFailure, uxMode } = this.props;
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/client:platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: clientId,
        cookiepolicy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        discoveryDocs,
        ux_mode: uxMode,
        redirect_uri: redirectUri,
      };
      window.gapi.load('auth2', () => {
        this.setState({
          disabled: false,
        });
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            (res) => {
              if (isSignedIn && res.isSignedIn.get()) {
                this._handleSigninSuccess(res.currentUser.get());
              }
            },
            err => onFailure(err)
          );
        }
        if (autoLoad) {
          this.signIn();
        }
      });
    });
  }
  signIn(e) {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const { redirectUri, onSuccess, onRequest, fetchBasicProfile, onFailure, prompt, scope, responseType } = this.props;
      const options = {
        response_type: responseType,
        redirect_uri: redirectUri,
        fetch_basic_profile: fetchBasicProfile,
        prompt,
        scope,
      };
      onRequest();
      if (responseType === 'code') {
        auth2.grantOfflineAccess(options)
          .then(
            res => onSuccess(res),
            err => onFailure(err)
          );
      } else {
        auth2.signIn(options)
          .then(
            res => this._handleSigninSuccess(res),
            err => onFailure(err)
          );
      }
    }
  }
  _handleSigninSuccess(res) {
    /*
      offer renamed response keys to names that match use
    */
    const basicProfile = res.getBasicProfile();
    const authResponse = res.getAuthResponse();
    res.googleId = basicProfile.getId();
    res.tokenObj = authResponse;
    res.tokenId = authResponse.id_token;
    res.accessToken = authResponse.access_token;
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName(),
    };
    this.props.onSuccess(res);
  }

  render() {
    return (
      <a className="fa-stack fa-lg"
         onClick={this.signIn}
      >
        <i className="fa fa-circle fa-stack-2x"></i>
        <i className="fa fa-google fa-stack-1x fa-inverse"></i>
      </a>
    );
  }
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  onRequest: PropTypes.func,
  scope: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  responseType: PropTypes.string,
  uxMode: PropTypes.string,
  isSignedIn: PropTypes.bool,
};

GoogleLogin.defaultProps = {
  scope: 'profile email',
  responseType: 'permission',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  onRequest: () => {},
};

export default GoogleLogin;
