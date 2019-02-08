import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, Typography, IconButton, ClickAwayListener, Tooltip, Zoom } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightButton from '@material-ui/icons/ChevronRight'
import DirectionsSubway from '@material-ui/icons/DirectionsRailway'
import { Link } from 'react-router-dom'



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: window.height,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  },
  appBarShift: {
    width: `100%`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 0,
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 0px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  rightToolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0px 8px',
    width: '100%',
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class DrawerLayout extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickAway = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;

    const drawer = (
      <Drawer anchor="right" open={this.state.open} onClose={this.handleDrawerClose}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.handleDrawerClose}
          onKeyDown={this.handleDrawerClose}
        >
          {this.props.menuContent}
        </div>
      </Drawer>
    );

    return (

      <div className={classes.root}>

        <div className={classes.appFrame}>
          <AppBar>
            <Toolbar>
              <Tooltip TransitionComponent={Zoom} title="نقشه">
                <Link to={'/Map'} style={{ textDecoration: 'none', color: '#FFF' }}>
                  <IconButton color="inherit" className={classNames(classes.menuButton)}>
                    <DirectionsSubway />
                  </IconButton>
                </Link>
              </Tooltip>
              <div className={classes.rightToolbar}>
                <Typography variant="headline" color="inherit" style={{ fontFamily: 'B Titr' }}>
                  {this.props.title}
                </Typography>

                {this.state.open ?
                  <IconButton color="inherit" onClick={this.handleDrawerClose} className={classNames(classes.menuButton)}>
                    <ChevronRightButton />
                  </IconButton>
                  :
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton)}
                  >
                    <MenuIcon />
                  </IconButton>
                }
              </div>
            </Toolbar>
          </AppBar>

          <main
            className={classNames(classes.content)}
          >
            <div className={classes.drawerHeader} />
            {this.props.mainContents}
          </main>

          <ClickAwayListener onClickAway={this.handleClickAway}>
            {drawer}
          </ClickAwayListener>

        </div>
      </div>

    );
  }
}

DrawerLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(DrawerLayout);