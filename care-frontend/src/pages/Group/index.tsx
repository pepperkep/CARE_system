import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useTransition, animated } from 'react-spring';
import { ResultCardList, GroupForm } from '../../components';
import { Group as G } from '../../interfaces/Group';

const groupListData: G[] = [
    {
        id: 0,
        name: 'Case student organization',
        rating: 5,
        location: 'tinkham'
    },
    {
        id: 1,
        name: 'Case student organization',
        rating: 5,
        location: 'tinkham'
    },
    {
        id: 2,
        name: 'Case student organization',
        rating: 5,
        location: 'tinkham'
    },
    {
        id: 3,
        name: 'Case student organization',
        rating: 5,
        location: 'tinkham'
    },
    {
        id: 4,
        name: 'Case student organization',
        rating: 5,
        location: 'tinkham'
    },
    {
        id: 5,
        name: 'Case student organization',
        rating: 5,
        location: 'tinkham'
    }
];

export const Group = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const transition = useTransition(modalOpen, null, {
        from: { position: 'absolute', left: '40%', right: '50%', opacity: 0, transform: 'translate3d(0, -100%, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)'},
        leave: { opacity: 0, transform: 'translate3d(0, -100%, 0)' }
    });

    return (
        <div>
            {transition.map(({ item, props, key }) => 
                item &&
                <animated.div key={key} style={props}> 
                    <GroupForm />
                </animated.div>
            )}

            <Button onClick={() => setModalOpen(prevState => !prevState)}>Propse Group</Button>
            <ResultCardList groupList={groupListData} />
        </div>
    )
}
