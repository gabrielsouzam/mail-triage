import {
  BroomIcon,
  CopySimpleIcon,
  RocketLaunchIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface EmailAnalysisProps {
  emailAnalysis: EmailAnalysisResponse;
}

export function EmailAnalysis({ emailAnalysis }: EmailAnalysisProps) {
  const isProductive = emailAnalysis.category === "productive";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(emailAnalysis.response);
      toast.success("Copiado para a área de transferência!");
    } catch (err) {
      console.error("Erro ao copiar: ", err);
      toast.error("Erro ao copiar");
    }
  }

  return (
    <div className="mt-12 w-full max-w-5xl mx-auto">
      <Card variant="glass">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1a3943] mb-4">
            Resultado da análise
          </h2>

          <div className="flex items-center justify-center gap-3">
            <span className="text-gray-600 font-medium">CLASSIFICAÇÃO:</span>
            <Badge variant={isProductive ? "coral" : "green"} className="text-base px-4 py-2">
              {isProductive ? (
                <div className="flex items-center gap-2">
                  <RocketLaunchIcon className="w-5 h-5" weight="bold" />
                  <span>Produtivo</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <BroomIcon className="w-5 h-5" weight="bold" />
                  <span>Improdutivo</span>
                </div>
              )}
            </Badge>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#faf0ed] to-[#f9f6f1] p-8 rounded-2xl border-2 border-[#ebc3b7]/50">
          <div className="flex justify-between items-center mb-6 flex-col lg:flex-row gap-4">
            <div className="flex gap-2 items-center">
              <SparkleIcon className="text-[#D4745E]" weight="fill" size={28} />
              <span className="text-xl font-semibold text-gray-800">Resposta Sugerida</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-[#d4c4a8] hover:bg-[#fdfcfb] hover:border-[#D4745E] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <CopySimpleIcon size={20} />
              <span className="text-sm font-medium">Copiar</span>
            </button>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {emailAnalysis.response}
            </p>
          </div>

          <div className="mt-6 flex lg:justify-end justify-center">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
                "Resposta automática"
              )}&body=${encodeURIComponent(emailAnalysis.response)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4745E] text-white rounded-xl hover:bg-[#c25d48] transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              <span>Responder no Gmail</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
