import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  PhoneCall,
  Volume2,
  VolumeX,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  PhoneOff,
  Radio,
  SlidersVertical,
} from 'lucide-react';
import { sampleScamCalls, SampleCall } from '../data/sampleCalls';
import { useApp } from '../context/AppContext';
import { verifyCallAccurately } from '../services/verificationEngine';

const statusConfig = {
  safe: { label: 'An toàn', cls: 'border-success/40 bg-success/10 text-success' },
  suspicious: { label: 'Đáng ngờ', cls: 'border-warning/40 bg-warning/10 text-warning' },
  scam: { label: 'Nguy cơ lừa đảo cao', cls: 'border-destructive/40 bg-destructive/10 text-destructive' },
};

const AudioWaveCanvas: React.FC<{ isListening: boolean }> = ({ isListening }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const mid = h / 2;

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isListening ? 'oklch(82% 0.15 175)' : 'oklch(34% 0.01 250)';

      for (let x = 0; x < w; x++) {
        const freq = isListening ? 0.05 : 0.02;
        const amp = isListening ? 12 * Math.sin(step * 0.1 + x * 0.02) : 2;
        const y = mid + Math.sin(x * freq + step) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      step += isListening ? 0.15 : 0.02;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isListening]);

  return <canvas ref={canvasRef} width={400} height={40} className="w-full h-10 rounded-lg" />;
};

export const CallAnalyzer: React.FC = () => {
  const { addHistoryItem } = useApp();
  const [transcript, setTranscript] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('024.7109.8888');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'vi-VN';

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscript((prev) => `${prev} ${current}`.trim());
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API. Bạn có thể chọn mẫu cuộc gọi bên dưới để thử nghiệm.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSelectSample = (sample: SampleCall) => {
    setTranscript(sample.transcript);
    setPhoneNumber(sample.phone);
    setAnalysis(null);
    setSaveMessage('');
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if (!transcript) return;
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.05;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;
    setSaveMessage('');

    try {
      let result;
      try {
        const resp = await fetch('/api/call-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript, phoneNumber }),
        });
        if (!resp.ok) throw new Error();
        result = await resp.json();
      } catch {
        result = verifyCallAccurately(transcript, phoneNumber);
      }

      setAnalysis(result);

      const saved = addHistoryItem('call', transcript, result, result.risk, result.level);
      if (saved) {
        setSaveMessage('Đã lưu kết quả phân tích cuộc gọi vào lịch sử.');
      } else {
        setSaveMessage('Đăng nhập tài khoản để tự động lưu kết quả vào lịch sử.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setTranscript('');
    setAnalysis(null);
    setSaveMessage('');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
  };

  const levelInfo = analysis ? statusConfig[analysis.level as keyof typeof statusConfig] || statusConfig.scam : statusConfig.scam;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <section className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6">
        <div className="border-b border-border pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
              Cuộc gọi &amp; Âm học AI
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              <Radio className="size-3" />
              Scam Radar &amp; Voice Analysis
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Phân Tích Bẫy Tâm Lý &amp; Nhận Diện Cuộc Gọi Lừa Đảo
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thu âm trực tiếp qua micro hoặc nhập nội dung cuộc thoại. AI bóc tách 4 đòn tâm lý (Khẩn cấp, Sợ hãi, Cô lập, Đòi tiền) và đối chiếu với cơ sở dữ liệu số lừa đảo.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Chọn kịch bản cuộc gọi mẫu thực tế:
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {sampleScamCalls.map((call) => (
              <button
                key={call.id}
                onClick={() => handleSelectSample(call)}
                className="flex flex-col text-left rounded-xl border border-border bg-card p-3.5 hover:border-primary/60 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground line-clamp-1">{call.title}</span>
                  <span className="font-mono text-[10px] text-destructive bg-destructive/15 px-2 py-0.5 rounded font-bold">
                    {call.phone}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                  {call.transcript}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleListening}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                      isListening
                        ? 'bg-destructive text-destructive-foreground animate-pulse'
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                  >
                    {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                    <span>{isListening ? 'Dừng ghi âm' : 'Bật Micro nghe trực tiếp'}</span>
                  </button>

                  <button
                    onClick={handleSpeak}
                    disabled={!transcript}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary disabled:opacity-40 transition-colors"
                  >
                    {isPlayingAudio ? <VolumeX className="size-4 text-warning" /> : <Volume2 className="size-4" />}
                    <span>{isPlayingAudio ? 'Dừng đọc' : 'Mô phỏng giọng kẻ gian'}</span>
                  </button>
                </div>

                <button
                  onClick={handleClear}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground text-xs"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>

              <div className="rounded-xl border border-border bg-secondary/30 p-3">
                <AudioWaveCanvas isListening={isListening || isPlayingAudio} />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Số điện thoại gọi đến:</span>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="VD: 024.7109.8888"
                    className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  rows={6}
                  placeholder="Nội dung cuộc gọi được nhận diện từ micro hoặc dán văn bản vào đây..."
                  className="w-full resize-y rounded-xl border border-border bg-secondary/20 p-3 text-xs leading-relaxed text-foreground outline-none focus:border-primary placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-xs text-muted-foreground">
                  {transcript.length} ký tự
                </span>
                <button
                  onClick={handleAnalyze}
                  disabled={!transcript.trim()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-opacity"
                >
                  <Sparkles className="size-3.5" />
                  <span>Phân tích rủi ro cuộc gọi</span>
                </button>
              </div>
            </div>

            {saveMessage && (
              <p className="text-xs font-medium text-success text-center">{saveMessage}</p>
            )}
          </div>

          <div className="lg:col-span-5">
            {analysis ? (
              <div className="space-y-4 rounded-2xl border-2 border-border bg-card p-5 shadow-glow animate-fadeIn">
                <div className={`rounded-xl border p-4 ${levelInfo.cls}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      Chỉ số Scam Risk Index (SRI)
                    </span>
                    <span className="font-mono text-xs bg-background/60 px-2 py-0.5 rounded font-bold">
                      {Math.round(analysis.risk)}/100
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mt-2">{levelInfo.label}</h3>
                  <p className="text-xs leading-relaxed mt-1 text-foreground/90">{analysis.summary}</p>
                </div>

                <div className="rounded-xl border border-border bg-secondary/40 p-4 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-primary">
                    Phân tích 4 đòn tâm lý thao túng (SRI Multi-dimension):
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>1. Tạo tâm lý gấp gáp &amp; đe dọa thời gian</span>
                        <span className="font-mono font-bold text-destructive">95/100</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-destructive rounded-full" style={{ width: '95%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>2. Giả danh uy quyền cơ quan pháp luật</span>
                        <span className="font-mono font-bold text-destructive">90/100</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-destructive rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>3. Đòi hỏi chuyển tiền / Mở tài khoản</span>
                        <span className="font-mono font-bold text-destructive">95/100</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-destructive rounded-full" style={{ width: '95%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>4. Ép cô lập / Cấm nói người thân</span>
                        <span className="font-mono font-bold text-destructive">95/100</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-destructive rounded-full" style={{ width: '95%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {analysis.signs && analysis.signs.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-bold text-xs text-foreground flex items-center gap-1.5">
                      <AlertTriangle className="size-3.5 text-destructive" />
                      Lời thoại chứa bẫy tâm lý:
                    </h5>
                    <div className="space-y-1.5">
                      {analysis.signs.map((sign: any, idx: number) => (
                        <div key={idx} className="rounded-lg bg-secondary/50 p-2.5 text-xs border border-border">
                          <p className="font-semibold text-destructive italic">“{sign.quote}”</p>
                          <p className="text-[11px] text-muted-foreground mt-1">{sign.explanation || sign.explain}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.advice && analysis.advice.length > 0 && (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 space-y-1.5 text-xs">
                    <span className="font-bold text-primary flex items-center gap-1.5">
                      <ShieldCheck className="size-4" />
                      Khuyến nghị phòng vệ khẩn cấp:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px]">
                      {analysis.advice.map((adv: string, idx: number) => (
                        <li key={idx} className="text-foreground/90">{adv}</li>
                      ))}
                      <li className="font-bold text-destructive">
                        Gọi ngay Tổng đài phản ánh tin nhắn &amp; cuộc gọi rác: 156 hoặc 5656 (miễn phí).
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center space-y-3 bg-secondary/10">
                <PhoneCall className="size-10 text-muted-foreground/40 mx-auto" />
                <h4 className="font-semibold text-sm text-foreground">Chưa có dữ liệu phân tích</h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Hãy nhấn &quot;Bật Micro&quot; hoặc chọn một trong các kịch bản mẫu ở trên, sau đó nhấn &quot;Phân tích rủi ro cuộc gọi&quot;.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
