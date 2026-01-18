import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';

interface DistributionChartProps {
  productiveCount: number;
  unproductiveCount: number;
}

export function renderLabel(props: PieLabelRenderProps) {
  const { name, percent } = props;
  return `${name}: ${((percent || 0) * 100).toFixed(0)}%`;
}

export function DistributionChart({ productiveCount, unproductiveCount }: DistributionChartProps) {
  const data = [
    { name: 'Produtivo', value: productiveCount, color: '#10b981' },
    { name: 'Improdutivo', value: unproductiveCount, color: '#ef4444' },
  ];

  const total = productiveCount + unproductiveCount;

  if (total === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          Nenhum dado disponível
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
