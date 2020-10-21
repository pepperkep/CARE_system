import React from 'react'
import Box from '@material-ui/core/Box';

export const Title = () => {
  return (
    <div style={{ width: '100%' }}>
      <Box component="span" visibility="visible" p={1} m={1} bgcolor="background.paper">
        Frequently Asked Questions
      </Box>
    </div>
  );
}