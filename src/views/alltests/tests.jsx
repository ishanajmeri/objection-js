import React from 'react';
import { pxToVw, Theme } from '../../theme';
import {
  Grid,
  Toolbar,
  makeStyles,
  Fab,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from '@material-ui/core';
import CardComponent from '../components/cardEmbossed';
// import { useHistory } from 'react-router-dom';

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
    padding: '4% 3% 0 3%',
  },
}));
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const RenderQuestions = ({ number, question, answers, correct_answer }) => {
  const sty = styles();
  const [value, setValue] = React.useState(null);
  const [userAnswers, setuserAnswers] = React.useState([]);
  const [buttons, setbuttons] = React.useState([]);
  React.useEffect(() => {
    const buttons = [];
    const userAnswers = [];
    for (var i = 0; i < 20; i++) {
      buttons.push({ index: i + 1, value: '', color: 'default' });
      userAnswers.push({ index: i + 1, an: 'default' });
    }
    setuserAnswers(userAnswers);
    setbuttons(buttons);
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
    // console.log(event.target);
    const one = { index: question, an: event.target.value };
    const foundIndex = userAnswers.findIndex((item) => item.index === number);
    userAnswers[foundIndex] = one;
    // userAnswers[number].an = event.target.value;
    // buttons[question].color = 'primary';
  };
  console.log(userAnswers);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid container item sm={6} xs={12} style={{ padding: `40px 0 0 0` }}>
        <Grid
          container
          item
          sm={10}
          // key={index}
          className={sty.item}
          wrap="nowrap"
          spacing={2}
        >
          <CardComponent>
            <div style={{ padding: '10%', color: '#fff' }}>
              <Typography
                variant="h6"
                style={{ color: '#fff', textAlign: 'center' }}
                className={sty.heading}
              >
                Q {number}] {question}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ lineHeight: 2, paddingTop: 22 }}
              >
                <RadioGroup
                  aria-label="gender"
                  name="options"
                  value={value}
                  onChange={handleChange}
                >
                  {answers.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    );
                  })}
                </RadioGroup>
              </Typography>
            </div>
          </CardComponent>
        </Grid>
      </Grid>
      <Grid container item sm={6} xs={12} style={{ padding: `40px 0 0 0` }}>
        <Grid
          container
          item
          sm={10}
          // key={index}
          className={sty.item}
          wrap="nowrap"
          spacing={2}
        >
          <div style={{ padding: '10%', color: '#fff' }}>
            <Grid container>
              {buttons.map((item, index) => {
                return (
                  <Grid key={index} item style={{ padding: '5px' }}>
                    <Button
                      variant="outlined"
                      color={item.color}
                      style={{ borderRadius: '50px' }}
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
    </Grid>
  );
};
const Tests = (props) => {
  const [questions, setquestions] = React.useState(null);
  const [number, setnumber] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState([]);
  React.useEffect(() => {
    try {
      fetch(
        'https://opentdb.com/api.php?amount=20&category=18&difficulty=easy'
      ).then((res) =>
        res.json().then((data) => {
          // console.log(data.results);
          setquestions(data.results);
        })
      );
    } catch {}
  }, []);
  const sty = styles();
  // console.log(props.location.state.name);
  const handleNext = () => {
    const nextQ = number + 1;
    setnumber(nextQ);
  };
  const handleBefore = () => {
    const nextQ = number - 1;
    setnumber(nextQ);
  };
  console.log(userAnswers);
  return (
    <div className={sty.root}>
      <Toolbar style={{ background: Theme.boxColor }} />
      {questions !== null && (
        <>
          <RenderQuestions
            number={number + 1}
            question={questions[number].question}
            answers={shuffleArray([
              ...questions[number].incorrect_answers,
              questions[number].correct_answer,
            ])}
            correct_answer={questions[number].correct_answer}
            // userAnswers={userAnswers}
          />
        </>
      )}

      <Grid
        container
        direction="row"
        justify="flex-end"
        // alignItems="center"
        style={{ paddingBottom: 22, paddingTop: 12, paddingRight: 32 }}
      >
        {number !== 0 && (
          <Grid
            item
            style={{
              padding: `0px ${pxToVw(15)} 20px`,
            }}
          >
            <Fab
              variant="extended"
              onClick={handleBefore}
              classes={{ label: sty.label }}
              className={sty.released}
            >
              Before
            </Fab>
          </Grid>
        )}
        {number !== 19 && (
          <Grid
            item
            style={{
              padding: `0px ${pxToVw(15)} 20px`,
            }}
          >
            <Fab
              variant="extended"
              onClick={handleNext}
              classes={{ label: sty.label }}
              className={sty.released}
            >
              Next
            </Fab>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Tests;
