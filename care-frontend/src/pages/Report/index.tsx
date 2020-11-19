import React, { useState, useContext, useEffect } from 'react';
import { ReportContext } from '../../context/ReportContext';import { Button } from '@material-ui/core';
import { useTransition, animated } from 'react-spring';
import { ReportCardList, ReportForm } from '../../components';
import axios from 'axios';

export const Report = () => {
    const { setReportList, reportList } = useContext(ReportContext);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [] = useState<boolean>(true);
    const transition = useTransition(modalOpen, null, {
        from: { position: 'absolute', left: '40%', right: '50%', opacity: 0, transform: 'translate3d(0, -100%, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)'},
        leave: { opacity: 0, transform: 'translate3d(0, -100%, 0)' }
    });

    useEffect(() => {
        const getReportList = async () => {
            const response = await axios.get('http://127.0.0.1:5000/report/all');

            if (response.status == 200) {
                setReportList(response.data);
            }
        }

        getReportList();
    }, [setReportList]);

    return (
        <div>
            {transition.map(({ item, props, key }) => 
                item &&
                <animated.div key={key} style={props}> 
                    <ReportForm onCancel={() => setModalOpen(prevState => !prevState)}/>
                </animated.div>
            )}

            <Button onClick={() => setModalOpen(prevState => !prevState)}>New Report</Button>
            <ReportCardList reportList={reportList} />
        </div>
    )
}
