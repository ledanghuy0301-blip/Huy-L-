import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  QrCode,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { projectProfile } from '../../data/khktData';
import { QrCodeViewer } from '../common/QrCodeViewer';

interface JudgePresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JudgePresentationModal: React.FC<JudgePresentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide((prev) => Math.min(prev + 1, 5));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slides = [
    {
      subtitle: 'CUỘC THI KHOA HỌC KỸ THUẬT (KHKT)',
      title: projectProfile.titleVi,
      content: (
        <div className="space-y-6 text-center max-w-2xl mx-auto py-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-bold text-primary">
            <Award className="size-4" />
            Lĩnh vực: Phần mềm hệ thống &amp; Trí tuệ nhân tạo (Systems Software &amp; AI)
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-6 border-t border-border/80 text-left">
            <div className="rounded-xl border border-border bg-secondary/50 p-4">
              <p className="text-xs text-muted-foreground">Học sinh thực hiện đề tài</p>
              <p className="text-lg font-bold text-foreground mt-1">Lê Đăng Huy</p>
              <p className="text-xs text-primary font-medium">Trưởng nhóm nghiên cứu</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-4">
              <p className="text-xs text-muted-foreground">Giáo viên hướng dẫn khoa học</p>
              <p className="text-lg font-bold text-foreground mt-1">Nguyễn Nữ Thanh Huyên</p>
              <p className="text-xs text-muted-foreground">Cố vấn phương pháp luận</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      subtitle: 'VẤN ĐỀ NGHIÊN CỨU & TÍNH CẤP THIẾT',
      title: 'Thực trạng Tin giả & Lừa đảo Viễn thông tại Việt Nam',
      content: (
        <div className="grid gap-6 md:grid-cols-2 text-xs sm:text-sm leading-relaxed py-4">
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h4 className="font-bold text-base text-primary">1. Khủng hoảng Tin giả Y tế &amp; Xã hội</h4>
            <p className="text-muted-foreground">
              Thông tin sai lệch (như uống nước chanh chữa ung thư) lan truyền với tốc độ nhanh gấp 6 lần thông tin khoa học chính thống, khiến hàng chục nghìn người dân từ bỏ phác đồ điều trị y tế thực chứng.
            </p>
            <p className="text-muted-foreground">
              Các công cụ Fact-checking quốc tế (Snopes, FactCheck.org) hầu như không hỗ trợ tiếng Việt và thiếu cơ chế truy nguyên nguồn gốc bản đồ.
            </p>
          </div>
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-5 space-y-3">
            <h4 className="font-bold text-base text-destructive">2. Bẫy Lừa đảo Cuộc gọi Thao túng tâm lý</h4>
            <p className="text-foreground/90">
              Các tổ chức tội phạm xuyên biên giới mạo danh cơ quan công an, viện kiểm sát, tổng đài viễn thông, đe dọa bắt giam và chiếm đoạt hàng nghìn tỷ đồng mỗi năm.
            </p>
            <p className="text-foreground/90">
              Nạn nhân bị cô lập tâm lý và ép chuyển tiền hoặc cài mã độc Android .APK mà không có công cụ nào cảnh báo theo thời gian thực.
            </p>
          </div>
        </div>
      ),
    },
    {
      subtitle: 'PHƯƠNG PHÁP NGHIÊN CỨU & KIẾN TRÚC MÔ HÌNH',
      title: 'Hệ thống Đa Phương Thức Phân Rã Luận Điểm & Đồ Thị Tri Thức',
      content: (
        <div className="space-y-4 text-xs sm:text-sm py-2">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-mono text-primary font-bold text-xs uppercase">Bước 1: Phân rã nguyên tử</span>
              <h5 className="font-bold text-foreground text-sm mt-1">Atomic Claim Deconstruction</h5>
              <p className="text-xs text-muted-foreground mt-2">
                Sử dụng Gemini 3.8 Flash bóc tách văn bản phức tạp thành các luận điểm đơn lẻ có thể kiểm chứng độc lập.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-mono text-primary font-bold text-xs uppercase">Bước 2: Chỉ số SCI &amp; Đồ thị</span>
              <h5 className="font-bold text-foreground text-sm mt-1">Source Credibility Index (SCI)</h5>
              <p className="text-xs text-muted-foreground mt-2">
                Công thức toán học định lượng: Phân biệt nguồn gốc (w=1.0) và sao chép (w=0.3), dựng đồ thị quan hệ Entity-Claim.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-mono text-primary font-bold text-xs uppercase">Bước 3: Bản đồ &amp; Âm học SRI</span>
              <h5 className="font-bold text-foreground text-sm mt-1">Spatial Map &amp; Scam Radar</h5>
              <p className="text-xs text-muted-foreground mt-2">
                Chiếu tọa độ địa lý nguồn tin và nhận diện 4 chiều thao túng tâm lý cuộc gọi (Khẩn cấp, Sợ hãi, Cô lập, Đòi tiền).
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      subtitle: 'KẾT QUẢ THỰC NGHIỆM ĐỐI SÁNH',
      title: 'Đánh giá Định lượng trên Tập Mẫu 1.250 Bài & 400 Cuộc gọi',
      content: (
        <div className="space-y-5 text-xs sm:text-sm py-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="rounded-xl border border-primary/40 bg-secondary/50 p-4">
              <p className="text-xs text-muted-foreground font-sans">Độ chính xác (Accuracy)</p>
              <p className="text-3xl font-extrabold text-primary mt-1">94.6%</p>
              <p className="text-[11px] text-success mt-1">+16.4% vs Baseline</p>
            </div>
            <div className="rounded-xl border border-primary/40 bg-secondary/50 p-4">
              <p className="text-xs text-muted-foreground font-sans">Điểm F1-Score</p>
              <p className="text-3xl font-extrabold text-primary mt-1">94.5%</p>
              <p className="text-[11px] text-success mt-1">Cân bằng hoàn hảo</p>
            </div>
            <div className="rounded-xl border border-primary/40 bg-secondary/50 p-4">
              <p className="text-xs text-muted-foreground font-sans">Độ trễ xử lý (Latency)</p>
              <p className="text-3xl font-extrabold text-foreground mt-1">1.42s</p>
              <p className="text-[11px] text-muted-foreground mt-1">Real-time inference</p>
            </div>
            <div className="rounded-xl border border-primary/40 bg-secondary/50 p-4">
              <p className="text-xs text-muted-foreground font-sans">Kiểm định p-value</p>
              <p className="text-3xl font-extrabold text-primary mt-1">&lt; 0.001</p>
              <p className="text-[11px] text-success mt-1">Ý nghĩa thống kê cao</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 space-y-2 text-xs">
            <p className="font-bold text-foreground">Kết quả kiểm định chéo 5-Fold Cross Validation:</p>
            <p className="text-muted-foreground">
              Độ chính xác trung bình đạt 94.64% ± 0.45%, chỉ số AUC-ROC đạt 0.978 ± 0.003, chứng minh tính ổn định tuyệt đối của thuật toán đề xuất trên nhiều phân phối dữ liệu độc lập.
            </p>
          </div>
        </div>
      ),
    },
    {
      subtitle: 'TÍNH MỚI, SÁNG TẠO & GIÁ TRỊ THỰC TIỄN',
      title: 'Đóng góp Khoa học & Khả năng Chuyển giao Công nghệ',
      content: (
        <div className="grid gap-4 md:grid-cols-2 text-xs sm:text-sm py-2 leading-relaxed">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h5 className="font-bold text-primary text-sm flex items-center gap-1.5">
              <Sparkles className="size-4" />
              1. Tính mới &amp; Sáng tạo khoa học
            </h5>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-xs">
              <li>Lần đầu tiên tích hợp công thức SCI phân quyền nguồn tin độc lập vào LLM tiếng Việt.</li>
              <li>Trực quan hóa đồ thị tri thức quan hệ đối kháng giữa luận điểm và chứng cứ y học/luật pháp.</li>
              <li>Mô hình radar phát hiện 4 đòn tâm lý cuộc gọi lừa đảo chạy trực tiếp trên trình duyệt.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <h5 className="font-bold text-primary text-sm flex items-center gap-1.5">
              <Zap className="size-4" />
              2. Khả năng ứng dụng &amp; Chuyển giao
            </h5>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-xs">
              <li>Hoàn toàn miễn phí, không yêu cầu cài đặt ứng dụng phức tạp, chạy trên mọi thiết bị.</li>
              <li>Tích hợp cơ sở dữ liệu tra cứu phòng chống lừa đảo số và phòng thử nghiệm tương tác KHKT.</li>
              <li>Có thể mở rộng thành tiện ích mở rộng trình duyệt (Chrome Extension) và tổng đài cảnh báo viễn thông.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      subtitle: 'KẾT LUẬN & TRẢI NGHIỆM TRỰC TIẾP',
      title: 'Bảo vệ Không Gian Số và Người Dân Bằng Trí Tuệ Nhân Tạo',
      content: (
        <div className="py-2 space-y-4 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 rounded-2xl border border-primary/40 bg-secondary/30 p-4">
            <QrCodeViewer
              value="https://ais-pre-tl5mm64j6u3dgnro2wrigf-794275979562.asia-southeast1.run.app"
              size={135}
              showDownload={false}
              showOpenLink={true}
              title="Quét mã QR trải nghiệm"
            />
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success border border-success/30">
                <ShieldCheck className="size-3.5" />
                Hệ thống sẵn sàng vận hành thực tế
              </div>
              <h5 className="text-base font-bold text-foreground">
                Kính mời Ban giám khảo quét mã để trải nghiệm trực tiếp!
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Trải nghiệm ngay phòng thí nghiệm phản xạ cuộc gọi tại tab <strong className="text-primary font-mono">/mo-phong</strong> hoặc nói trực tiếp qua micro điện thoại tại tab <strong className="text-primary font-mono">/cuoc-goi</strong>.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-fadeIn">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-2xl border-2 border-primary/60 bg-card shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Award className="size-5 text-primary" />
            <span className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
              Chế độ thuyết trình Ban Giám Khảo ({currentSlide + 1}/6)
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Đóng"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
          <div className="border-b border-border/80 pb-4">
            <span className="font-mono text-xs font-bold text-primary uppercase tracking-wider">
              {slide.subtitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-1 tracking-tight">
              {slide.title}
            </h2>
          </div>

          <div className="pt-2">{slide.content}</div>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-5 py-3.5">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="size-4" />
              <span>Trước</span>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, 5))}
              disabled={currentSlide === 5}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              <span>Tiếp</span>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
