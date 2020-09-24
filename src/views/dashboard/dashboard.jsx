import React from 'react';
import { pxToVw, pxToVh, Theme } from '../../theme';
import { Grid, Toolbar, makeStyles, Fab, Typography } from '@material-ui/core';
import CardComponent from '../components/cardEmbossed';
import { useHistory } from 'react-router-dom';

const styles = makeStyles((t) => ({
  root: {
    width: '100%',
    backgroundColor: Theme.backgroundColor,
    height: '100%',
  },
  screenDivisionStyles: {
    height: '100%',
    width: '100%',
  },
  scrollStyles: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  firstSlideParent: {
    minHeight: 600,
    [t.breakpoints.down('xs')]: {
      flexDirection: 'column',
      height: 'auto',
      minHeight: 500,
      paddingBottom: 40,
    },
  },
  firstSlideText: {
    minHeight: 500,
    width: pxToVw(868),
    alignSelf: 'center',
    flexDirection: 'column',
    [t.breakpoints.down('xs')]: {
      width: 'auto',
      minHeight: 'auto',
      flexDirection: 'row',
      // marginTop: 100,
      height: 'auto',
    },
  },
  search1st: {
    height: pxToVh(69),
    width: pxToVw(749),
    boxSizing: 'border-box',
    alignSelf: 'center',
    [t.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  secondSlideParent: {
    // minHeight: 600,
  },
  secondImg: {
    width: '100%',
    maxHeight: 500,
    [t.breakpoints.down('xs')]: {
      paddingBottom: '2%',
      height: '100vw',
      width: '75vw',
    },
  },
  baseStyle: {
    paddingLeft: pxToVw(20),
  },
  input: {
    padding: 0,
    margin: 0,
    height: '100%',
    '&::placeholder': {
      color: Theme.textColor.placeholder,
      fontFamily: 'Poppins',
      fontSize: pxToVw(22),
      fontWeight: 'light',
      opacity: '1',
      padding: 0,
      margin: 0,
      height: '100%',
    },
  },
  thirdSlideParent: {
    // minHeight: '90vh',
    width: '100%',
    background: Theme.boxColor,
    display: 'flex',
    [t.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  thirdText: {
    width: pxToVw(1011),
    padding: `0 ${pxToVw(170)}`,
    [t.breakpoints.down('xs')]: {
      width: '100%',
      padding: '3%',
    },
  },
  fourthSlideParent: {
    // padding: `0px ${pxToVw(47)}`,
    padding: '50px 0',
    [t.breakpoints.down('xs')]: { padding: '0' },
  },
  fifthSlideParent: {
    padding: 25,
    [t.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  fifthSlideParent2: {
    padding: 25,
    flexDirection: ' row-reverse',
    [t.breakpoints.down('xs')]: { flexDirection: 'column-reverse' },
  },
  sixthSlideParent: {
    height: pxToVh(1050),
    width: '100%',
    padding: `100px ${pxToVw(47)}`,
    boxSizing: 'border-box',
  },
  released: {
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
    // background: Theme.buttonColor.color1,
    background: Theme.boxColor,
  },
  label: {
    color: Theme.textColor.color2,
    // fontSize: pxToVw(22),
    // fontFamily: 'Poppins',
    fontWeight: 'thin',
  },
  pressed: {
    boxShadow: `inset 4px 3px 7px #C6CCE1 ,
inset -3px -4px 7px white`,
    background: Theme.buttonColor.color1,
  },
  searchField: {
    backgroundColor: Theme.backgroundColor,
  },
  heading: {
    color: Theme.textColor.color1,
    letterSpacing: pxToVw(0.9),
    lineHeight: 1.5,
    fontFamily: 'Poppins',
    fontWeight: 600,
    textAlign: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    [t.breakpoints.down('xs')]: {
      padding: '30px 10% 0',
      fontSize: 20,
    },
  },
  heading2: {
    color: Theme.textColor.color1,
    letterSpacing: pxToVw(0.9),
    lineHeight: 1.5,
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    [t.breakpoints.down('xs')]: {
      padding: '30px 5%',
      fontSize: 15,
      paddingBottom: 30,
    },
  },
  firstImg: {
    width: '100%',
    maxHeight: 500,
    [t.breakpoints.down('xs')]: {
      height: 'auto',
      width: '70vw',
    },
  },
  thirdImg: {
    width: '80%',
    maxHeight: 520,
    [t.breakpoints.down('xs')]: {
      height: '50vh',
      width: '75vw',
      paddingTop: 25,
      paddingRight: 45,
    },
  },
  fourthCard: {
    height: '90%',
    width: `${100 / 3.2}%`,
    [t.breakpoints.down('xs')]: {
      width: '100%',
      padding: '20px 0',
    },
  },
  successText: {
    color: Theme.textColor.heading,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 60,
    [t.breakpoints.down('xs')]: {
      paddingTop: 40,
      paddingBottom: 50,
    },
  },
  whyText: {
    color: Theme.textColor.heading,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '60px 0 30px',
    [t.breakpoints.down('xs')]: {
      paddingTop: 90,
      paddingBottom: 0,
    },
  },
  d3: {
    padding: '4% 3% 0 3%',
  },
}));

const Dashboard = () => {
  const sty = styles();
  const history = useHistory();
  const handleTest = (item) => {
    history.push(`/${item}`);
  };

  return (
    <div className={sty.root}>
      <Toolbar style={{ background: Theme.boxColor }} />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ padding: `40px ${pxToVw(150)} 100px` }}
      >
        <Grid item sm={6} className={sty.d3}>
          <CardComponent>
            <div style={{ padding: '15%', color: '#fff' }}>
              <Typography
                variant="h4"
                style={{ color: '#fff', textAlign: 'center' }}
                className={sty.heading}
              >
                Qriocty Merit test
              </Typography>
            </div>
            <Grid
              style={{
                padding: `0px ${pxToVw(15)} 20px`,
              }}
            >
              <Fab
                variant="extended"
                onClick={() => handleTest('merittest')}
                classes={{ label: sty.label }}
                className={sty.released}
              >
                Get Test
              </Fab>
            </Grid>
          </CardComponent>
        </Grid>
        <Grid item sm={6} className={sty.d3}>
          <CardComponent>
            <div style={{ padding: '15%', color: '#fff' }}>
              <Typography
                variant="h4"
                style={{ color: '#fff', textAlign: 'center' }}
                className={sty.heading}
              >
                Weekly Test
              </Typography>
            </div>
            <Grid
              style={{
                padding: `0px ${pxToVw(15)} 20px`,
              }}
            >
              <Fab
                variant="extended"
                onClick={() => handleTest('weeklytest')}
                classes={{ label: sty.label }}
                className={sty.released}
              >
                Get Test
              </Fab>
            </Grid>
          </CardComponent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
