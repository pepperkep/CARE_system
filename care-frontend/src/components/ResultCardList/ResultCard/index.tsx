import React from 'react'
import { IResultCard } from './ResultCard';
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

export const ResultCard: React.FC<IResultCard.IProps> = ({ group, index }) => {
    const classes = useStyles();

    return (
        <Card data-test-id="ResultCard" className={classes.rootCard} key={index}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    <strong>{group.name}</strong>
                </Typography>
                <Typography variant="body2" component="p">
                    location: {group.description}
                </Typography>

            </CardContent>
        </Card>
    )
}
