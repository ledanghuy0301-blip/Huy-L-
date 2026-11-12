import React, { useState } from 'react';
import { Trash2, FileText, Globe, Phone, Image as ImageIcon, ChevronRight, ChevronDown, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HistoryItem } from '../types';

const typeLabels: Record<string, string> = {
  text: 'Văn bản',
  url: 'Trang web',
  call: 'Cuộc gọi',
  image: 'Hình ảnh / Tài liệu',
};

const typeIcons: Record<string, React.ElementType> = {
  text: FileText,
  url: Globe,
  call: Phone,
  image: ImageIcon,
};

export const HistoryView: React.FC = () => {
  const { user, history, removeHistoryItem, clearHistory, setCurrentTab } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Xoá mục này khỏi lịch sử?')) {
      removeHistoryItem(id);
      if (selectedId === id) setSelectedId(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) {
      clearHistory();
      setSelectedId(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <section className="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 text-center space-y-4">
          <Award className="size-12 text-primary mx-auto opacity-75" />
          <h2 className="text-2xl font-bold">Vui lòng đăng nhập để xem lịch sử</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Lịch sử kiểm chứng của bạn được lưu an toàn gắn liền với tài khoản nhà nghiên cứu hoặc người dùng.
          </p>
          <button
            onClick={() => {
              setCurrentTab('/auth');
              if (typeof window !== 'undefined' && window.history.pushState) {
                window.history.pushState({}, '', '/auth');
              }
            }}
            className="rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Đăng nhập ngay
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <section className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Lịch sử kiểm chứng
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Tài khoản: <strong className="text-primary font-mono">{user.display_name}</strong> ({user.email})
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="size-3.5" />
              <span>Xóa tất cả</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground space-y-3">
            <p className="font-semibold text-sm text-foreground">Chưa có bản ghi kiểm chứng nào</p>
            <p>Hãy thực hiện kiểm tra văn bản, đường link, hình ảnh hoặc cuộc gọi để lưu kết quả vào đây.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => {
              const Icon = typeIcons[item.kind] || FileText;
              const isExpanded = selectedId === item.id;
              const dateStr = new Date(item.created_at).toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });

              return (
                <div
                  key={item.id}
                  onClick={() => toggleExpand(item.id)}
                  className="rounded-2xl border border-border bg-card p-4 space-y-3 hover:border-primary/50 cursor-pointer transition-all shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-foreground">
                            {typeLabels[item.kind] || item.kind}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">{dateStr}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-md sm:max-w-xl">
                          {item.input}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full border ${
                          item.score >= 70
                            ? 'bg-success/15 text-success border-success/30'
                            : item.score >= 40
                            ? 'bg-warning/15 text-warning border-warning/30'
                            : 'bg-destructive/15 text-destructive border-destructive/30'
                        }`}
                      >
                        {item.verdict} · {Math.round(item.score)}%
                      </span>

                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-destructive"
                        title="Xóa bản ghi"
                      >
                        <Trash2 className="size-3.5" />
                      </button>

                      {isExpanded ? (
                        <ChevronDown className="size-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="size-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3 text-xs animate-fadeIn">
                      <div>
                        <span className="font-bold text-muted-foreground uppercase text-[10px] block mb-1">
                          Nội dung gốc:
                        </span>
                        <p className="font-mono text-xs text-foreground bg-background/60 p-2.5 rounded border border-border/60 break-words leading-relaxed">
                          {item.input}
                        </p>
                      </div>

                      {item.report?.summary && (
                        <div>
                          <span className="font-bold text-muted-foreground uppercase text-[10px] block mb-1">
                            Kết luận giám định:
                          </span>
                          <p className="text-xs text-foreground leading-relaxed">
                            {item.report.summary}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
