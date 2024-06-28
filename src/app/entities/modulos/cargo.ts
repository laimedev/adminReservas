export interface Cargo {
    _id: number;
    nombre?: string;
    descripcion?: string;
    created?: string;
    departamento?: string;
    estado?: string;
}

export interface RootObject {
    total: number;
    data: Cargo[];
    pageNumber: number;
    pageSize: number;
}

