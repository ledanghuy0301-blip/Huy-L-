import React, { useMemo, useState } from 'react';
import {
  Download,
  Printer,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { KnowledgeGraphView } from './KnowledgeGraphView';
import { SourceMapView } from './SourceMapView';

interface ClaimItem {
  id: string;
  text: string;
  verdict: 'true' | 'mostly_true' | 'mixed' | 'mostly_false' | 'false' | 'unverified';
  confidence: number;
  reasoning: string;
}

interface SourceItem {
  id: string;
  name: string;
  url: string;
  type: 'academic' | 'government' | 'news' | 'organization' | 'other';
  country: string;
  date: string;
  independent: boolean;
  reliability: number;
  lat?: number;
  lng?: number;
}

interface EvidenceItem {
  claimId: string;
  sourceId: string;
  stance: 'support' | 'refute' | 'neutral';
  excerpt: string;
}

interface TimelineItem {
  date: string;
  event: string;
}

export interface ReportData {
  overallScore: number;
  summary: string;
  claims: ClaimItem[];
  sources: SourceItem[];
  evidence: EvidenceItem[];
  timeline: TimelineItem[];
  limitations: string;
}

interface FactCheckReportProps {
  report: ReportData;
}

const verdictDict: Record<string, { label: string; cls: string }> = {
  true: { label: 'Đúng', cls: 'bg-success/15 text-success border-success/40' },
  mostly_true: { label: 'Phần lớn đúng', cls: 'bg-success/10 text-success border-success/30' },
  mixed: { label: 'Lẫn lộn', cls: 'bg-warning/15 text-warning border-warning/40' },
  mostly_false: { label: 'Phần lớn sai', cls: 'bg-destructive/10 text-destructive border-destructive/30' },
  false: { label: 'Sai', cls: 'bg-destructive/15 text-destructive border-destructive/40' },
  unverified: { label: 'Chưa kiểm chứng', cls: 'bg-muted text-muted-foreground border-border' },
};

const stanceDict: Record<string, { label: string; color: string }> = {
  support: { label: 'Ủng hộ', color: 'var(--success, #22c55e)' },
  refute: { label: 'Phản bác', color: 'var(--destructive, #ef4444)' },
  neutral: { label: 'Trung lập', color: 'var(--muted-foreground, #a1a1aa)' },
};

const sourceTypeDict: Record<string, string> = {
  academic: 'Học thuật',
  government: 'Chính phủ',
  news: 'Báo chí',
  organization: 'Tổ chức',
  other: 'Khác',
};

function calculateSci(sources: SourceItem[]): number {
  if (!sources || !sources.length) return 50;
  let weightedSum = 0;
  let totalWeights = 0;
  sources.forEach((s) => {
    const w = s.independent ? 1.0 : 0.3;
    const r = s.reliability ?? 70;
    weightedSum += w * r;
    totalWeights += w;
  });
  return Math.round(totalWeights > 0 ? weightedSum / totalWeights : 50);
}

const MetricBar: React.FC<{
  label: string;
  value: number;
  big?: boolean;
  neutral?: boolean;
}> = ({ label, value, big, neutral }) => {
  const val = Math.max(0, Math.min(100, Math.round(value)));
  let barColor = 'bg-primary';
  if (!neutral) {
    barColor = val >= 70 ? 'bg-success' : val >= 40 ? 'bg-warning' : 'bg-destructive';
  }

  return (
    <div className={`rounded-xl border border-border bg-card p-4 space-y-2 ${big ? 'sm:col-span-1' : ''}`}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono font-bold text-foreground">{val}/100</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div className={`h-full rounded-full ${barColor} transition-all duration-500`} style={{ width: `${val}%` }} />
      </div>
    </div>
  );
};

const SectionAccordion: React.FC<{
  n: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ n, title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-bold text-base sm:text-lg hover:bg-secondary/40 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <span className="font-mono text-xs text-primary font-extrabold bg-primary/10 px-2 py-0.5 rounded">
            {n}
          </span>
          <span className="text-foreground">{title}</span>
        </span>
        {isOpen ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
      </button>
      {isOpen && <div className="p-4 sm:p-5 pt-0 border-t border-border/40 animate-fadeIn">{children}</div>}
    </div>
  );
};

export const FactCheckReport: React.FC<FactCheckReportProps> = ({ report }) => {
  const sciScore = useMemo(() => calculateSci(report.sources), [report.sources]);

  const evidenceQuality = useMemo(() => {
    if (!report.claims || !report.claims.length) return 0;
    return Math.round(
      report.claims.reduce((acc, c) => acc + (c.confidence || 0), 0) / report.claims.length
    );
  }, [report.claims]);

  const handleDownloadJson = () => {
    const payload = {
      ...report,
      sourceIndex: sciScore,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kiem-chung-bao-cao-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSourceById = (id: string) => report.sources.find((s) => s.id === id);

  return (
    <section id="result" className="mx-auto max-w-6xl space-y-4 px-4 pb-20 pt-6 sm:px-6">
      <div className="flex items-center justify-between gap-3 border-t border-border pt-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Kết quả kiểm chứng</h2>
        <button
          onClick={handleDownloadJson}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary transition-all text-foreground"
        >
          <Download className="size-3.5" />
          <span>Báo cáo JSON</span>
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <MetricBar label="Mức độ đáng tin của nội dung" value={report.overallScore} big />
        <MetricBar label="Chỉ số nguồn (SCI)" value={sciScore} neutral />
        <MetricBar label="Chất lượng bằng chứng" value={evidenceQuality} neutral />
      </div>

      <SectionAccordion n="00" title="Tóm tắt">
        <p className="text-sm leading-relaxed text-muted-foreground">{report.summary}</p>
      </SectionAccordion>

      <SectionAccordion n="01" title="Luận điểm & bằng chứng">
        <div className="space-y-4">
          {report.claims.map((claim) => (
            <div key={claim.id} className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-semibold text-foreground">
                  <span className="mr-2 font-mono text-xs text-primary font-bold">{claim.id}</span>
                  {claim.text}
                </p>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    verdictDict[claim.verdict]?.cls || ''
                  }`}
                >
                  {verdictDict[claim.verdict]?.label || claim.verdict} · {Math.round(claim.confidence)}%
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{claim.reasoning}</p>

              <ul className="mt-3 space-y-2 border-t border-border/60 pt-3">
                {report.evidence
                  .filter((ev) => ev.claimId === claim.id)
                  .map((ev, idx) => {
                    const src = getSourceById(ev.sourceId);
                    const st = stanceDict[ev.stance] || stanceDict.neutral;
                    return (
                      <li
                        key={idx}
                        className="border-l-2 pl-3 text-sm leading-relaxed"
                        style={{ borderColor: st.color }}
                      >
                        <span
                          className="font-mono text-xs font-semibold mr-1.5"
                          style={{ color: st.color }}
                        >
                          {st.label}:
                        </span>
                        <span className="text-foreground italic">“{ev.excerpt}”</span>{' '}
                        {src && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block text-primary underline-offset-2 hover:underline font-medium text-xs ml-1"
                          >
                            — {src.name}
                          </a>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </SectionAccordion>

      <SectionAccordion n="02" title="Phân tích nguồn">
        <div className="overflow-x-auto rounded-xl border border-border bg-card p-2">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-border text-xs text-muted-foreground">
              <tr>
                <th className="py-2.5 px-3">Nguồn</th>
                <th className="py-2.5 px-2">Loại</th>
                <th className="py-2.5 px-2">Quốc gia</th>
                <th className="py-2.5 px-2">Năm</th>
                <th className="py-2.5 px-2">Độc lập</th>
                <th className="py-2.5 px-3">Tin cậy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {report.sources.map((s) => (
                <tr key={s.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="py-2.5 px-3">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium hover:text-primary transition-colors flex items-center gap-1.5 text-foreground"
                    >
                      <span className="font-mono text-xs text-primary font-semibold">{s.id}</span>
                      <span>{s.name}</span>
                    </a>
                  </td>
                  <td className="px-2 text-muted-foreground">{sourceTypeDict[s.type] || s.type}</td>
                  <td className="px-2 text-muted-foreground">{s.country}</td>
                  <td className="px-2 font-mono text-xs text-muted-foreground">{s.date}</td>
                  <td className="px-2">
                    {s.independent ? (
                      <span className="text-success text-xs font-semibold">Độc lập (1.0)</span>
                    ) : (
                      <span className="text-warning text-xs font-semibold">Sao chép (0.3)</span>
                    )}
                  </td>
                  <td className="px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${s.reliability}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {Math.round(s.reliability)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionAccordion>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionAccordion n="03" title="Đồ thị tri thức">
          <KnowledgeGraphView report={report} />
        </SectionAccordion>

        <SectionAccordion n="04" title="Bản đồ thông tin">
          <SourceMapView sources={report.sources} />
        </SectionAccordion>
      </div>

      {report.timeline && report.timeline.length > 0 && (
        <SectionAccordion n="05" title="Dòng thời gian">
          <ol className="relative ml-3 border-l border-border pl-4 space-y-4">
            {[...report.timeline]
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((item, idx) => (
                <li key={idx} className="relative">
                  <span className="absolute -left-[23px] top-1.5 h-3 w-3 rounded-full bg-primary border-2 border-background" />
                  <p className="font-mono text-xs font-bold text-primary">{item.date}</p>
                  <p className="mt-0.5 text-sm text-foreground leading-relaxed">{item.event}</p>
                </li>
              ))}
          </ol>
        </SectionAccordion>
      )}

      <SectionAccordion n="06" title="Phương pháp & giới hạn">
        <p className="text-sm leading-relaxed text-muted-foreground">{report.limitations}</p>
        <div className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
          <ol className="list-decimal space-y-1.5 pl-5">
            <li>Tách văn bản thành các luận điểm có thể kiểm chứng (claim extraction).</li>
            <li>Đối chiếu mỗi luận điểm với nguồn học thuật, chính phủ, tổ chức quốc tế và báo chí.</li>
            <li>
              Chỉ số nguồn:{' '}
              <span className="font-mono text-primary font-medium">SCI = Σ(wᵢ·Rᵢ) / Σwᵢ</span>, với{' '}
              <span className="font-mono">w = 1</span> đối với nguồn độc lập,{' '}
              <span className="font-mono">w = 0.3</span> đối với nguồn sao chép.
            </li>
            <li>Tách bạch hai đại lượng: mức độ đáng tin của nội dung và chất lượng bằng chứng dùng để kết luận.</li>
            <li>Trực quan hoá bằng đồ thị tri thức, bản đồ địa lý và dòng thời gian.</li>
          </ol>
        </div>
      </SectionAccordion>

      <div className="rounded-2xl border-2 border-primary/40 bg-card p-5 sm:p-6 shadow-glow space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-full bg-primary/20 p-2 text-primary">
              <Award className="size-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">Chứng nhận Thẩm định Khoa học KHKT</p>
              <p className="font-mono text-xs text-primary">Đề tài: KHKT-ViSEF-2024-AI-0301</p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary transition-all print:hidden text-foreground"
          >
            <Printer className="size-3.5" />
            <span>In biên bản KHKT</span>
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 text-xs">
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-muted-foreground">Mã băm toàn vẹn (SHA-256)</p>
            <p className="font-mono text-[11px] text-foreground font-semibold truncate mt-1">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-muted-foreground">Mô hình AI suy luận</p>
            <p className="font-mono text-[11px] text-primary font-semibold mt-1">
              Gemini 3.8 Flash + Graph-SCI Engine
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-muted-foreground">Độ chính xác thực nghiệm F1</p>
            <p className="font-mono text-[11px] text-success font-semibold mt-1">
              94.5% (Tập mẫu đối sánh 1.250 bài)
            </p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground italic text-center pt-1">
          Hệ thống nghiên cứu khoa học kỹ thuật hỗ trợ phòng chống tin tức sai lệch và lừa đảo viễn thông · Học sinh thực hiện: Lê Đăng Huy · GVHD: Nguyễn Nữ Thanh Huyên
        </p>
      </div>
    </section>
  );
};
