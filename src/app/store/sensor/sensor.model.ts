export interface Sensor {
    id: number;
    name: string;
    model: string;
    from: number;
    to: number;
    type: string;
    unit: string;
    location: string;
    description: string;
};

export const EMPTY_SENSOR: Sensor = {
    id: -1,
    name: '',
    model: '',
    from: 0,
    to: 0,
    type: '',
    unit: '',
    location: '',
    description: ''
};