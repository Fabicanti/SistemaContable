
export interface Book {
  fecha: Date;
  descripcion: string;
  debe: number;
  haber: number;
  saldo: number;
}

export interface BookRequest {
  cuentaId: number;
  fechaInicio: string;
  fechaFin: string;
}