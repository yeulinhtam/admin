import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import React from 'react';


const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = {
  root: {
    background: styledBy('color', {
      green: green[500],
      red: red[500],
    }),
    fontSize: 12,
    borderRadius: 15,
    color: 'white',
    fontWeight: 500,
    height: 20,
    '&:hover': {
      background: styledBy('color', {
        green: green[500],
        red: red[500],
      }),
    }
  },
};

const StyledButton = withStyles(styles)(({ classes, color, ...other }) => (
  <Button className={classes.root} {...other} />
));


export const PublishButton = (props) => {
  const { color, label } = props;

  return (
    <StyledButton color={color}>{label}</StyledButton>
  )
}