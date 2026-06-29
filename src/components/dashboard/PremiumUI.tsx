import React from 'react';
import { ChevronRight, Activity, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Client, HealthStatus } from '../../data/clients';

const AVATAR_COLORS: Record<HealthStatus, string> = {
  green: 'bg-teal-50 text-teal-600 ring-teal-100',
  yellow: 'bg-amber-50 text-amber-600 ring-amber-100',
  red: 'bg-rose-50 text-rose-600 ring-rose-100',
};

export function clientInitials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export function PremiumCard({
  title,
  subtitle,
  icon,
  children,
  className = '',
  action,
}: {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={`bg-white rounded-2xl shadow-[0_8px_30px_rgba(20,47,69,0.04)] border border-slate-100/90 overflow-hidden hover:shadow-[0_16px_40px_rgba(20,47,69,0.06)] hover:-translate-y-[2px] transition-all duration-300 flex flex-col ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4.5 flex items-center justify-between border-b border-slate-100/80 bg-slate-50/10">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-[#142f45]">
                {icon}
              </div>
            )}
            <div>
              {title && <h2 className="font-bold text-[#142f45] text-sm md:text-base tracking-tight">{title}</h2>}
              {subtitle && <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      <div className="p-6 flex-1">{children}</div>
    </section>
  );
}

export function KpiStatCard({
  label,
  value,
  icon,
  accent = '#142f45',
  bg = '#142f45',
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: string;
  bg?: string;
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(20,47,69,0.04)] border border-slate-100 p-5 flex items-center gap-4 hover:shadow-[0_16px_36px_rgba(20,47,69,0.08)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden border-t-4"
      style={{ borderTopColor: accent }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: `${bg}12`, color: accent }}
      >
        {icon}
      </div>
      <div>
        <div className="text-3xl font-extrabold text-[#142f45] tracking-tight leading-none">{value}</div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1.5">{label}</div>
      </div>
    </div>
  );
}

export function HealthRing({ score, size = 56 }: { score: number; size?: number }) {
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={5} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-[#142f45]">{score}</span>
      </div>
    </div>
  );
}

export function RiskPill({ risk }: { risk: string }) {
  const styles: Record<string, string> = {
    Low: 'bg-emerald-50 text-emerald-700',
    Medium: 'bg-amber-50 text-amber-700',
    High: 'bg-orange-50 text-orange-700',
    Critical: 'bg-rose-50 text-rose-700',
  };
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${styles[risk] || styles.Medium}`}>
      {risk} Risk
    </span>
  );
}

export function MetricChip({ label, value, good }: { label: string; value: number; good?: boolean }) {
  const color = good === undefined
    ? 'text-[#142f45] bg-slate-50'
    : good
      ? 'text-emerald-700 bg-emerald-50'
      : value >= 60
        ? 'text-amber-700 bg-amber-50'
        : 'text-rose-700 bg-rose-50';

  return (
    <div className={`rounded-xl px-3 py-2 text-center min-w-[72px] ${color}`}>
      <div className="text-sm font-bold">{value}</div>
      <div className="text-[10px] font-medium uppercase tracking-wide opacity-80">{label}</div>
    </div>
  );
}

export function ClientListRow({ client, onClick }: { client: Client; onClick: () => void }) {
  const trendUp = client.monthlyChange > 0;
  const trendDown = client.monthlyChange < 0;

  const metrics = [
    { label: 'Traffic', value: client.breakdown.traffic },
    { label: 'Leads', value: client.breakdown.leads },
    { label: 'Sentiment', value: client.breakdown.sentiment },
    { label: 'Delivery', value: client.breakdown.delivery },
  ];

  // Colors based on client status
  const statusColors = {
    green: {
      bar: 'bg-emerald-500',
      avatar: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
      text: 'text-emerald-600',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    yellow: {
      bar: 'bg-amber-400',
      avatar: 'bg-amber-50 text-amber-600 ring-amber-100',
      text: 'text-amber-600',
      badge: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    red: {
      bar: 'bg-rose-500',
      avatar: 'bg-rose-50 text-rose-600 ring-rose-100',
      text: 'text-rose-600',
      badge: 'bg-rose-50 text-rose-700 border-rose-100',
    },
  };

  const currentColors = statusColors[client.status] || statusColors.green;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(20,47,69,0.02)] border border-slate-100 hover:border-slate-200 hover:shadow-[0_8px_24px_rgba(20,47,69,0.05)] hover:-translate-y-[1px] transition-all duration-200 text-left cursor-pointer flex items-center p-4 relative overflow-hidden group"
    >
      {/* Left Status Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[5px] ${currentColors.bar}`} />

      {/* Left Side: Avatar and Client Info */}
      <div className="flex items-center gap-4 flex-1 md:flex-none md:w-[260px] min-w-0 pl-1">
        <div className={`w-11 h-11 rounded-xl ring-2 flex items-center justify-center text-sm font-bold shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 ${currentColors.avatar}`}>
          {clientInitials(client.name)}
        </div>

        <div className="min-w-0 pr-4">
          <div className="font-bold text-[#142f45] text-sm group-hover:text-[#ee683b] transition-colors truncate">
            {client.name}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5 truncate">
            {client.category} - {client.accountManager}
          </div>
        </div>
      </div>

      {/* Separator 1 */}
      <div className="h-10 w-[1px] bg-slate-100/80 shrink-0 hidden md:block" />

      {/* Middle Section: Metrics bars */}
      <div className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-5 px-4 shrink-0">
        {metrics.map(m => (
          <div key={m.label} className="w-20 text-left">
            <div className="flex items-baseline text-[9px] font-bold mb-1">
              <span className="text-slate-400 uppercase tracking-wider">{m.label}</span>
              <span className="text-[#142f45] ml-0.5">{m.value}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${currentColors.bar}`} style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Separator 2 */}
      <div className="h-10 w-[1px] bg-slate-100/80 shrink-0 hidden sm:block" />

      {/* Right Section: Health Ring, Monthly Change, Risk Pill */}
      <div className="flex items-center justify-end md:justify-center gap-3 md:gap-5 flex-none md:w-[260px] px-2 md:px-6 shrink-0">
        <HealthRing score={client.healthScore} size={44} />
        
        <span className={`text-sm font-extrabold w-10 text-right hidden sm:block ${trendUp ? 'text-emerald-600' : trendDown ? 'text-rose-600' : 'text-slate-400'}`}>
          {trendUp ? '+' : ''}{client.monthlyChange}
        </span>

        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${currentColors.badge}`}>
          {client.risk} Risk
        </span>
      </div>

      {/* Separator 3 */}
      <div className="h-10 w-[1px] bg-slate-100/80 shrink-0" />

      {/* Far Right: Chevron Arrow */}
      <div className="w-10 md:w-12 shrink-0 flex items-center justify-center">
        <ChevronRight size={18} className="text-slate-300 group-hover:text-[#142f45] transition-colors shrink-0" />
      </div>
    </button>
  );
}

const STATUS_GROUPS = [
  {
    key: 'critical',
    label: 'Critical & At-Risk',
    description: 'Needs immediate attention',
    dot: 'bg-rose-500',
    header: 'bg-rose-50 border-rose-100 text-rose-800',
    filter: (c: Client) => c.status === 'red' || c.risk === 'High' || c.risk === 'Critical',
    sort: (a: Client, b: Client) => a.healthScore - b.healthScore,
  },
  {
    key: 'watchlist',
    label: 'Watchlist',
    description: 'Monitor closely',
    dot: 'bg-amber-400',
    header: 'bg-amber-50 border-amber-100 text-amber-800',
    filter: (c: Client) => c.status === 'yellow',
    sort: (a: Client, b: Client) => a.healthScore - b.healthScore,
  },
  {
    key: 'healthy',
    label: 'Healthy',
    description: 'Performing well',
    dot: 'bg-emerald-500',
    header: 'bg-emerald-50 border-emerald-100 text-emerald-800',
    filter: (c: Client) => c.status === 'green',
    sort: (a: Client, b: Client) => b.healthScore - a.healthScore,
  },
] as const;

export function ClientStatusBoard({
  clients,
  onClientClick,
}: {
  clients: Client[];
  onClientClick: (name: string) => void;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(20,47,69,0.04)] border border-slate-100/90 overflow-hidden hover:shadow-[0_16px_40px_rgba(20,47,69,0.06)] hover:-translate-y-[2px] transition-all duration-300">
      <div className="px-6 py-4.5 border-b border-slate-100/80 flex flex-wrap items-center justify-between gap-3 bg-slate-50/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-[#142f45]">
            <Activity size={18} />
          </div>
          <div>
            <h2 className="font-bold text-[#142f45] text-sm md:text-base tracking-tight">Client Health Overview</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Grouped by status — click any client to open their dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
          {STATUS_GROUPS.map(g => {
            const count = clients.filter(g.filter).length;
            return (
              <div key={g.key} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${g.dot}`} />
                <span className="text-slate-400">{g.label}</span>
                <span className="font-extrabold text-[#142f45]">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Distribution bar */}
      <div className="px-6 py-4 bg-slate-50/20 border-b border-slate-100">
        <div className="flex h-3 bg-slate-100/70 rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
          {STATUS_GROUPS.map(g => {
            const count = clients.filter(g.filter).length;
            const pct = (count / clients.length) * 100;
            if (pct === 0) return null;
            const barColor = g.key === 'critical' ? 'bg-rose-500 shadow-[0_0_12px_rgba(239,68,68,0.2)]' : g.key === 'watchlist' ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.2)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
            return <div key={g.key} className={`${barColor} transition-all duration-300`} style={{ width: `${pct}%` }} title={`${g.label}: ${count}`} />;
          })}
        </div>
      </div>

      <div className="p-6 bg-slate-50/20 space-y-8">
        {STATUS_GROUPS.map(g => {
          const groupClients = clients.filter(g.filter).sort(g.sort);
          if (groupClients.length === 0) return null;

          const headerColor = g.key === 'critical' ? 'text-rose-600' : g.key === 'watchlist' ? 'text-amber-500' : 'text-emerald-600';
          const badgeBgColor = g.key === 'critical' ? 'bg-rose-50 text-rose-700 border-rose-100' : g.key === 'watchlist' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100';
          
          let HeaderIcon = AlertCircle;
          if (g.key === 'watchlist') HeaderIcon = AlertTriangle;
          if (g.key === 'healthy') HeaderIcon = CheckCircle2;

          return (
            <div key={g.key} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <HeaderIcon size={18} className={headerColor} />
                  <span className={`font-bold text-xs uppercase tracking-wider ${headerColor}`}>{g.label}</span>
                  <span className="text-xs text-slate-400 font-medium">({g.description})</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${badgeBgColor}`}>
                  {groupClients.length} client{groupClients.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {/* Cards List */}
              <div className="space-y-3">
                {groupClients.map(client => (
                  <div key={client.id}>
                    <ClientListRow
                      client={client}
                      onClick={() => onClientClick(client.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ClientHealthCard({ client, onClick }: { client: Client; onClick: () => void }) {
  const trendUp = client.monthlyChange > 0;
  const trendDown = client.monthlyChange < 0;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(20,47,69,0.05)] p-5 hover:shadow-[0_8px_30px_rgba(20,47,69,0.1)] hover:border-[#142f45]/15 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl ring-4 flex items-center justify-center text-sm font-bold shrink-0 ${AVATAR_COLORS[client.status]}`}>
          {clientInitials(client.name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-bold text-[#142f45] text-base truncate group-hover:text-[#ee683b] transition-colors">
                {client.name}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                {client.category} · {client.accountManager}
              </p>
            </div>
            <HealthRing score={client.healthScore} />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <MetricChip label="Traffic" value={client.breakdown.traffic} good={client.breakdown.traffic >= 80} />
            <MetricChip label="Leads" value={client.breakdown.leads} good={client.breakdown.leads >= 80} />
            <MetricChip label="Sentiment" value={client.breakdown.sentiment} good={client.breakdown.sentiment >= 80} />
            <MetricChip label="Delivery" value={client.breakdown.delivery} good={client.breakdown.delivery >= 80} />
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 text-sm">
              <span className={`font-semibold ${trendUp ? 'text-emerald-600' : trendDown ? 'text-rose-600' : 'text-slate-400'}`}>
                {trendUp ? '↑' : trendDown ? '↓' : '→'} {Math.abs(client.monthlyChange)} pts this month
              </span>
            </div>
            <RiskPill risk={client.risk} />
          </div>
        </div>
      </div>
    </button>
  );
}

export function ListRow({
  avatar,
  title,
  subtitle,
  value,
  valueAccent,
  onClick,
}: {
  avatar?: React.ReactNode;
  title: string;
  subtitle?: string;
  value?: React.ReactNode;
  valueAccent?: string;
  onClick?: () => void;
}) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer text-left border-0 bg-transparent group/row mb-1 last:mb-0"
      >
        {avatar}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[#142f45] text-sm group-hover/row:text-[#ee683b] transition-colors truncate">{title}</div>
          {subtitle && <div className="text-xs text-slate-400 mt-0.5 font-medium truncate">{subtitle}</div>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {value !== undefined && (
            <div className={`text-sm font-extrabold ${valueAccent || 'text-[#142f45]'}`}>{value}</div>
          )}
          <ChevronRight size={14} className="text-slate-300 group-hover/row:text-[#142f45] transition-colors" />
        </div>
      </button>
    );
  }

  return (
    <div className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-slate-50/50 bg-slate-50/20 mb-1 last:mb-0">
      {avatar}
      <div className="flex-1 min-w-0">
        <div className="font-bold text-[#142f45] text-sm truncate">{title}</div>
        {subtitle && <div className="text-xs text-slate-400 mt-0.5 font-medium truncate">{subtitle}</div>}
      </div>
      {value !== undefined && (
        <div className={`text-sm font-extrabold shrink-0 ${valueAccent || 'text-[#142f45]'}`}>{value}</div>
      )}
    </div>
  );
}

export function DonutChart({
  segments,
  size = 120,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let cumulative = 0;
  const gradient = segments
    .map(seg => {
      const start = (cumulative / total) * 100;
      cumulative += seg.value;
      const end = (cumulative / total) * 100;
      return `${seg.color} ${start}% ${end}%`;
    })
    .join(', ');

  return (
    <div className="flex items-center gap-5">
      <div
        className="rounded-full shrink-0"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${gradient})`,
          mask: 'radial-gradient(circle at center, transparent 55%, black 56%)',
          WebkitMask: 'radial-gradient(circle at center, transparent 55%, black 56%)',
        }}
      />
      <div className="space-y-2">
        {segments.map(seg => (
          <div key={seg.label} className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-slate-600">{seg.label}</span>
            <span className="font-bold text-[#142f45] ml-auto">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ManagerCard({
  name,
  clients,
  atRisk,
  avgHealth,
}: {
  name: string;
  clients: number;
  atRisk: number;
  avgHealth: number;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
      <div className="w-12 h-12 rounded-2xl bg-[#142f45] text-white flex items-center justify-center font-bold text-lg">
        {name[0]}
      </div>
      <div className="flex-1">
        <div className="font-bold text-[#142f45]">{name}</div>
        <div className="text-sm text-slate-500">{clients} clients · {atRisk} at risk</div>
      </div>
      <div className="text-right">
        <div className={`text-xl font-bold ${avgHealth >= 80 ? 'text-emerald-600' : avgHealth >= 65 ? 'text-amber-600' : 'text-rose-600'}`}>
          {avgHealth}
        </div>
        <div className="text-[10px] text-slate-500 uppercase font-medium">Avg Health</div>
      </div>
    </div>
  );
}
