import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(20),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MainGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container >
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={11}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
