import React, { useState, useContext, useEffect } from 'react';
import { ReportContext } from '../../context/ReportContext';import { Button } from '@material-ui/core';
import { ReportCardList } from '../../components';
import { GroupContext } from '../../context/GroupContext';
import { ResultCardList } from '../../components';
import axios from 'axios';

export const Home = () => {
    const { setReportList, reportList } = useContext(ReportContext);

    const [] = useState<boolean>(true);

    useEffect(() => {
        const getReportList = async () => {
            const response = await axios.get('http://127.0.0.1:5000/report/recents/3');

            if (response.status == 200) {
                setReportList(response.data);
            }
        }

        getReportList();
    }, [setReportList]);

    return (
        <div>
            <ReportCardList reportList={reportList} />
        </div>
    )
}
