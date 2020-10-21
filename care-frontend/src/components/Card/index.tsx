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
            <Typography className={classes.heading}>What is the purpose of CARE?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              The platform will provide students with the ability to make reports while also keeping their anonymity. Students will be able to report specific organizations, whether those are sports teams, fraternities, sororities, academic clubs, dance groups, students, etc, where multiple members have been seen to be engaging in behavior that breaks COVID related guidelines. By restricting who can be reported to groups of students, we seek to avoid having students be picked out and bullied when the goal of this platform isn’t to bully students, but to ensure that they follow the rules put in place to keep us safe. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Why is it important to CARE?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              The goal of this project is to create a system that gives members of the Case Western Reserve community the ability and the opportunity to hold one another accountable concerning the social distancing guidelines that have been made necessary as a result of the current pandemic that has claimed the lives of over 200,000 Americans Case Western Reserve University is situated in Cuyahoga County, which is the county in Ohio with the second most cases(17,092), and the most deaths directly linked to the virus(642), as of September 21st.
              <br></br>
              <br></br>
              While the university has attempted to take steps to mitigate the risks associated with bringing students back to campus by taking measures such as reducing the amount of students living in dorms and the number of in person classes, these measures are meaningless if the students that are on campus fail to properly distance themselves from one another and don’t wear masks when they are around other people. And, while the school has said it will punish students that don’t comply with these guidelines as student conduct violations, we believe that more work should be done to prevent students from Case from becoming part of an uptick of cases that has been observed at college towns across the country. To that end our platform will allow students to hold each other to standards necessary to create a safer campus environment for the students, faculty, staff and members of the community that pass through it each day.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>How will CARE help?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              While the reporter’s information won’t be collected the data within the report will be used to keep track of what groups are reported most often, what violations are being reported the most, where the most reports are based, and other statistics that we think might be useful for students to have available to them. Students will be able to suggest certain groups be added to the app. There will be a map tied into our app that will allow students to tie their reports to a specific area on campus such as a residential hall, recreational center or a dining hall like Fribley or Leutner. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Who can access CARE?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              The platform will be exclusive to Case Western’s campus and will only give students the ability to report groups or organizations, rather than individual students or faculty. Who they can report is limited to the groups and organizations that they can already select on the platform or that were added after a user suggested them and they had their suggestion accepted. Since the app will rely on anonymous reports, and we won’t be collecting photo or video evidence of the violations, we will not be able to verify the truthfulness of these reports, but instead must rely on the moral fiber of the members of our community who use this application as well as an analysis for repeated entries. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>What is considered 'Unsafe Behavior'?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Unsafe behavior is classified as any behavior that may endanger or potentially cause situations in which the spread of Covid-19 may occur. This may be an instance where a group of individuals are meeting near Leutner without masks on, a sports club is practicing on a field with no masks on, or any situation that is deemed unsafe through the Case Western Reserve University guidelines on Covid-19 protocols. These protocols specifiy that all individuals wear masks on campus, adhere to physical distiancing requirements (maintain a distance of 6 feet between individuals), and frequently wash hands or sanitize hands.  
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
                In order to keep the functionality of CARE to members of Case Western Reserve University as well as respect the privacy of those wihtin CWRU, we ask all individuals to login. CARE was created as a means of keeping Case Western Reserve's community safe and allowing members to keep eachother accountable for their actions. In order to help develop a greater bond within those at CWRU as well as help increase safety we devised CARE in order to only allow those who a part of the community to interact with its features. 
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>How do I submit a report?</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              To submit a report, please begin by logging in through the login portal that can be found in the account page. Once logged in, you will have access to submit a report through the reports page. On this page is a form that can be filled out by an member of the Case Western Reserve Community. Fill out the form to the best of your ability and once finished click the submit button. Thank you for your contribution to the community! 
            </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
    );
}