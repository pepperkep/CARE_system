import React from 'react';
import { ResultCardList } from '../../components';
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
    return (
        <div>
            <ResultCardList groupList={groupListData} />
        </div>
    )
}
