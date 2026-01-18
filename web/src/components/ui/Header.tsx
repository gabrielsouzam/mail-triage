import AppLogo from "./../assets/logo.svg"
import { Link } from "react-router-dom"

export function Header() {
  return (
    <header className="px-10 py-8 bg-gradient-to-r from-[#1a3943] via-[#2C5F6F] to-[#234c59] flex items-center gap-4 justify-between shadow-xl">
      <div className="flex items-center gap-4">
        <img src={AppLogo} alt="Logo da aplicação" className="w-16 h-auto drop-shadow-lg" />

        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Mail Triage
          </h1>
          <p className="text-sm text-[#cce1e7] mt-1">Classificação inteligente de emails</p>
        </div>
      </div>

      <nav className="flex gap-6">
        <Link
          to="/"
          className="text-white hover:text-[#cce1e7] transition-colors font-medium"
        >
          Analisar
        </Link>
        <Link
          to="/dashboard"
          className="text-white hover:text-[#cce1e7] transition-colors font-medium"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  )
}