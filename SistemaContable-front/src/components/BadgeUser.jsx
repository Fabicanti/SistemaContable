import React from "react";
import "../styles/components/BadgeUser.css"

export const BadgeUser = ({ rol }) => {
  return rol === 2 ? (
    <div className="roles a">Administrador</div>
  ) : (
    <div className="roles b">Usuario</div>
  );
};
