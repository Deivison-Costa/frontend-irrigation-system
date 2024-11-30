import Link from "next/link"
import { Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 mt-8 shadow-lg">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-2">Sobre o IrrigaSync</h3>
            <p className="text-sm">
              IrrigaSync busca a gestão de irrigação com tecnologia de ponta e soluções sustentáveis.
            </p>
          </div>
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-2">Links rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-emerald-200 transition-colors duration-200">Home</Link></li>
              <li><Link href="mailto:deivisonbambui@gmail.com" className="text-sm hover:text-emerald-200 transition-colors duration-200">Contato</Link></li>
            </ul>
          </div>
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-2">Contate-me</h3>
            <p className="text-sm">Email: deivisonbambui@gmail.com</p>
            <p className="text-sm">Telefone: +55 (37) 99915-3816</p>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.instagram.com/deivison_oc/" className="text-white hover:text-emerald-200 transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/deivison-costa/" className="text-white hover:text-emerald-200 transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com/Deivison-Costa" className="text-white hover:text-emerald-200 transition-colors duration-200">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white">
          © {new Date().getFullYear()} IrrigaSync. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}