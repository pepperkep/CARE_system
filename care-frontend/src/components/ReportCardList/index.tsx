import React from 'react';
import { Report } from './Report';
import { IReportCardList } from './ReportCardList';
import { useTrail, animated } from 'react-spring';
import { Grid } from '@material-ui/core';

export const ReportCardList: React.FC<IReportCardList.IProps> = ({ reportList }) => {
    const trail = useTrail(reportList.length, {
        opacity: 1,
        from: { opacity: 0 }
    })

    return (
        <>
            <Grid container direction='column' alignItems='center'>
                {trail.map((props, index) => (
                    <animated.div style={props} key={index}>
                        <Grid>
                            <Report id={reportList[index].id} content={reportList[index].content} group={reportList[index].group} />
                        </Grid>
                    </animated.div>
                ))}
            </Grid>
        </>
    )
}