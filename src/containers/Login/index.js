import React, { Component } from 'react';
import { graphql } from 'react-apollo';
// import { connect } from 'react-redux';
import Login from '../../components/Login'
import loginMutation from '../../graphql/mutations/login.gql';

class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    // TODO: validate email

    this.props.handleLogin(email, password);
  }

  render() {
    return (
      <Login
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        {...this.state}
      />
    );
  }
}

const LoginWithMutation = graphql(loginMutation, {
  props: ({ ownProps, mutate }) => ({
    handleLogin: (email, password) => {
      mutate({ variables: { email: email, password: password } })
        .then(({ data: { login } }) => {
          console.log('Response OK')
          console.log(login);
          return Promise.resolve();
        })
        .catch((error) => {
          console.log(error);
          return Promise.reject();
        })
    },
  })
})(LoginContainer)

export default LoginWithMutation;
// export default connect()(LoginWithMutation);
