import { useEffect, useState } from 'react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { RecentTable } from '../components/dashboard/RecentTable';
import { DistributionChart } from '../components/dashboard/DistributionChart';
import { Loading } from '../components/ui/Loading';
import { getAnalyticsStats, getRecentAnalyses } from '../services/AnalyticsService';
import { toast } from 'sonner';
import { BarChart3, TrendingUp, Clock, Calendar } from 'lucide-react';
import type { AnalyticsStats, RecentAnalysis } from '../@types/Analytics';

export function Dashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [recent, setRecent] = useState<RecentAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [statsResponse, recentResponse] = await Promise.all([
        getAnalyticsStats(),
        getRecentAnalyses(10),
      ]);

      if (statsResponse.type === "error" || recentResponse.type === "error") {
        toast.error("Erro ao carregar dados do dashboard");
        setLoading(false);
        return;
      }

      if (statsResponse.data && recentResponse.data) {
        setStats(statsResponse.data);
        setRecent(recentResponse.data);
      }
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!stats) {
    return (
      <div className="py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          Erro ao carregar dados
        </div>
      </div>
    );
  }

  return (
    <main className="py-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Visão geral das análises de email</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Análises"
            value={stats.total_analyses}
            icon={<BarChart3 size={24} />}
          />
          <StatsCard
            title="Taxa de Produtividade"
            value={`${stats.productive_rate}%`}
            icon={<TrendingUp size={24} />}
            subtitle={`${stats.productive_count} produtivos`}
          />
          <StatsCard
            title="Tempo Médio"
            value={`${(stats.avg_processing_time_ms / 1000).toFixed(2)}s`}
            icon={<Clock size={24} />}
          />
          <StatsCard
            title="Hoje"
            value={stats.today_count}
            icon={<Calendar size={24} />}
            subtitle="análises realizadas"
          />
        </div>

        <DistributionChart
          productiveCount={stats.productive_count}
          unproductiveCount={stats.unproductive_count}
        />
        <RecentTable analyses={recent} />
      </div>
    </main>
  );
}
