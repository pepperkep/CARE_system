import { Report } from '../../../interfaces/Report';

declare namespace IReport {
    export interface IProps {
        id: number;
        content: string;
        group: string;
    }
}

export { IReport };