import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ROIChartProps {
  data: Array<{
    name: string;
    lost: number;
    recovered: number;
  }>;
}

export const ROIChart = ({ data }: ROIChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          stroke="currentColor"
          className="text-muted-foreground"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="currentColor"
          className="text-muted-foreground"
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '0.75rem',
          }}
          formatter={(value: number) => `$${value.toLocaleString()}`}
        />
        <Legend
          wrapperStyle={{
            paddingTop: '1rem',
          }}
        />
        <Bar
          dataKey="lost"
          fill="url(#lostGradient)"
          name="Lost Revenue"
          radius={[8, 8, 0, 0]}
        />
        <Bar
          dataKey="recovered"
          fill="url(#recoveredGradient)"
          name="Recovered Revenue"
          radius={[8, 8, 0, 0]}
        />
        <defs>
          <linearGradient id="lostGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.8} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};
