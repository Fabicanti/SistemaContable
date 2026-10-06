
export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  password: string;
  roleId: number;
}

export interface ChangePassword {
  userId: number;
  oldPassword: string;
  newPassword: string;
}