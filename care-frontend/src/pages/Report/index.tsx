import React, { useState } from 'react'
import { ReportCard, GroupForm } from '../../components'


export const Report = () => {
    const [] = useState<boolean>(true);
    return (
        <div>
            <GroupForm />
            <ReportCard />
        </div>
    )
}
