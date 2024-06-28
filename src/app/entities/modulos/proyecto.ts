export interface Proyecto {
    _id: number;
    nombre?: string;
    descripcion?: string;
    created?: string;
    responsable?: string;
    presupuesto?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
    cliente?: string;
    cotizacion?: string;
    estado?: string;

    fecha_termino?: string;
    ev?: number;
    pv?: number;
    sv?: number;
    ac?: number;
    cv?: number;

}

export interface RootObject {
    total: number;
    data: Proyecto[];
    pageNumber: number;
    pageSize: number;
}

