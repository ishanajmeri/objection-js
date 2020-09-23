import React from 'react';
import {
  Link,
  fade,
  makeStyles,
  Menu,
  AppBar,
  MenuItem,
  Toolbar,
  IconButton,
  Badge,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Theme } from '../../theme';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SettingsIcon from '@material-ui/icons/Settings';
const useStyles = makeStyles((theme) => ({
  Appbar: {
    background: Theme.boxColor,
  },
  AppbarAll: {
    backgroundColor: 'rgb(0,0,0,0)',
  },
  grow: {
    flexGrow: 1,
    // width:'100vw'
  },
  menuButton: {
    padding: 0,
  },
  title: {
    display: 'block',
    color: '#fff',
    fontSize: 'x-large',
    letterSpacing: '1px',
    fontFamily:
      'Wallman, -apple-system, BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans- serif,Apple Color Emoji,Segoe UI Emoji, Segoe UI Symbol',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    borderRadius: '50%',
    padding: 9,
    background: Theme.boxColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
  },
  menu: {
    background: Theme.boxColor,
    right: 16,
    left: 'auto !important',
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      //   target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
      className: trigger ? classes.Appbar : classes.AppbarAll,
    });
  }

  const handleProfileMenuOpen = (event) => {
    if (props.auth === true) {
      setAnchorEl(event.currentTarget);
    }
    if (props.auth === false) {
      history.push('/login');
    }
    if (props.auth === null) {
      setLoading(true);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const logout = () => {
    props.out();
    handleMenuClose();
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      classes={{ paper: classes.menu }}
      id={menuId}
      keepMounted
      anchorPosition={{ left: 100, top: 16 }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logout}>Logout</MenuItem>
      <MenuItem
        onClick={() => {
          history.push('/dashboard');
        }}
      >
        Dashboard
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      classes={{ paper: classes.menu }}
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      anchorPosition={{ left: 100, top: 16 }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon style={{ color: '#fff' }} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircle style={{ color: '#fff' }} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem>
        <IconButton color="inherit">
          <StarBorderIcon style={{ color: '#fff' }} />
        </IconButton>
        <p>Star</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <SettingsIcon style={{ color: '#fff' }} />
        </IconButton>
        <p>settings</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton
              disableRipple
              onClick={() => {
                history.push('/');
              }}
              edge="start"
              className={classes.menuButton}
              color="inherit"
            >
              <SvgIcon style={{ height: 50, width: 50 }}>
                <svg viewBox="0 0 899.303 899.303">
                  <g
                    id="Group_8313"
                    data-name="Group 8313"
                    transform="translate(14789.544 21143.008)"
                  >
                    <rect
                      id="Rectangle_1070"
                      data-name="Rectangle 1070"
                      width="636"
                      height="636"
                      rx="145"
                      transform="matrix(0.695, 0.719, -0.719, 0.695, -14332.044, -21143.008)"
                      fill="#fff"
                    />
                    <g
                      id="Final_QRIOCTBOX-02"
                      data-name="Final QRIOCTBOX-02"
                      transform="translate(-14981.58 -22057.178)"
                    >
                      <g id="Layer_1" data-name="Layer 1">
                        <path
                          id="Path_3500"
                          data-name="Path 3500"
                          d="M413,1361.67c0-127.21,103.12-230.33,230.32-230.33a230.338,230.338,0,0,1,205.512,126.243c.538-8.653.848-17.323.848-26.043a396.531,396.531,0,0,0-12.8-100.16l-97.92-97.92a137.42,137.42,0,0,0-194.35,0L311.83,1266.18a137.44,137.44,0,0,0,0,194.36l165.91,165.9a393.349,393.349,0,0,0,142.06-35.63C503.63,1579,413,1480.94,413,1361.67Z"
                          fill="#8d3ddc"
                          opacity="0.79"
                        />
                        <path
                          id="Path_3501"
                          data-name="Path 3501"
                          d="M593.24,1438.45H695.52a128,128,0,0,0,5.58,37.46,128,128,0,1,0-103.87,5.22A231.651,231.651,0,0,1,593.24,1438.45Z"
                          fill="#8859a4"
                          opacity="0.79"
                        />
                        <path
                          id="Path_3502"
                          data-name="Path 3502"
                          d="M643.3,1131.34c127.21,0,230.33,103.12,230.33,230.33a233.086,233.086,0,0,1-2.24,32.12,331.641,331.641,0,0,0,137.66-58.41,136.84,136.84,0,0,0-37.35-69.2L738.94,1033.43a137.42,137.42,0,0,0-194.35,0l-63.19,63.19a331.31,331.31,0,0,0,19.12,84.32,229.29,229.29,0,0,1,142.78-49.6Z"
                          fill="#64b4d2"
                          opacity="0.57"
                        />
                        <path
                          id="Path_3503"
                          data-name="Path 3503"
                          d="M643.3,1233.62a127.6,127.6,0,0,0-91.52,38.54,333,333,0,0,0,215,123.44,128,128,0,0,0-123.47-162Z"
                          fill="#ba3a94"
                          opacity="0.79"
                        />
                        <path
                          id="Path_3504"
                          data-name="Path 3504"
                          d="M593.24,1438.45H695.52a128,128,0,0,0,5.58,37.46,128,128,0,1,0-103.87,5.22A231.651,231.651,0,0,1,593.24,1438.45Z"
                          fill="#8167f2"
                          opacity="0.79"
                        />
                        <path
                          id="Path_3505"
                          data-name="Path 3505"
                          d="M971.7,1266.18l-140-140h-1.1a376.747,376.747,0,0,0-113.27,17.33c90.89,30.83,156.31,116.87,156.31,218.18a230.13,230.13,0,0,1-104.28,192.79,128.11,128.11,0,0,0,108.4,0l94-93.94A137.45,137.45,0,0,0,971.7,1266.18Z"
                          fill="#8d3ddc"
                          opacity="0.69"
                        />
                        <path
                          id="Path_3506"
                          data-name="Path 3506"
                          d="M769.78,1662.45a230.18,230.18,0,0,1-118-70.63c-2.82.1-5.64.17-8.49.17a230,230,0,0,1-189.46-99.34c-.09,3.46-.15,6.93-.15,10.41a376.528,376.528,0,0,0,19,118.3l71.93,71.93a137.42,137.42,0,0,0,194.35,0Z"
                          fill="#8d3ddc"
                          opacity="0.79"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </SvgIcon>
            </IconButton>
            <Link
              to="/"
              underline="none"
              component={RouterLink}
              className={classes.title}
              variant="h6"
              noWrap
            >
              RIOCTY BOX
            </Link>
            <div className={classes.grow} />
            {props.path !== '/login' && (
              <>
                <div className={classes.sectionDesktop}>
                  <IconButton color="inherit">
                    <div className={classes.button}>
                      <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </div>
                  </IconButton>
                  <IconButton
                    disabled={props.auth === null}
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <div className={classes.button}>
                      <AccountCircle />
                    </div>
                  </IconButton>
                  <IconButton color="inherit">
                    <div className={classes.button}>
                      <StarBorderIcon />
                    </div>
                  </IconButton>

                  <IconButton color="inherit">
                    <div className={classes.button}>
                      <SettingsIcon />
                    </div>
                  </IconButton>
                  {props.auth === true && (
                    <IconButton
                      // onClick={() => history.push('/qbook')}
                      color="inherit"
                    >
                      <div className={classes.button}>
                        <SvgIcon></SvgIcon>
                      </div>
                    </IconButton>
                  )}
                </div>

                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
