import { createContext } from 'react';
import { Group } from '../interfaces/Group';

export interface GroupContextInterface {
    groupList: Group[];
    setGroupList: (groupList: Group[]) => void;
}

export const GroupContext = createContext<GroupContextInterface>({ groupList: [], setGroupList: (groupList) => { } });