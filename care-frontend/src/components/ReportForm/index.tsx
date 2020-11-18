import React, { useState } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { Report } from '../../interfaces/Report';
import { IReportForm } from './ReportForm';
import axios from 'axios';

export const ReportForm: React.FC<IReportForm.IProps> = ({ onCancel }) => {
    const [reportInfo, setReportInfo] = useState<Report>({
        content: "",
        group: ""
    });


    const updateContent = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setReportInfo(prevState => {
            return {
                ...prevState,
                name: e.target.value
            }
        });
    }

    const updateGroup = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setReportInfo(prevState => {
            return {
                ...prevState,
                description: e.target.value
            }
        });
    }

    const createReport = async () => {
        const query = {
            content: reportInfo.content,
            description: reportInfo.group
        }

        const response = await axios.post(`http://127.0.0.1:5000/group/${groupInfo.id}`, query);
        console.log(response);
        onCancel && onCancel();
    }

    return (
        <Paper style={{ width: '30rem', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <h2>Enter your report information</h2>

            <div style={{ display: 'flex', flexDirection: 'column', height: '8rem', justifyContent: 'space-around', marginBottom: '1.5rem' }} className='group-form-inputs'>
                <TextField placeholder='content' onChange={updateContent} />
                <TextField placeholder='group' onChange={updateGroup} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }} className='report-form-actions'>
                <Button onClick={onCancel}>cancel</Button>
                <Button onClick={createReport}>submit</Button>
            </div>
        </Paper>
    )
}
