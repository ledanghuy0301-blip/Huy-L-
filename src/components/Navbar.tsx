import React, { useState } from 'react';
import {
  ShieldCheck,
  QrCode,
  Award,
  LogIn,
  LogOut,
  Sparkles,
  Phone,
  PhoneCall,
  Database,
  BookOpen,
  History,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JudgePresentationModal } from './modals/JudgePresentationModal';
import { LinkQrModal } from './modals/LinkQrModal';

export const Navbar: React.FC = () => {
  const { user, logout, currentTab, setCurrentTab } = useApp();
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

  const navItems = [
    { to: '/', label: 'Kiểm chứng', icon: Sparkles },
    { to: '/cuoc-goi', label: 'Cuộc gọi', icon: Phone },
    { to: '/mo-phong', label: 'Thực nghiệm', icon: PhoneCall },
    { to: '/tra-cuu', label: 'Tra cứu số', icon: Database },
    { to: '/du-an', label: 'Dự án KHKT', icon: BookOpen },
    ...(user ? [{ to: '/lich-su', label: 'Lịch sử', icon: History }] : []),
  ];

  const navigate = (to: string) => {
    setCurrentTab(to);
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', to);
    }
  };

  return (
    <>
      <nav
        className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur"
        aria-label="Điều hướng chính"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 px-4 sm:px-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <ShieldCheck className="size-6 text-primary" />
            <span className="font-bold tracking-tight text-foreground">Kiểm chứng thật giả</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/20 via-primary/20 to-cyan-500/20 px-2 py-0.5 font-mono text-[10px] font-extrabold text-amber-400 shadow-sm">
              PRO MAX
            </span>
          </button>

          <div className="flex items-center gap-2 order-2 sm:order-3">
            <button
              onClick={() => setIsQrModalOpen(true)}
              title="Lấy link trực tiếp & Mã QR quét điện thoại"
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-card px-2.5 py-1.5 text-xs font-semibold text-primary hover:border-primary hover:bg-primary/10 transition-all shadow-sm"
            >
              <QrCode className="size-3.5" />
              <span className="hidden sm:inline">Lấy link / QR</span>
            </button>

            <button
              onClick={() => setIsJudgeModalOpen(true)}
              title="Mở chế độ thuyết trình Ban Giám Khảo"
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
            >
              <Award className="size-3.5" />
              <span className="hidden md:inline">Thuyết trình BGK</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden lg:inline font-mono">
                  {user.display_name}
                </span>
                <button
                  onClick={logout}
                  title="Đăng xuất"
                  aria-label="Đăng xuất"
                  className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary transition-all text-foreground"
              >
                <LogIn className="size-3.5" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>

          <div className="order-3 sm:order-2 flex w-full items-center gap-1 overflow-x-auto border-t border-border py-1.5 sm:w-auto sm:border-0 sm:py-0">
            {navItems.map(({ to, label, icon: Icon }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  currentTab === to
                    ? 'bg-secondary text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                }`}
              >
                <Icon className="size-3.5 sm:size-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <JudgePresentationModal
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
      />

      <LinkQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />
    </>
  );
};
