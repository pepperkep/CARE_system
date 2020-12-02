import React, { useState, useContext } from 'react';
import { GroupContext } from '../../context/GroupContext';
import { Paper, TextField, Button } from '@material-ui/core';
import { Group } from '../../interfaces/Group';
import { IGroupForm } from './GroupForm';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const GroupForm: React.FC<IGroupForm.IProps> = ({ onCancel }) => {
    const { groupList, setGroupList } = useContext(GroupContext);

    const [groupInfo, setGroupInfo] = useState<Group>({
        group_id: Math.floor(Math.random() * 10000),
        name: "",
        description: ""
    });

    const updateName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        //update group name
        setGroupInfo(prevState => {
            return {
                ...prevState,
                name: e.target.value
            }
        });
    }

    const updateDescription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        //update group description
        setGroupInfo(prevState => {
            return {
                ...prevState,
                description: e.target.value
            }
        });
    }

    const createGroup = async () => {
        //create query
        const query = {
            name: groupInfo.name,
            description: groupInfo.description
        }
        //send request
        const response = await axios.post(`http://127.0.0.1:5000/group/${groupInfo.group_id}`, query);

        //update group list if successful
        if (response.status == 200) {
            setGroupList([
                ...groupList,
                groupInfo
            ]);
        }

        //close the form
        onCancel && onCancel();
    }

    return (
        <Paper style={{ width: '30rem', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <h2>Enter your group information</h2>

            <div style={{ display: 'flex', flexDirection: 'column', height: '8rem', justifyContent: 'space-around', marginBottom: '1.5rem' }} className='group-form-inputs'>
                <TextField placeholder='name' onChange={updateName} />
                <TextField placeholder='description' onChange={updateDescription} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }} className='group-form-actions'>
                <Button onClick={onCancel}>cancel</Button>
                <Button onClick={createGroup}>submit</Button>
            </div>
        </Paper>
    )
}
