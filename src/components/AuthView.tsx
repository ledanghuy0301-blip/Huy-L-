import React, { useState } from 'react';
import { LogIn, Sparkles, ShieldCheck, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthView: React.FC = () => {
  const { login, setCurrentTab } = useApp();
  const [tab, setTab] = useState<'in' | 'up'>('in');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      login(email, displayName || undefined);
      setIsLoading(false);
      setCurrentTab('/lich-su');
      if (typeof window !== 'undefined' && window.history.pushState) {
        window.history.pushState({}, '', '/lich-su');
      }
    }, 400);
  };

  const handleGoogleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('ledanghuy0301@gmail.com', 'Lê Đăng Huy (Trưởng nhóm đề tài)');
      setIsLoading(false);
      setCurrentTab('/lich-su');
      if (typeof window !== 'undefined' && window.history.pushState) {
        window.history.pushState({}, '', '/lich-su');
      }
    }, 400);
  };

  const handleDemoAccount = (demoEmail: string, name: string) => {
    setEmail(demoEmail);
    setPassword('123456');
    setDisplayName(name);
  };

  const inputCls =
    'w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2.5 text-xs text-foreground outline-none transition-colors focus:border-primary placeholder:text-muted-foreground';

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-glow space-y-6 animate-fadeIn">
        <div className="text-center space-y-2">
          <div className="size-12 mx-auto rounded-full bg-primary/20 text-primary flex items-center justify-center">
            <ShieldCheck className="size-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {tab === 'in' ? 'Đăng nhập tài khoản' : 'Đăng ký tài khoản'}
          </h2>
          <p className="text-xs text-muted-foreground">
            Lưu trữ lịch sử kiểm chứng và báo cáo giám định khoa học KHKT
          </p>
        </div>

        <div className="flex rounded-xl bg-secondary/50 p-1 border border-border text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab('in')}
            className={`flex-1 rounded-lg py-2 transition-colors ${
              tab === 'in' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => setTab('up')}
            className={`flex-1 rounded-lg py-2 transition-colors ${
              tab === 'up' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Đăng ký
          </button>
        </div>

        <button
          type="button"
          onClick={handleGoogleDemoLogin}
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 py-2.5 text-xs font-bold text-foreground hover:border-primary hover:bg-secondary transition-all"
        >
          <Sparkles className="size-4 text-primary" />
          <span>Đăng nhập nhanh (Lê Đăng Huy - KHKT Demo)</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-border w-full" />
          <span className="bg-card px-3 text-[11px] font-mono text-muted-foreground uppercase">
            hoặc email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {tab === 'up' && (
            <div>
              <label className="block text-muted-foreground mb-1">Họ tên hiển thị:</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="VD: Lê Đăng Huy"
                className={inputCls}
              />
            </div>
          )}

          <div>
            <label className="block text-muted-foreground mb-1">Địa chỉ Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="VD: ledanghuy0301@gmail.com"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-muted-foreground mb-1">Mật khẩu:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputCls}
            />
          </div>

          {error && <p className="text-destructive font-medium text-xs">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity mt-2"
          >
            {isLoading ? 'Đang xác thực…' : tab === 'in' ? 'Đăng nhập' : 'Tạo tài khoản'}
          </button>
        </form>

        <div className="pt-2 border-t border-border/60 text-center space-y-2">
          <p className="text-[11px] text-muted-foreground">Tài khoản mẫu dùng thử ngay:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => handleDemoAccount('ledanghuy0301@gmail.com', 'Lê Đăng Huy')}
              className="rounded-lg border border-border px-2.5 py-1 text-[11px] text-primary hover:bg-secondary"
            >
              Lê Đăng Huy
            </button>
            <button
              type="button"
              onClick={() => handleDemoAccount('thanhhuyen.khkt@gmail.com', 'Nguyễn Nữ Thanh Huyên (GVHD)')}
              className="rounded-lg border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              GVHD Thanh Huyên
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
