import React, { useState, useContext, useEffect } from 'react';
import { GroupContext } from '../../context/GroupContext';
import { Button } from '@material-ui/core';
import { useTransition, animated } from 'react-spring';
import { ResultCardList, GroupForm } from '../../components';
import axios from 'axios';
import { Group as G } from '../../interfaces/Group';

export const Group = () => {
    const { setGroupList, groupList } = useContext(GroupContext);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const transition = useTransition(modalOpen, null, {
        from: { position: 'absolute', left: '40%', right: '50%', opacity: 0, transform: 'translate3d(0, -100%, 0)', zIndex: 100 },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, -100%, 0)' }
    });

    return (
        <div>
            {transition.map(({ item, props, key }) =>
                item &&
                <animated.div key={key} style={props}>
                    <GroupForm onCancel={() => setModalOpen(prevState => !prevState)} />
                </animated.div>
            )}

            <Button onClick={() => setModalOpen(prevState => !prevState)}>Propose Group</Button>
            <ResultCardList groupList={groupList} />
        </div>
    )
}
