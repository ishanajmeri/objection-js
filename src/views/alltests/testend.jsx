import React from 'react';
import { pxToVw, Theme } from '../../theme';
import {
  Grid,
  Toolbar,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import CardComponent from '../components/cardEmbossed';
import { useHistory } from 'react-router-dom';
const styles = makeStyles((t) => ({
  root: {
    width: '100%',
    backgroundColor: Theme.backgroundColor,
    height: '100%',
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
  item: {
    padding: '0 0 0 40px',
  },
}));
const TestEnd = (props) => {
  const sty = styles();
  const [questions, setquestions] = React.useState(null);
  const [buttons, setbuttons] = React.useState([]);
  const [userAnswers, setUserAnswers] = React.useState([]);
  const [correct, setcorrect] = React.useState(0);
  const [marks, setmarks] = React.useState(0);

  const history = useHistory();
  React.useEffect(() => {
    console.log(props.location.state);

    const { state } = props.location;
    setquestions(state.questions);
    setbuttons(state.buttons);
    setUserAnswers(state.userAnswers);
    setcorrect(state.correct);
    setmarks(state.mark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuestion = (index, question, useranswer) => {
    history.push({
      pathname: `/question/${index}`,
      state: { question, useranswer },
    });
  };
  return (
    <div className={sty.root}>
      <Toolbar style={{ background: Theme.boxColor }} />

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ paddingTop: '12%' }}
      >
        <Grid item style={{ paddingLeft: '3%' }}>
          <CardComponent style={{ height: 'auto', width: 400 }}>
            <div style={{ padding: '10%', color: '#fff' }}>
              <Typography
                variant="h6"
                style={{ color: '#fff', textAlign: 'center' }}
                className={sty.heading}
              >
                Total correct answers are {correct}.
              </Typography>
            </div>
            <Grid item /* xs={12} sm={6} */>
              <div style={{ color: '#fff', paddingBottom: '7%' }}>
                <Typography
                  variant="h6"
                  style={{ color: '#fff', textAlign: 'center' }}
                  className={sty.heading2}
                >
                  Your percentage is {marks}%.
                </Typography>
              </div>
            </Grid>
          </CardComponent>
        </Grid>
        <Grid
          container
          item
          sm={10}
          className={sty.item}
          wrap="nowrap"
          spacing={2}
          style={{ width: 400 }}
        >
          <div style={{ padding: '10% 10% 10% 0', color: '#fff' }}>
            <Grid container justify="flex-end">
              {buttons.map((item, index) => {
                return (
                  <Grid key={index} item style={{ padding: '5px' }}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleQuestion(
                          item.index,
                          questions[index],
                          userAnswers[index]
                        )
                      }
                      style={{ borderRadius: '50px', background: item.color }}
                    >
                      {item.index}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestEnd;
