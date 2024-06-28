export interface Tarea {
    _id: any;
    nombre?: string;
    actividad?: string;
    created?: string;
}

export interface RootObject {
    total: any;
    data: Tarea[];
    pageNumber: number;
    pageSize: number;
}

