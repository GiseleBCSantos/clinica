import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className="bg-white shadow p-3">
      <div className="container mx-auto flex justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold">
            Clinic+
          </Link>
          <Link to="/patients" className="text-sm">
            Pacientes
          </Link>
          <Link to="/appointments" className="text-sm">
            Agendamentos
          </Link>
          <Link to="/alerts" className="text-sm">
            Alertas
          </Link>
        </div>
        <div>
          <button onClick={() => dispatch(logout())} className="text-sm">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
