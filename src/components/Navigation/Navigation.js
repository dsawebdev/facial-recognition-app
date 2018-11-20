import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  bar: {
    background: 'linear-gradient(to right, #e5e5be, #003973)'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navigation(props) {
  const { classes, onRouteChange, isSignedIn } = props;
  //Todo FIGURE OUT THE STATE OF THIS...|
  if (isSignedIn === true) {
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            Facial Recognition App
            </Typography>
            <Button color="inherit" onClick={() => onRouteChange('signout')}>Sign Out</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            Facial Recognition App
            </Typography>
            <Button color="inherit" onClick={() => onRouteChange('signin')}>Sign In</Button>
            <Button color="inherit" onClick={() => onRouteChange('register')}>Register</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
