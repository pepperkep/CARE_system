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

export const ResultCard: React.FC<IResultCard.IProps> = ({ data, index }) => {
    const classes = useStyles();

    return (
        <Card className={classes.rootCard} key={index}>
            <CardContent>
                {data.agents.length > 0 && (
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {/* {i18n.language === 'cn' ? '代理人' : 'Agents'}：{data.agents.map((agent, index) => index === data.agents.length - 1 ? agent.name : `${agent.name}, `)} */}
                    </Typography>
                )}
                <Typography variant="h5" component="h2">
                    <strong>{data.title}</strong>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {/* {i18n.language === 'cn' ? '发明人' : 'Inventors'}：{data.inventors.map((inventor, index) => index === data.inventors.length - 1 ? inventor.name.original : `${inventor.name.original}, `)} */}
                </Typography>
                <Typography variant="body2" component="p">
                    {data.mainClaim}
                </Typography>
            </CardContent>
        </Card>
    )
}
