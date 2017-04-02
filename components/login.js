import React from 'react';
import styles from './login.scss';
import Field from './field';
import $ from 'jquery';

class Login extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      modalContent: 'login',
      modalVisibility: false,
      error: '',
      login: {
        name: '',
        email: '',
        password: ''
      }
    }

    this.updateField = this.updateField.bind(this);
    this.login = this.login.bind(this);
	}

  render(){
    return (
      <div>
        <button onClick={ () => this.toggleModalWindow('signup') }>Sign up</button>
        <button onClick={ () => this.toggleModalWindow('login') }>Log in</button>

        <div className={ this.state.modalVisibility ? 'modal-window visible' : 'modal-window'}>
          { this.state.modalContent == 'signup' ?
            <Field label="Name" name="name" value={ this.state.login.name } onChange={ this.updateField } /> : null
          }
          <Field label="E-mail" name="email" value={ this.state.login.email } onChange={ this.updateField } />
          <Field label="Password" type="password" name="password" value={ this.state.login.password } onChange={ this.updateField } />

          { this.state.error ? <div>{ this.state.error }</div> : null }

          <button onClick={ this.login }>{ this.state.modalContent === 'login' ? 'Login' : 'Sign up' }</button>
        </div>
      </div>
    );
  }

  toggleModalWindow(mode) {
    this.setState({
      modalContent: mode,
      modalVisibility: !this.state.modalVisibility
    });
  }

  login() {
    let data = this.state.login;
    let url;

    if (this.state.modalContent == 'login') {
      url = "/api/login";
    } else {
      url = "/api/signup";
    }

    $.ajax({
      method: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: (user) => {
        this.props.onLogin(user);
      },
      error: (err) => {
        this.setState({ error: "We couldn't log you in with those credentials." });
      }
    })
  }

  updateField(evt) {
    var login = this.state.login;
    login[evt.target.name] = evt.target.value;
    this.setState({login: login});
  }
}

export default Login;