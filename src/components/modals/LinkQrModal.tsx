import React, { useState } from 'react';
import { X, Globe, Copy, Check, ExternalLink, Smartphone, Cloud } from 'lucide-react';
import { QrCodeViewer } from '../common/QrCodeViewer';

interface LinkQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinkQrModal: React.FC<LinkQrModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-tl5mm64j6u3dgnro2wrigf-794275979562.asia-southeast1.run.app';
  const sharedUrl = 'https://ais-pre-tl5mm64j6u3dgnro2wrigf-794275979562.asia-southeast1.run.app';
  const devUrl = 'https://ais-dev-tl5mm64j6u3dgnro2wrigf-794275979562.asia-southeast1.run.app';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border-2 border-primary/50 bg-card p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="Đóng"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="flex size-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
            <Globe className="size-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground">Liên kết ứng dụng trực tiếp</h3>
            <p className="text-xs text-muted-foreground font-mono">Đang chạy trên Google Cloud Run</p>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-primary">
              <span className="flex items-center gap-1.5">
                <Cloud className="size-3.5" />
                Link nộp hồ sơ KHKT &amp; Trình chiếu BGK:
              </span>
              <span className="font-mono text-[10px] bg-primary/20 px-2 py-0.5 rounded font-bold">
                Online 24/7
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={sharedUrl}
                className="w-full rounded-lg border border-border bg-secondary px-3 py-2 font-mono text-xs text-foreground outline-none select-all focus:border-primary"
              />
              <button
                onClick={() => handleCopy(sharedUrl, 'shared')}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {copiedKey === 'shared' ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span>{copiedKey === 'shared' ? 'Đã sao chép!' : 'Sao chép'}</span>
              </button>
            </div>
            <div className="flex items-center justify-between pt-1">
              <a
                href={sharedUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              >
                <ExternalLink className="size-3" />
                <span>Mở trong tab mới</span>
              </a>
              <span className="text-[11px] text-muted-foreground">
                Chia sẻ công khai không cần tài khoản
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-secondary/30 p-4">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="shrink-0">
                <QrCodeViewer value={sharedUrl} size={140} showDownload={true} showOpenLink={false} />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <p className="font-bold text-xs sm:text-sm text-foreground flex items-center justify-center sm:justify-start gap-1.5">
                  <Smartphone className="size-4 text-primary" />
                  Quét mã QR bằng camera điện thoại
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ban Giám Khảo và người dùng có thể mở camera điện thoại (iOS / Android / Zalo) quét ngay
                  mã QR này để truy cập web và trải nghiệm tính năng{' '}
                  <strong className="text-foreground">nhận dạng giọng nói cuộc gọi qua micro</strong> thời gian thực.
                </p>
                <p className="text-[11px] text-primary/90 font-medium">
                  Mã QR được khởi tạo cục bộ chuẩn vector, quét được ngay lập tức không phụ thuộc mạng ngoài.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-3 flex items-center justify-between text-xs">
            <div className="min-w-0 pr-2">
              <p className="text-muted-foreground font-mono text-[11px]">Link môi trường Dev:</p>
              <p className="font-mono text-xs truncate text-foreground">{devUrl}</p>
            </div>
            <button
              onClick={() => handleCopy(devUrl, 'dev')}
              className="shrink-0 inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-[11px] font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              {copiedKey === 'dev' ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
              <span>{copiedKey === 'dev' ? 'Đã chép' : 'Chép'}</span>
            </button>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-4 text-center">
          <button
            onClick={onClose}
            className="rounded-xl bg-secondary px-6 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
