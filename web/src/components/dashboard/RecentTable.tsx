import type { RecentAnalysis } from '../../@types/Analytics';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowsOut } from '@phosphor-icons/react';
import { useState } from 'react';
import { AnalysisDetailModal } from './AnalysisDetailModal';

interface RecentTableProps {
  analyses: RecentAnalysis[];
}

export function RecentTable({ analyses }: RecentTableProps) {
  const [selectedAnalysis, setSelectedAnalysis] = useState<RecentAnalysis | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Análises Recentes</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resposta Sugerida
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {analyses.map((analysis) => (
                <tr key={analysis.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {analysis.preview}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${analysis.category === 'productive'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {analysis.category === 'productive' ? 'Produtivo' : 'Improdutivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                    <div className="line-clamp-2" title={analysis.suggested_response}>
                      {analysis.suggested_response}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {formatDistanceToNow(new Date(analysis.created_at), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedAnalysis(analysis)}
                      className="inline-flex items-center justify-center p-2 text-[#2c5f6f] hover:bg-[#2c5f6f]/10 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                      title="Expandir detalhes"
                    >
                      <ArrowsOut size={20} weight="bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {analyses.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            Nenhuma análise encontrada
          </div>
        )}
      </div>

      <AnalysisDetailModal
        analysis={selectedAnalysis!}
        isOpen={!!selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
      />
    </>
  );
}
