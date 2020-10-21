import React from 'react';
import { ResultCard } from './ResultCard';
import { IResultCardList } from './ResultCardList';
import { useTrail, animated } from 'react-spring';
import { Grid } from '@material-ui/core';

export const ResultCardList: React.FC<IResultCardList.IProps> = ({ groupList }) => {
    const trail = useTrail(groupList.length, {
        opacity: 1,
        from: { opacity: 0 }
    })

    return (
        <>
            <Grid container direction='column' alignItems='center'>
                {trail.map((props, index) => (
                    <animated.div style={props} key={index}>
                        <Grid>
                            <ResultCard group={groupList[index]} index={index} />
                        </Grid>
                    </animated.div>
                ))}
            </Grid>
        </>
    )
}
