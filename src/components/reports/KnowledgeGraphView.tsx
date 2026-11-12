import React, { useMemo, useState } from 'react';

interface ClaimItem {
  id: string;
  text: string;
  verdict?: string;
}

interface SourceItem {
  id: string;
  name: string;
  url?: string;
  type?: string;
  country?: string;
}

interface EvidenceItem {
  claimId: string;
  sourceId: string;
  stance: 'support' | 'refute' | 'neutral';
  excerpt: string;
}

interface KnowledgeGraphProps {
  report: {
    claims: ClaimItem[];
    sources: SourceItem[];
    evidence: EvidenceItem[];
  };
}

const stanceColors: Record<string, string> = {
  support: 'var(--success, #22c55e)',
  refute: 'var(--destructive, #ef4444)',
  neutral: 'var(--muted-foreground, #a1a1aa)',
};

export const KnowledgeGraphView: React.FC<KnowledgeGraphProps> = ({ report }) => {
  const [selectedNode, setSelectedNode] = useState<{ id: string; label: string; type: string } | null>(null);

  const nodePositions = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    const claims = report.claims || [];
    const sources = report.sources || [];

    claims.forEach((c, idx, arr) => {
      const angle = (idx / Math.max(1, arr.length)) * Math.PI * 2 - Math.PI / 2;
      pos[c.id] = {
        x: 200 + Math.cos(angle) * 70,
        y: 180 + Math.sin(angle) * 70,
      };
    });

    sources.forEach((s, idx, arr) => {
      const angle = (idx / Math.max(1, arr.length)) * Math.PI * 2;
      pos[s.id] = {
        x: 200 + Math.cos(angle) * 150,
        y: 180 + Math.sin(angle) * 140,
      };
    });

    return pos;
  }, [report]);

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <svg viewBox="0 0 400 370" className="w-full h-auto select-none">
        {(report.evidence || []).map((ev, idx) => {
          const cPos = nodePositions[ev.claimId];
          const sPos = nodePositions[ev.sourceId];
          if (!cPos || !sPos) return null;
          const strokeColor = stanceColors[ev.stance] || 'var(--muted-foreground)';
          return (
            <line
              key={idx}
              x1={cPos.x}
              y1={cPos.y}
              x2={sPos.x}
              y2={sPos.y}
              stroke={strokeColor}
              strokeOpacity={0.75}
              strokeWidth={1.8}
            />
          );
        })}

        {(report.sources || []).map((s) => {
          const pos = nodePositions[s.id];
          if (!pos) return null;
          const isSelected = selectedNode?.id === s.id;
          return (
            <g
              key={s.id}
              className="cursor-pointer transition-transform"
              onClick={() => setSelectedNode({ id: s.id, label: s.name, type: 'Nguồn tin' })}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isSelected ? 14 : 11}
                className="fill-secondary stroke-primary transition-all"
                strokeWidth={isSelected ? 3 : 1.5}
              />
              <text
                x={pos.x}
                y={pos.y + 3.5}
                textAnchor="middle"
                className="fill-foreground font-mono text-[9px] font-bold pointer-events-none"
              >
                {s.id}
              </text>
            </g>
          );
        })}

        {(report.claims || []).map((c) => {
          const pos = nodePositions[c.id];
          if (!pos) return null;
          const isSelected = selectedNode?.id === c.id;
          return (
            <g
              key={c.id}
              className="cursor-pointer transition-transform"
              onClick={() => setSelectedNode({ id: c.id, label: c.text, type: 'Luận điểm' })}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isSelected ? 16 : 13}
                className="fill-primary stroke-background transition-all"
                strokeWidth={2}
              />
              <text
                x={pos.x}
                y={pos.y + 3.5}
                textAnchor="middle"
                className="fill-primary-foreground font-mono text-[10px] font-extrabold pointer-events-none"
              >
                {c.id}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-success" /> Ủng hộ
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-destructive" /> Bác bỏ
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-muted-foreground" /> Trung lập
          </span>
        </div>
        <span className="font-mono text-[10px]">Lõi = Luận điểm | Vành = Nguồn</span>
      </div>

      {selectedNode && (
        <div className="mt-2 rounded-lg border border-border bg-secondary/50 p-2 text-xs">
          <span className="font-mono text-[10px] text-primary font-bold">
            [{selectedNode.type}] {selectedNode.id}:
          </span>{' '}
          <span className="text-foreground">{selectedNode.label}</span>
        </div>
      )}
    </div>
  );
};
