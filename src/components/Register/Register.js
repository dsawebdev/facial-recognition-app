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
  state = {
    name: '',
    email: '',
    password: ''
  };

  handleChange = ({email, password, name}) => event => {
    this.setState({
      [name]: event.target.value,
      [email]: event.target.value,
      [password]: event.target.value
    });
  };

  render() {
    const { classes, onRouteChange } = this.props;

    return (
      <article className="center br3 pa3 pa4-ns mv3 mw6 ba b--black-12 shadow-5">
        <form className={classes.container} noValidate autoComplete="off">
          <legend className="f1 fw6 ph0 mh0">Register</legend>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
              variant="outlined"
            />
            <Button 
              variant="outlined" 
              className={classes.button} 
              type="submit"
              onClick={() =>onRouteChange('home')}>
              Sign In
            </Button>
        </form>
      </article>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register)