import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export const Card = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>How to submit a report?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                In order to submit a report please refer to the 'Reports' page, from there you will be able to
                (if logged in) to fill out a form with the necessary details.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>How to submit a group?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                In order to submit a group please refer to the 'Group' page, from there you will be able to
                (if logged in) to fill out a form with the necessary details.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Why do I have to log in?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                In order to keep the functionality to members of Case Western Reserve University as well as
                respect the privacy of those wihtin CWRU, we ask all individuals to login through a Case account. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Why do I have to log in?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                In order to keep the functionality to members of Case Western Reserve University as well as
                respect the privacy of those wihtin CWRU, we ask all individuals to login through a Case account. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Why do I have to log in?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                In order to keep the functionality to members of Case Western Reserve University as well as
                respect the privacy of those wihtin CWRU, we ask all individuals to login through a Case account. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Why do I have to log in?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                In order to keep the functionality to members of Case Western Reserve University as well as
                respect the privacy of those wihtin CWRU, we ask all individuals to login through a Case account. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Why do I have to log in?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                In order to keep the functionality to members of Case Western Reserve University as well as
                respect the privacy of those wihtin CWRU, we ask all individuals to login through a Case account. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
    );
}