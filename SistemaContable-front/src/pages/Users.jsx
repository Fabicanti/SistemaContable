import React, { useEffect, useState } from "react";
import { UsersTable } from "../components/Users/UsersTable";
import { UsersMenu } from "../components/Users/UsersMenu";
import { useFetchGET } from "../hooks/useFetchGET";
import { useUsers } from "../hooks/useUsers";
import "../styles/Users.css";

const urlUsersData = "http://localhost:8080/api/usuarios";

export const Users = () => {
  const { state, fetchGet } = useFetchGET(urlUsersData);
  const { handleAddUser, handleDeleteUser, handleEditUser } = useUsers();

  useEffect(() => {
    document.title = 'Usuarios'
    return () => document.title = 'Inicio' 
  }, [])
  

  return (
    <div className="users-container">
      <UsersMenu onAdd={handleAddUser} fetch={fetchGet} />
      <UsersTable
        datas={state}
        handleDelete={handleDeleteUser}
        handleEdit={handleEditUser}
        fetch={fetchGet}
      />
    </div>
  );
};
