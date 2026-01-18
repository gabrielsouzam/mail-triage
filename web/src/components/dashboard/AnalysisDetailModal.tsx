import { X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { RecentAnalysis } from "../../@types/Analytics";

interface AnalysisDetailModalProps {
  analysis: RecentAnalysis;
  isOpen: boolean;
  onClose: () => void;
}

export function AnalysisDetailModal({ analysis, isOpen, onClose }: AnalysisDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Detalhes da Análise</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center gap-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${analysis.category === "productive"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
                }`}
            >
              {analysis.category === "productive" ? "Produtivo" : "Improdutivo"}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(analysis.created_at), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Preview do Email</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-900 whitespace-pre-wrap">{analysis.preview}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Resposta Sugerida</h3>
            <div className="bg-gradient-to-r from-[#2c5f6f]/5 to-[#3a7a8c]/5 rounded-lg p-4 border border-[#2c5f6f]/20">
              <p className="text-gray-900 whitespace-pre-wrap">{analysis.suggested_response}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Data Completa</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(analysis.created_at).toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo"
              })}
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#2c5f6f] text-white rounded-lg hover:bg-[#3a7a8c] transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
