import React from 'react'
import { IReport } from './Report';
import { CardContent, Typography, makeStyles, Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    rootCard: {
        textAlign: 'left',
        width: 650,
        marginBottom: '0.5rem',
        marginTop: '1rem',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        fontSize: 13,
        marginBottom: 12
    },
}));

export const Report: React.FC<IReport.IProps> = ({ id, content, group }) => {
    const classes = useStyles();

    return (
        <Card data-test-id="Report" className={classes.rootCard} key={content}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    <strong>{content}</strong>
                </Typography>
                <Typography variant="body2" component="p">
                    group: {group}
                </Typography>

            </CardContent>
        </Card>
    )
}
