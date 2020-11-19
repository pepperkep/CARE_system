import { createContext } from 'react';
import { Report } from '../interfaces/Report';

export interface ReportContextInterface {
    reportList: Report[];
    setReportList: (reportList: Report[]) => void;
}

export const ReportContext = createContext<ReportContextInterface>({ reportList: [], setReportList: (reportList) => { } });