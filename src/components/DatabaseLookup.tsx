import React, { useState } from 'react';
import {
  Database,
  Search,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Phone,
  Plus,
  X,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { initialBlacklist, BlacklistItem } from '../data/blacklist';

const riskBadges = {
  critical: { label: 'Rất nguy hiểm (Scam)', cls: 'border-destructive/40 bg-destructive/15 text-destructive' },
  high: { label: 'Nguy cơ cao', cls: 'border-orange-500/40 bg-orange-500/15 text-orange-400' },
  medium: { label: 'Cần cảnh giác', cls: 'border-warning/40 bg-warning/15 text-warning' },
  safe: { label: 'Chính thống xác thực', cls: 'border-success/40 bg-success/15 text-success' },
};

export const DatabaseLookup: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [items, setItems] = useState<BlacklistItem[]>(initialBlacklist);
  const [filterType, setFilterType] = useState<'all' | 'phone' | 'url'>('all');

  // Domain heuristic scanner
  const [scanInput, setScanInput] = useState<string>('');
  const [scanResult, setScanResult] = useState<any | null>(null);

  // Community report modal
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [newTarget, setNewTarget] = useState<string>('');
  const [newType, setNewType] = useState<'phone' | 'url'>('phone');
  const [newCategory, setNewCategory] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newSpoofed, setNewSpoofed] = useState<string>('');
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      item.target.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.spoofedEntity.toLowerCase().includes(q);
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesQuery && matchesType;
  });

  const handleDomainScan = (val?: string) => {
    const raw = (val || scanInput).trim().toLowerCase();
    if (!raw) return;
    if (val) setScanInput(val);

    const domain = raw.replace(/^https?:\/\//i, '').split('/')[0].split('?')[0];
    const parts = domain.split('.');
    const tld = parts[parts.length - 1];
    const riskyTlds = ['xyz', 'top', 'online', 'vip', 'cc', 'site', 'pw', 'icu', 'tk', 'ml', 'ga'];
    const spoofKeywords = ['vietcombank', 'techcombank', 'mbbank', 'vneid', 'dichvucong', 'congan', 'viettel', 'vnpt'];

    let score = 15;
    const reasons: string[] = [];

    if (riskyTlds.includes(tld)) {
      score += 45;
      reasons.push(`Đuôi tên miền quốc tế giá rẻ (.${tld}) thường xuyên bị tội phạm mạng lợi dụng phát tán mã độc.`);
    }

    const matchedKeyword = spoofKeywords.find((kw) => domain.includes(kw));
    if (matchedKeyword) {
      if (!domain.endsWith('.gov.vn') && !domain.endsWith('.vn') && !domain.endsWith('vietcombank.com.vn')) {
        score += 40;
        reasons.push(`Chứa từ khóa thương hiệu nhạy cảm "${matchedKeyword}" nhưng không thuộc máy chủ chính thức của tổ chức.`);
      }
    }

    if (domain.includes('-') || domain.split('.').length > 3) {
      score += 15;
      reasons.push('Cấu trúc tên miền phụ phân tầng phức tạp nhằm đánh lừa thanh địa chỉ trình duyệt.');
    }

    score = Math.min(100, score);
    const level = score >= 70 ? 'critical' : score >= 40 ? 'medium' : 'safe';

    setScanResult({
      domain,
      score,
      level,
      reasons,
      summary:
        score >= 70
          ? 'CẢNH BÁO CAO: Tên miền mang đầy đủ đặc trưng của trang lừa đảo mạo danh.'
          : score >= 40
          ? 'NGHI VẤN: Cần kiểm tra kỹ chứng chỉ SSL và nguồn gốc liên kết.'
          : 'AN TOÀN: Không phát hiện dấu hiệu lừa đảo phổ biến.',
    });
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTarget.trim()) return;

    const newItem: BlacklistItem = {
      id: `t-${Date.now()}`,
      type: newType,
      target: newTarget.trim(),
      category: newCategory.trim() || 'Báo cáo nghi vấn từ cộng đồng',
      riskLevel: 'critical',
      reportsCount: 1,
      lastReported: 'Vừa xong',
      description: newDescription.trim() || 'Người dùng phản ánh dấu hiệu lừa đảo.',
      spoofedEntity: newSpoofed.trim() || 'Chưa xác minh',
      source: 'Cộng đồng KHKT đóng góp',
    };

    setItems((prev) => [newItem, ...prev]);
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setIsReportModalOpen(false);
      setNewTarget('');
      setNewCategory('');
      setNewDescription('');
      setNewSpoofed('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <section className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6">
        <div className="border-b border-border pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
              Cơ sở dữ liệu An ninh Mạng
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              <Database className="size-3" />
              Blacklist &amp; Heuristic Scanner
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Tra Cứu Số Điện Thoại &amp; Website Lừa Đảo
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Đối soát số thuê bao, tài khoản và đường link độc hại với cơ sở dữ liệu đã được Trung tâm Giám sát An toàn Không gian mạng Quốc gia (NCSC) và cộng đồng xác thực.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-primary/40 bg-secondary/30 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-foreground flex items-center gap-2">
              <Globe className="size-4 text-primary" />
              Công cụ quét nhanh mã độc &amp; Tên miền Phishing:
            </span>
            <span className="font-mono text-xs text-primary font-bold">Heuristic v2.4</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="VD: vietcombank-smart-otp.cc hoặc vneid-dichvucong.top"
              className="flex-1 rounded-xl border border-border bg-card px-4 py-2 text-xs font-mono text-foreground outline-none focus:border-primary"
            />
            <button
              onClick={() => handleDomainScan()}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Search className="size-3.5" />
              <span>Quét tên miền</span>
            </button>
          </div>

          {scanResult && (
            <div className="rounded-xl border border-border bg-card p-4 space-y-2 text-xs animate-fadeIn">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-mono text-primary font-bold">{scanResult.domain}</span>
                <span className="font-mono font-bold text-destructive">
                  Nguy cơ: {scanResult.score}/100
                </span>
              </div>
              <p className="font-semibold text-foreground">{scanResult.summary}</p>
              {scanResult.reasons && scanResult.reasons.length > 0 && (
                <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px]">
                  {scanResult.reasons.map((r: string, idx: number) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="size-4 text-muted-foreground absolute left-3 top-2.5" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo số điện thoại, link web hoặc tên cơ quan bị mạo danh..."
                  className="w-72 sm:w-80 rounded-xl border border-border bg-card pl-9 pr-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-lg border border-border text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`rounded px-2.5 py-1 transition-colors ${
                    filterType === 'all' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilterType('phone')}
                  className={`rounded px-2.5 py-1 transition-colors ${
                    filterType === 'phone' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Số điện thoại
                </button>
                <button
                  onClick={() => setFilterType('url')}
                  className={`rounded px-2.5 py-1 transition-colors ${
                    filterType === 'url' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Website
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Plus className="size-3.5" />
              <span>Báo cáo số lừa đảo mới</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredItems.map((item) => {
              const badge = riskBadges[item.riskLevel] || riskBadges.critical;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border bg-card p-4 space-y-3 hover:border-primary/50 transition-all shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
                        {item.type === 'phone' ? <Phone className="size-4" /> : <Globe className="size-4" />}
                      </div>
                      <div>
                        <h4 className="font-mono text-sm font-bold text-foreground">{item.target}</h4>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>

                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>

                  <p className="text-xs text-foreground/90 leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>Mạo danh: <strong className="text-foreground">{item.spoofedEntity}</strong></span>
                      <span>Báo cáo: <strong className="font-mono text-foreground">{item.reportsCount} lượt</strong></span>
                      <span>Gần nhất: {item.lastReported}</span>
                    </div>
                    <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded">
                      Nguồn: {item.source}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
                Không tìm thấy số hoặc website nào phù hợp với từ khóa tìm kiếm.
              </div>
            )}
          </div>
        </div>
      </section>

      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl border-2 border-primary/50 bg-card p-6 shadow-2xl">
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            <h3 className="font-bold text-base text-foreground mb-1">
              Báo cáo đối tượng nghi vấn lừa đảo
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Dữ liệu của bạn sẽ được gửi tới cơ sở dữ liệu đối soát thực nghiệm của đề tài KHKT.
            </p>

            {reportSuccess ? (
              <div className="py-8 text-center space-y-2 text-success">
                <CheckCircle2 className="size-12 mx-auto" />
                <p className="font-bold text-sm">Gửi báo cáo thành công!</p>
                <p className="text-xs text-muted-foreground">Cảm ơn bạn đã chung tay bảo vệ cộng đồng.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
                <div>
                  <label className="block text-muted-foreground mb-1">Loại đối tượng:</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewType('phone')}
                      className={`flex-1 rounded-lg border py-1.5 font-semibold ${
                        newType === 'phone' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
                      }`}
                    >
                      Số điện thoại
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewType('url')}
                      className={`flex-1 rounded-lg border py-1.5 font-semibold ${
                        newType === 'url' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
                      }`}
                    >
                      Đường dẫn web
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1">
                    {newType === 'phone' ? 'Số điện thoại:' : 'Địa chỉ URL website:'}
                  </label>
                  <input
                    required
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    placeholder={newType === 'phone' ? 'VD: 024.7109.xxxx' : 'VD: https://vietcombank-otp.cc'}
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2 font-mono text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1">Tổ chức bị mạo danh:</label>
                  <input
                    value={newSpoofed}
                    onChange={(e) => setNewSpoofed(e.target.value)}
                    placeholder="VD: Bộ Công an, Cục Thuế, Viettel, Vietcombank..."
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1">Mô tả hành vi / Chiêu trò:</label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Kẻ gian nói gì, yêu cầu chuyển tiền hay gửi mã OTP..."
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="rounded-lg bg-secondary px-4 py-2 font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-5 py-2 font-bold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Gửi báo cáo
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
