import React, { useState, useContext } from 'react';
import { ReportContext } from '../../context/ReportContext';
import { SignInContext } from '../../context/SigninContext';
import { Paper, TextField, Button } from '@material-ui/core';
import { Report } from '../../interfaces/Report';
import { IReportForm } from './ReportForm';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const ReportForm: React.FC<IReportForm.IProps> = ({ onCancel }) => {
    const { reportList, setReportList } = useContext(ReportContext);
    const { userId } = useContext(SignInContext);

    const [reportInfo, setReportInfo] = useState<Report>({
        id: Math.floor(Math.random() * 10000),
        content: "",
        group: ""
    });

    const updateName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setReportInfo(prevState => {
            return {
                ...prevState,
                name: e.target.value
            }
        });
    }

    const updateDescription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setReportInfo(prevState => {
            return {
                ...prevState,
                description: e.target.value
            }
        });
    }

    const createReport = async () => {
        const query = {
            user_id: userId,
            content: reportInfo.content,
            group: reportInfo.group
        }

        const response = await axios.post(`http://127.0.0.1:5000/report`, query);

        if (response.status == 200) {
            setReportList([
                ...reportList,
                reportInfo
            ]);
        }

        console.log(response);
        onCancel && onCancel();
    }

    return (
        <Paper style={{ width: '30rem', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <h2>Enter your report information</h2>

            <div style={{ display: 'flex', flexDirection: 'column', height: '8rem', justifyContent: 'space-around', marginBottom: '1.5rem' }} className='report-form-inputs'>
                <TextField placeholder='content' onChange={updateName} />
                <TextField placeholder='group' onChange={updateDescription} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }} className='report-form-actions'>
                <Button onClick={onCancel}>cancel</Button>
                <Button onClick={createReport}>submit</Button>
            </div>
        </Paper>
    )
}
