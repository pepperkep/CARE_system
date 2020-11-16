import React from 'react';
import { Paper, TextField, Button } from '@material-ui/core';

export const GroupForm = () => {
    return (
        <Paper style={{ width: '30rem', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <h2>Enter your group information</h2>

            <div style={{ display: 'flex', flexDirection: 'column', height: '15rem', justifyContent: 'space-around', marginBottom: '1.5rem'}} className='group-form-inputs'>
                <TextField placeholder='name' />
                <TextField placeholder='description' />
                <TextField placeholder='location' />
                <TextField placeholder='number of members' />
            </div>


            <div style={{ display: 'flex', flexDirection: 'row' }} className='group-form-actions'>
                <Button>cancel</Button>
                <Button>submit</Button>
            </div>
        </Paper>
    )
}
