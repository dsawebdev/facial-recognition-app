import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit ,
    marginRight: theme.spacing.unit,
    flexBasis: 400,
  },
  textField2: {
    paddingTop: 10,
    marginLeft: theme.spacing.unit ,
    marginRight: theme.spacing.unit,
    flexBasis: 400,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: '',
      showPassword: false
    }
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://murmuring-escarpment-92881.herokuapp.com:3000/signIn', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
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
    const { classes, onRouteChange } = this.props;

    return (
      <article className="center br3 pa3 pa4-ns mv3 mw6 ba b--black-12 shadow-5">
        <div className={classes.container} noValidate autoComplete="off">
          <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <TextField
              id="outlined-name"
              label="Email"
              className={classes.textField}
              value={this.state.signInEmail}
              onChange={this.onEmailChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name-1"
              label="Password"
              className={classes.textField2}
              value={this.state.signInPassword}
              type={this.state.showPassword ? 'text' : 'password'}
              onChange={this.onPasswordChange}
              margin="normal"
              variant="outlined"
            />
            <Button 
              variant="outlined" 
              className={classes.button} 
              type="submit"
              onClick={this.onSubmitSignIn}>
              Sign In
            </Button>
            <Tooltip 
              TransitionComponent={Fade} 
              TransitionProps={{ timeout: 600 }} 
              title="New User">
              <Button onClick={() =>onRouteChange('register')}>Register</Button>
            </Tooltip>
        </div>
      </article>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn)