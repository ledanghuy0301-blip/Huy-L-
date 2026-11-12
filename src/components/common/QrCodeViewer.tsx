import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, ExternalLink } from 'lucide-react';

interface QrCodeViewerProps {
  value: string;
  size?: number;
  showDownload?: boolean;
  showOpenLink?: boolean;
  title?: string;
  subtitle?: string;
}

export const QrCodeViewer: React.FC<QrCodeViewerProps> = ({
  value,
  size = 180,
  showDownload = true,
  showOpenLink = false,
  title,
  subtitle,
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: size * 2,
      margin: 1,
      color: {
        dark: '#1f1f1f',
        light: '#ffffff',
      },
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, [value, size]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'khkt-factcheck-qr.png';
    a.click();
  };

  return (
    <div className="flex flex-col items-center text-center">
      {title && <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>}
      <div className="rounded-xl border border-border bg-white p-2.5 shadow-sm inline-block">
        {dataUrl ? (
          <img
            src={dataUrl}
            alt="QR Code"
            width={size}
            height={size}
            className="rounded"
            style={{ width: size, height: size }}
          />
        ) : (
          <div
            className="flex items-center justify-center bg-gray-100 rounded text-xs text-muted-foreground"
            style={{ width: size, height: size }}
          >
            Đang tạo QR...
          </div>
        )}
      </div>
      {subtitle && <p className="mt-2 text-[11px] text-muted-foreground max-w-xs">{subtitle}</p>}
      <div className="mt-3 flex items-center gap-2">
        {showDownload && (
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/70 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <Download className="size-3.5" />
            <span>Tải QR</span>
          </button>
        )}
        {showOpenLink && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/70 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <ExternalLink className="size-3.5" />
            <span>Mở link</span>
          </a>
        )}
      </div>
    </div>
  );
};
