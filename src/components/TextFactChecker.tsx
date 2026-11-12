import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Globe,
  Image as ImageIcon,
  SlidersVertical,
  Trash2,
  LoaderCircle,
  ArrowRight,
  ShieldAlert,
  QrCode,
  Check,
  Copy,
  BookOpen,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QrCodeViewer } from './common/QrCodeViewer';
import { FactCheckReport, ReportData } from './reports/FactCheckReport';
import { ImageVerifier } from './ImageVerifier';
import { verifyContentAccurately } from '../services/verificationEngine';

const sampleQueries = [
  'Uống nước chanh nóng mỗi sáng có thể chữa khỏi ung thư và giúp giảm 5kg trong một tuần.',
  'Cơ quan công an gọi điện thông báo căn cước công dân dính líu rửa tiền và yêu cầu chuyển tiền vào tài khoản phong tỏa.',
  'Ngân hàng Nhà nước chuẩn bị đổi tiền và phát hành tiền mới trong năm nay.',
  'Uống rượu bia lái xe theo Nghị định 100 bị phạt kịch khung 40 triệu đồng và tước bằng lái xe.',
  'Việt Nam là quốc gia xuất khẩu gạo lớn thứ hai thế giới trong nhiều năm gần đây.',
  'Vạn Lý Trường Thành là công trình nhân tạo duy nhất có thể nhìn thấy bằng mắt thường từ Mặt Trăng.',
];

const sampleCategories = ['Sức khỏe', 'An ninh', 'Kinh tế', 'Pháp luật', 'Nông nghiệp', 'Khoa học'];

export const TextFactChecker: React.FC = () => {
  const { user, addHistoryItem, setCurrentTab } = useApp();
  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'image'>('text');
  const [textInput, setTextInput] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [report, setReport] = useState<ReportData | null>(null);

  // SCI tuning parameters
  const [showSciConfig, setShowSciConfig] = useState<boolean>(false);
  const [wIndep, setWIndep] = useState<number>(1.0);
  const [wCopy, setWCopy] = useState<number>(0.3);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleClear = () => {
    setTextInput('');
    setUrlInput('');
    setErrorMsg('');
    setStatusMsg('');
    setReport(null);
  };

  const handleSelectSample = (sample: string) => {
    setActiveTab('text');
    setTextInput(sample);
    setErrorMsg('');
    setStatusMsg('');
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setErrorMsg('');
    setStatusMsg('');
    const inputVal = activeTab === 'url' ? urlInput.trim() : textInput.trim();

    try {
      let result: ReportData;
      try {
        const resp = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(activeTab === 'url' ? { url: inputVal } : { text: inputVal }),
        });
        if (!resp.ok) throw new Error('Máy chủ phản hồi lỗi');
        result = await resp.json();
      } catch {
        result = verifyContentAccurately(activeTab === 'url' ? { url: inputVal } : { text: inputVal });
      }

      setReport(result);

      const verdict =
        result.overallScore >= 70 ? 'Đúng' : result.overallScore >= 40 ? 'Lẫn lộn' : 'Sai';
      const saved = addHistoryItem(activeTab, inputVal, result, result.overallScore, verdict);
      if (saved) {
        setStatusMsg('Đã lưu vào lịch sử kiểm chứng của bạn.');
      } else {
        setStatusMsg('Đăng nhập tài khoản để tự động lưu kết quả vào lịch sử.');
      }

      setTimeout(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setErrorMsg(err instanceof Error ? err.message : 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const isVerifyDisabled =
    isLoading ||
    (activeTab === 'text' ? textInput.trim().length < 10 : !/^https?:\/\/\S+\.\S+/.test(urlInput.trim()));

  const appUrl = 'https://ais-pre-tl5mm64j6u3dgnro2wrigf-794275979562.asia-southeast1.run.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const navigateToProject = () => {
    setCurrentTab('/du-an');
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', '/du-an');
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-7 sm:px-6 sm:pt-10">
        <div className="mb-6 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/20 via-primary/20 to-cyan-500/20 px-3 py-0.5 text-xs font-mono font-extrabold text-amber-400 shadow-sm">
              ★ PHIÊN BẢN PRO MAX
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Cuộc thi KHKT
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              <Sparkles className="size-3" />
              Đa phương thức AI v4.5
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-5xl tracking-tight text-foreground">
            Kiểm chứng thật giả{' '}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-amber-400 bg-clip-text text-transparent font-extrabold">
              PRO MAX
            </span>
          </h1>

          <p className="mt-2 text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Thông tin xác thực · Bằng chứng đa tầng · Nguồn độc lập</span>
            <span className="hidden sm:inline font-mono text-xs text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
              Gemini 3.8 Flash + Knowledge Graph + SCI Engine
            </span>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 rounded-xl bg-secondary/50 p-1 border border-border">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('text');
                    setReport(null);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === 'text'
                      ? 'bg-card text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileText className="size-3.5" />
                  <span>Văn bản</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('url');
                    setReport(null);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === 'url'
                      ? 'bg-card text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Globe className="size-3.5" />
                  <span>Trang web</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('image');
                    setReport(null);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === 'image'
                      ? 'bg-card text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <ImageIcon className="size-3.5" />
                  <span>Hình ảnh / Deepfake</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {activeTab !== 'image' && (
                  <button
                    type="button"
                    onClick={() => setShowSciConfig(!showSciConfig)}
                    title="Cấu hình tham số mô hình KHKT (SCI)"
                    aria-label="Cấu hình tham số mô hình KHKT (SCI)"
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      showSciConfig
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <SlidersVertical className="size-3.5" />
                    <span className="hidden sm:inline">Thông số KHKT</span>
                  </button>
                )}

                <button
                  type="button"
                  title="Xóa nội dung"
                  aria-label="Xóa nội dung"
                  disabled={isLoading}
                  onClick={handleClear}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            {activeTab === 'image' ? (
              <div className="mt-4">
                <ImageVerifier />
              </div>
            ) : (
              <>
                {showSciConfig && (
                  <div className="mt-3 rounded-xl border border-primary/30 bg-secondary/60 p-4 space-y-3 text-xs animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-border/60 pb-2">
                      <span className="font-bold text-foreground flex items-center gap-1.5">
                        <Award className="size-3.5 text-primary" />
                        Điều chỉnh trọng số thực nghiệm SCI
                      </span>
                      <span className="font-mono text-[11px] text-primary">
                        SCI = Σ(wᵢ·Rᵢ) / Σwᵢ
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="flex justify-between text-muted-foreground mb-1">
                          <span>Trọng số Nguồn Độc Lập (w_indep):</span>
                          <span className="font-mono text-primary font-bold">{wIndep.toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="2.0"
                          step="0.1"
                          value={wIndep}
                          onChange={(e) => setWIndep(parseFloat(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-muted-foreground mb-1">
                          <span>Trọng số Nguồn Sao Chép (w_copy):</span>
                          <span className="font-mono text-warning font-bold">{wCopy.toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.1"
                          value={wCopy}
                          onChange={(e) => setWCopy(parseFloat(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                  <label htmlFor="check-input" className="block px-4 pt-4 text-sm font-semibold text-foreground">
                    {activeTab === 'url' ? 'Đường dẫn bài viết' : 'Nội dung cần kiểm chứng'}
                  </label>

                  {activeTab === 'url' ? (
                    <input
                      id="check-input"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      type="url"
                      placeholder="https://..."
                      className="min-h-32 w-full bg-transparent px-4 py-4 text-sm outline-none placeholder:text-muted-foreground text-foreground"
                    />
                  ) : (
                    <textarea
                      id="check-input"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value.slice(0, 8000))}
                      rows={7}
                      placeholder="Dán nội dung cần kiểm chứng..."
                      className="block w-full resize-y bg-transparent px-4 py-3 text-sm leading-relaxed outline-none placeholder:text-muted-foreground text-foreground"
                    />
                  )}

                  <div className="flex items-center justify-between gap-2 border-t border-border bg-secondary/40 px-4 py-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {activeTab === 'text' ? `${textInput.length}/8000` : 'Tối đa 8000 ký tự'}
                    </span>
                    <button
                      disabled={isVerifyDisabled}
                      onClick={handleVerify}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <LoaderCircle className="size-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="size-3.5" />
                      )}
                      <span>{isLoading ? 'Đang phân tích…' : 'Kiểm chứng'}</span>
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <p role="alert" className="mt-3 text-sm text-destructive font-medium">
                    {errorMsg}
                  </p>
                )}

                {statusMsg && (
                  <p role="status" className="mt-3 text-sm text-success font-medium">
                    {statusMsg}
                  </p>
                )}

                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Nội dung mẫu
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sampleQueries.map((query, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSample(query)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary transition-all text-left text-foreground"
                      >
                        <span>{sampleCategories[idx] || 'Mẫu'}</span>
                        <ArrowRight className="size-3 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-5 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div>
              <p className="text-xs text-muted-foreground">Học sinh thực hiện</p>
              <p className="mt-1 font-semibold text-sm text-foreground">Lê Đăng Huy</p>
              <p className="mt-4 text-xs text-muted-foreground">Giáo viên hướng dẫn</p>
              <p className="mt-1 font-semibold text-sm text-foreground">Nguyễn Nữ Thanh Huyên</p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShieldAlert className="size-4 text-warning" />
                <span>Lưu ý</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Kết quả AI có thể sai. Cần đối chiếu nguồn gốc trước khi chia sẻ hoặc đưa ra quyết định.
              </p>
            </div>

            <div className="rounded-xl border-2 border-primary/40 bg-secondary/40 p-4 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-primary">
                <span className="flex items-center gap-1.5">
                  <QrCode className="size-4" />
                  Mã QR &amp; Link Google Cloud
                </span>
                <span className="font-mono text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold">
                  Quét ngay
                </span>
              </div>
              <div className="flex justify-center py-1">
                <QrCodeViewer
                  value={appUrl}
                  size={145}
                  showDownload={true}
                  showOpenLink={true}
                  subtitle="Mở camera điện thoại quét mã để trải nghiệm micro kiểm tra cuộc gọi"
                />
              </div>
              <div className="space-y-1.5 pt-1 border-t border-border/60">
                <p className="font-mono text-[10px] text-muted-foreground break-all bg-background/80 p-1.5 rounded border border-border select-all">
                  {appUrl}
                </p>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {copiedLink ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span>{copiedLink ? 'Đã sao chép link!' : 'Sao chép link nộp bài'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={navigateToProject}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3.5 py-2.5 text-xs font-semibold hover:border-primary hover:text-primary transition-all text-foreground"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="size-4 text-primary" />
                <span>Hồ sơ dự án</span>
              </span>
              <ArrowRight className="size-3.5 text-muted-foreground" />
            </button>
          </aside>
        </div>
      </section>

      {report && <FactCheckReport report={report} />}
    </div>
  );
};
