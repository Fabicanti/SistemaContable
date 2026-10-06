export interface Account {
  id: number;
  nombre: string;
  codigoCuenta: string;
  saldo: number;
  recibeSaldo: boolean;
  tipoCuentaId: number;
  tipoCuentaNombre: string;
  cuentaPadreId: number | null;
  subCuentasIds: number[];
}