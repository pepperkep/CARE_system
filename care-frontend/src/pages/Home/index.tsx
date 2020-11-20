import React, { useState, useContext, useEffect } from 'react';
import { ReportContext } from '../../context/ReportContext';import { Button } from '@material-ui/core';
import { Report } from '../../interfaces/Report';
import { ReportCardList } from '../../components';
import axios from 'axios';

export const Home = () => {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        const getReports = async () => {
            const response = await axios.get('http://127.0.0.1:5000/report/recents/3');

            if (response.status == 200) {
                setReports(response.data);
            }
        }

        getReports();
    }, [setReports]);

    return (
        <div>
            <ReportCardList reportList={reports} />
        </div>
    )
}
