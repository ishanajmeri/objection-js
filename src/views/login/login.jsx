import React from 'react';
import { pxToVw, Theme } from '../../theme';
import {
  Grid,
  Input,
  Toolbar,
  makeStyles,
  Fab,
  Link,
  CircularProgress,
} from '@material-ui/core';
import Person from '@material-ui/icons/PersonRounded';
import CardDepth from '../components/cardDepth';
import CardComponent from '../components/cardEmbossed';
import { useHistory } from 'react-router-dom';

const styles = makeStyles((t) => ({
  root: {
    height: `calc(100vh - 65px)`,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    [t.breakpoints.down('xs')]: {
      // flexDirection:'row',
    },
  },
  baseStyle: {
    borderRadius: '50%',
  },
  boxStyle: {
    borderRadius: '0%',
  },
  input: {
    paddingLeft: 12,
    margin: 0,
    height: '100%',
    color: Theme.textColor.placeholder,
    fontWeight: 'bold',
    '&::placeholder': {
      color: Theme.textColor.placeholder,
      // fontFamily: 'Poppins',
      fontSize: 15,
      opacity: '.6',
      // paddingLeft: 12,
      margin: 0,
      height: '100%',
    },
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  released: {
    boxShadow: '10px 10px 14px 1px rgba(00,00,00,0.2)',
    background: Theme.buttonColor.color1,
  },
  login: {
    height: 400,
    width: pxToVw(600),
    [t.breakpoints.down('xs')]: {
      height: 400,
      width: 'auto',
      padding: 12,
    },
  },
  logInput: {
    width: pxToVw(464),
    minWidth: 200,
    [t.breakpoints.down('xs')]: {
      minWidth: '70vw',
    },
  },
  inputArea: {
    height: `30%`,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    background: Theme.boxColor,
    marginBottom: 12,
    width: '100%',
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
  },
  buttonLabel: {
    color: '#fff',
    textTransform: 'uppercase',
  },
}));
const Login = () => {
  const [state, setState] = React.useState({ userEmail: '', password: '' });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  const sty = styles();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    setLoading(true);
    if (
      state.userEmail === 'ishan@ishan.com' &&
      state.password === 'password'
    ) {
      history.push('/dashboard');
    }
  };
  return (
    <>
      <Toolbar style={{ background: Theme.boxColor }} />
      <Grid container className={sty.root}>
        <Grid item container justify="center" xs={12} sm={6}>
          <div className={sty.login}>
            <CardComponent
              style={{
                paddingLeft: '10%',
                paddingRight: '10%',
                color: '#fff',
              }}
            >
              <div
                style={{
                  paddingTop: '6%',

                  height: 54,
                  width: 54,
                }}
              >
                <CardComponent
                  children={
                    <div
                      style={{
                        height: '88%',
                        width: '88%',
                      }}
                    >
                      <CardDepth
                        children={
                          <Person
                            style={{
                              color: '#8d3ddc',
                              height: 44,
                              width: 44,
                            }}
                          />
                        }
                      />
                    </div>
                  }
                />
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
                <div className={sty.inputArea}>
                  <Grid container justify="center" className={sty.logInput}>
                    <CardDepth>
                      <Input
                        id="userEmail"
                        required
                        value={state.userEmail}
                        // onBlur={checkInput}
                        disableUnderline
                        onChange={handleChange}
                        fullWidth
                        autoComplete="off"
                        placeholder="E-mail"
                        classes={{ input: sty.input }}
                      ></Input>
                    </CardDepth>
                  </Grid>
                  <Grid container justify="center" className={sty.logInput}>
                    <CardDepth>
                      <Input
                        id="password"
                        required
                        value={state.password}
                        onChange={handleChange}
                        disableUnderline
                        fullWidth
                        type="password"
                        autoComplete="off"
                        placeholder="Password"
                        classes={{ input: sty.input }}
                      ></Input>
                    </CardDepth>
                  </Grid>
                </div>
                <Grid
                  container
                  alignItems="center"
                  style={{ flexDirection: 'column', color: '#fff' }}
                  justify="center"
                  xs={12}
                >
                  <Grid
                    className={sty.res}
                    justify="center"
                    alignItems="center"
                    container
                  >
                    <Fab
                      variant="extended"
                      type="submit"
                      classes={{ label: sty.buttonLabel }}
                      className={sty.button}
                    >
                      login
                      {loading && <CircularProgress />}
                    </Fab>
                  </Grid>
                </Grid>

                <Link
                  to="/signup"
                  // component={RouterLink}
                  color="inherit"
                >
                  New User! Create account here.
                </Link>
                <Link
                  to="/forgetpass"
                  /* component={RouterLink} */ color="inherit"
                >
                  Forget Password
                </Link>
              </form>
            </CardComponent>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
