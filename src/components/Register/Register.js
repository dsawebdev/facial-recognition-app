import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  textField2: {
    paddingTop: 10,
    marginLeft: theme.spacing.unit ,
    marginRight: theme.spacing.unit,
    flexBasis: 400,
  },
  dense: {
    marginTop: 16,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
});


class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }
  
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadNewUser(user)
          this.props.onRouteChange('home')
        }
      })
  }

  render() {
    const { classes} = this.props;

    return (
      <article className="center br3 pa3 pa4-ns mv3 mw6 ba b--black-12 shadow-5">
        <div className={classes.container} noValidate autoComplete="off">
          <legend className="f1 fw6 ph0 mh0">Register</legend>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.onNameChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.onEmailChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-password"
              label="Password"
              className={classes.textField2}
              value={this.state.password}
              type={this.state.showPassword ? 'text' : 'password'}
              onChange={this.onPasswordChange}
              margin="normal"
              variant="outlined"
            />
            <Button 
              variant="outlined" 
              className={classes.button} 
              type="submit"
              onClick={this.onSubmitRegister}>
              Register
            </Button>
        </div>
      </article>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register)