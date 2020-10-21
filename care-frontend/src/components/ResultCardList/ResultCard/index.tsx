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
        <Card className={classes.rootCard} key={index}>
            <CardContent>
                {group.size && (
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        size: {group.size}
                    </Typography>
                )}
                <Typography variant="h5" component="h2">
                    <strong>{group.name}</strong>
                </Typography>
                <Typography variant="subtitle1" component="h2">
                    rating: <strong>{group.rating}</strong>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {/* {i18n.language === 'cn' ? '发明人' : 'Inventors'}：{data.inventors.map((inventor, index) => index === data.inventors.length - 1 ? inventor.name.original : `${inventor.name.original}, `)} */}
                </Typography>
                {group.location && 
                    <Typography variant="body2" component="p">
                        location: {group.location}
                    </Typography>
                }
            </CardContent>
        </Card>
    )
}
