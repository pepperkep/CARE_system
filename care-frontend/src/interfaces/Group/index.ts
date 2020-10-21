import { Report } from "../Report";

export interface Group {
    id: number;
    name: string;
    size?: number;
    location?: string;
    reports?: Report[];
    rating: number;
}