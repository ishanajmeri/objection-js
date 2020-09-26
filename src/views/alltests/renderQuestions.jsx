import React from 'react';
import { pxToVw, Theme } from '../../theme';
import {
  Grid,
  makeStyles,
  Fab,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from '@material-ui/core';
import CardComponent from '../components/cardEmbossed';

const styles = makeStyles((t) => ({
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
const RenderQuestions = ({
  number,
  question,
  answers,
  setnumber,
  setUserAnswers,
}) => {
  const sty = styles();
  const [value, setValue] = React.useState(null);
  const [userAnswers, setuserAnswers] = React.useState([]);
  const [buttons, setbuttons] = React.useState([]);
  React.useEffect(() => {
    const buttons = [];
    const userAnswers = [];
    for (var i = 0; i < 20; i++) {
      buttons.push({ index: i + 1, color: 'default' });
      userAnswers.push({ index: i + 1, an: 'default' });
    }
    setuserAnswers(userAnswers);
    setbuttons(buttons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleReview = (item) => {
    const buttonColor = { index: item, color: '#FFFF00' };
    const foundIndex = userAnswers.findIndex((item) => item.index === number);
    buttons[foundIndex] = buttonColor;
    // setValue(userAnswers[item - 1].an);
    // setnumber(item - 1);
    // console.log(buttons);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    // console.log(event.target);
    const user = { index: number, an: event.target.value };
    const buttonColor = { index: number, color: 'primary' };
    const foundIndex = userAnswers.findIndex((item) => item.index === number);
    userAnswers[foundIndex] = user;
    buttons[foundIndex] = buttonColor;
    setUserAnswers(userAnswers);
  };
  const handleChangeQuestion = (index) => {
    setValue(userAnswers[index].an);
    setnumber(index);
  };
  // console.log(userAnswers);
  // console.log(value);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid
        container
        item
        sm={6}
        xs={8}
        xl={8}
        // style={{ padding: `40px 0 0 0` }}
      >
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
      <Grid
        container
        item
        sm={6}
        xs={4}
        xl={4}
        // style={{ padding: `40px 0 0 0` }}
      >
        <Grid
          container
          item
          sm={10}
          className={sty.item}
          wrap="nowrap"
          spacing={2}
        >
          <div style={{ padding: '10%', color: '#fff' }}>
            <Grid container justify="flex-end">
              {buttons.map((item, index) => {
                console.log(buttons);
                return (
                  <Grid key={index} item style={{ padding: '5px' }}>
                    <Button
                      variant="contained"
                      onClick={() => handleChangeQuestion(index)}
                      color={item.color}
                      style={{
                        borderRadius: '50px',
                        background: item.color,
                      }}
                    >
                      {item.index}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
        <Grid
          item
          style={{
            padding: `0px ${pxToVw(15)} 20px`,
          }}
        >
          <Fab
            variant="extended"
            onClick={() => handleReview(number)}
            classes={{ label: sty.label }}
            className={sty.released}
          >
            Review
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default RenderQuestions;
