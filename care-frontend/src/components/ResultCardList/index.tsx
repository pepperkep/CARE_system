import React from 'react';
import { ResultCard } from './ResultCard';
import { IResultCardList } from './ResultCardList';
import { useTrail, animated, useTransition } from 'react-spring';
import { Grid } from '@material-ui/core';

export const ResultCardList: React.FC<IResultCardList.IProps> = ({ groupList }) => {
    const trail = useTrail(groupList.length, {
        opacity: 1,
        from: { opacity: 0 }
    })

    const transition = useTransition(groupList, group => group.id, {
        from: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)'},
        leave: { opacity: 0, transform: 'translate3d(0, -40px, 0)' }
    });

    return (
        <>
            <Grid container direction='column' alignItems='center'>
                {transition.map(({item, props, key}, index) => (
                    <animated.div style={props} key={key}>
                        <Grid>
                            <ResultCard group={item} index={index} />
                        </Grid>
                    </animated.div>
                ))}
            </Grid>
        </>
    )
}
