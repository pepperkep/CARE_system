import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

export const Title = () => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Typography data-test-id="Title" variant="h5" gutterBottom>
            Frequently Asked Questions
        </Typography>
      </div>
    );
}