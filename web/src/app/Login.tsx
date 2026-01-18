import { GoogleLoginButton } from "../components/auth/GoogleLoginButton";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

export function Login() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2c5f6f] to-[#3a7a8c] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <img src="/logo.svg" alt="Mail Triage" className="w-12 h-12" />
            <span className="text-3xl font-bold text-white">Mail Triage</span>
          </div>

          <div className="space-y-8 max-w-md">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Classificação inteligente de emails
              </h2>
              <p className="text-blue-100 text-lg">
                Powered by Google Gemini AI para análise precisa e respostas contextualizadas
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Análise com IA</h3>
                  <p className="text-blue-100 text-sm">Categorização automática e inteligente</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Dashboard Analytics</h3>
                  <p className="text-blue-100 text-sm">Métricas e histórico detalhado</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Respostas Sugeridas</h3>
                  <p className="text-blue-100 text-sm">IA gera respostas contextualizadas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="relative z-10">
          <p className="text-blue-100 text-sm">
            Mail Triage © {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#fdfcfb] via-[#f9f6f1] to-[#f3ede3] flex items-center justify-center p-6">
        <div className="lg:hidden absolute top-6 left-6">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Mail Triage" className="w-8 h-8" />
            <span className="text-xl font-bold text-[#2c5f6f]">Mail Triage</span>
          </div>
        </div>

        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto">
                <img src="/logo.svg" alt="Mail Triage Logo" className="w-full h-full" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Seja Bem-vindo(a)!</h1>
                <p className="text-gray-600 mt-2">
                  Faça login para continuar
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center">
                <GoogleLoginButton />
              </div>


            </div>
          </div>

          <div className="lg:hidden mt-8 text-center">
            <p className="text-sm text-gray-500">
              Mail Triage © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
