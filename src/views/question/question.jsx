import React from 'react';
import { pxToVw, Theme } from '../../theme';
import { Grid, Toolbar, makeStyles, Typography } from '@material-ui/core';
import CardComponent from '../components/cardEmbossed';

const styles = makeStyles((t) => ({
  root: {
    width: '100%',
    backgroundColor: Theme.backgroundColor,
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: t.spacing(0, 3),
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
    padding: '3% 3% 0 3%',
  },
}));

const Question = (props) => {
  const sty = styles();
  const [question, setquestion] = React.useState(null);
  const [correct, setcorrect] = React.useState(null);
  const [userAnswer, setUserAnswer] = React.useState(null);

  React.useEffect(() => {
    const { state } = props.location;
    console.log(props);
    setquestion(state.question.question);
    setcorrect(state.question.correct_answer);
    setUserAnswer(state.useranswer.an);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={sty.root}>
      <Toolbar style={{ background: Theme.boxColor }} />
      <Grid
        item
        sm={6}
        xs={12}
        className={sty.container}
        style={{ padding: `10px ${pxToVw(30)} 0` }}
      >
        <Grid
          container
          item
          // sm={10}
          // key={index}
          className={sty.item}
          wrap="nowrap"
          // spacing={2}
        >
          <CardComponent>
            <div style={{ padding: '7%', color: '#fff' }}>
              <Typography
                variant="h5"
                style={{ color: '#fff', textAlign: 'center' }}
                className={sty.heading}
              >
                Question {props.match.params.id}: {question}?
              </Typography>
            </div>
            <Grid container>
              <Grid item xs={12} sm={10}>
                <div style={{ color: '#fff', paddingBottom: '3%' }}>
                  <Typography
                    variant="h6"
                    style={{ color: '#fff', textAlign: 'center' }}
                    className={sty.heading2}
                  >
                    Correct Answer: {correct}.
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={10}>
                <div style={{ color: '#fff', paddingBottom: '3%' }}>
                  <Typography
                    variant="h6"
                    style={{ color: '#fff', textAlign: 'center' }}
                    className={sty.heading2}
                  >
                    Your Answer: {userAnswer}.
                  </Typography>
                </div>
              </Grid>
            </Grid>
            {/* <Grid
              container
              item
              xs={12}
              sm={6}
              justify="flex-end"
              style={{ padding: '15px' }}
            >
              <Fab
                variant="extended"
                onClick={() => handleTest(item.name)}
                classes={{ label: sty.label }}
                className={sty.released}
              >
                Take Test
              </Fab>
            </Grid> */}
          </CardComponent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Question;
