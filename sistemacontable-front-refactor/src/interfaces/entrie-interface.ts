export interface Entrie {
  id: number;
  fecha: Date;
  descripcion: string;
  usuarioName: string;
  detalles: Movement[];
}

export interface Movement {
  id: number;
  cuentaId: number;
  nombreCuenta: string
  debe: number;
  haber: number;
}

export interface DatesRange {
  desde: string; // formato ISO (yyyy-MM-dd)
  hasta: string;
}