export interface Departamento {
    _id: number;
    nombre?: string;
    descripcion?: string;
    created?: string;
    estado?: string;
}

export interface RootObject {
    total: number;
    data: Departamento[];
    pageNumber: number;
    pageSize: number;
}

