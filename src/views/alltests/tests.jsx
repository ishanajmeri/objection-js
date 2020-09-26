import React from 'react';
import { pxToVw, Theme } from '../../theme';
import {
  Grid,
  Toolbar,
  makeStyles,
  Fab,
  Typography,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import CardComponent from '../components/cardEmbossed';
import { useHistory } from 'react-router-dom';
import ReactCountdownClock from 'react-countdown-clock';
import RenderQuestions from './renderQuestions';

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
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const Tests = (props) => {
  const [questions, setquestions] = React.useState(null);
  const [number, setnumber] = React.useState(0);
  const [open, setopen] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState([]);
  const [end, setend] = React.useState(false);
  // const [correct, setcorrect] = React.useState(0);
  const history = useHistory();
  const [buttons, setbuttons] = React.useState([]);
  React.useEffect(() => {
    const buttons = [];
    for (var i = 0; i < 20; i++) {
      buttons.push({ index: i + 1, color: 'default' });
    }
    setbuttons(buttons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  const handleClose = () => {
    setopen(false);
  };
  const handleOpen = () => {
    setopen(false);
  };
  const handleExit = () => {
    history.push('/weeklytest');
  };
  const handleNext = () => {
    const nextQ = number + 1;
    setnumber(nextQ);
  };
  const handleBefore = () => {
    const nextQ = number - 1;
    setnumber(nextQ);
  };
  const handleClock = () => {
    console.log('object');
  };
  const handleSubmit = () => {
    var correct = 0;
    for (var i = 0; i < 20; i++) {
      if (userAnswers[i].an === questions[i].correct_answer) {
        correct = correct + 1;
        const onebutton = { index: i + 1, color: 'green' };
        buttons[i] = onebutton;
      } else {
        const onebutton = { index: i + 1, color: 'red' };
        buttons[i] = onebutton;
      }
    }
    const mark = (correct * 100) / 20;
    setend(true);
    history.push({
      pathname: '/testend',
      state: { correct, mark, questions, userAnswers, buttons },
    });
  };

  return (
    <div className={sty.root}>
      <Toolbar style={{ background: Theme.boxColor }} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        disableBackdropClick
        disableEscapeKeyDown
        PaperProps={{ style: { borderRadius: 70 } }}
      >
        <DialogContent style={{ padding: '0' }}>
          <div>
            <CardComponent
              style={{
                padding: '10%',
              }}
            >
              <Typography
                variant="h6"
                style={{ color: '#fff', textAlign: 'center' }}
                className={sty.heading}
              >
                Instruction
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ lineHeight: 2, paddingTop: 22 }}
              >
                1] Welcome to Online Exam for General Aptitude Exam
                <br />
                <br />
                2] Exam has Total 20 Question
                <br />
                <br />
                3] Total Time for Exam is 30 Minutes
                <br />
                <br />
                4] Negative Marking Exam : No
              </Typography>
              <Grid container justify="center">
                <Grid
                  container
                  justify="center"
                  item
                  style={{
                    padding: `10px ${pxToVw(15)} 20px`,
                  }}
                >
                  <Fab
                    variant="extended"
                    onClick={handleOpen}
                    classes={{ label: sty.label }}
                    className={sty.released}
                  >
                    Agree
                  </Fab>
                </Grid>
                <Grid
                  container
                  justify="center"
                  item
                  style={{
                    padding: `10px ${pxToVw(15)} 20px`,
                  }}
                >
                  <Fab
                    variant="extended"
                    onClick={handleExit}
                    classes={{ label: sty.label }}
                    className={sty.released}
                  >
                    Not-Agree
                  </Fab>
                </Grid>
              </Grid>
            </CardComponent>
          </div>
        </DialogContent>
      </Dialog>
      {questions !== null && !end && (
        <>
          <Grid container justify="flex-end" style={{ padding: '15px' }}>
            <CardComponent style={{ width: 70 }}>
              <ReactCountdownClock
                seconds={1800}
                color="#fff"
                alpha={0.9}
                size={70}
                onComplete={handleClock}
              />
            </CardComponent>
          </Grid>
          <RenderQuestions
            number={number + 1}
            question={questions[number].question}
            answers={shuffleArray([
              ...questions[number].incorrect_answers,
              questions[number].correct_answer,
            ])}
            correct_answer={questions[number].correct_answer}
            setnumber={setnumber}
            setUserAnswers={setUserAnswers}
          />

          <Grid
            container
            direction="row"
            justify="flex-end"
            // alignItems="center"
            style={{ paddingTop: 12, paddingRight: 32 }}
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
            {number === 19 && (
              <Grid
                item
                style={{
                  padding: `0px ${pxToVw(15)} 20px`,
                }}
              >
                <Fab
                  variant="extended"
                  onClick={handleSubmit}
                  classes={{ label: sty.label }}
                  className={sty.released}
                >
                  Submit Test
                </Fab>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            justify="flex-end"
            item
            style={{
              padding: `0px ${pxToVw(15)} 20px`,
            }}
          >
            <Fab
              variant="extended"
              onClick={handleSubmit}
              classes={{ label: sty.label }}
              className={sty.released}
            >
              End Test
            </Fab>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Tests;
