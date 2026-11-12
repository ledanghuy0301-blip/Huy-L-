import React, { useState } from 'react';
import {
  Award,
  PhoneCall,
  PhoneOff,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Volume2,
  ArrowRight,
} from 'lucide-react';
import { fraudScenarios, Scenario } from '../data/scenarios';

export const LabExperiment: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<Scenario>(fraudScenarios[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentStep = currentScenario.steps[currentStepIndex];

  const handleSelectScenario = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setCurrentStepIndex(0);
    setScore(0);
    setSelectedOptionIndex(null);
    setIsCompleted(false);
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(idx);
    const chosen = currentStep.options[idx];
    setScore((prev) => prev + chosen.points);
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < currentScenario.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setScore(0);
    setSelectedOptionIndex(null);
    setIsCompleted(false);
  };

  const maxPoints = currentScenario.steps.length * 50;
  const scorePercent = maxPoints > 0 ? Math.round((score / maxPoints) * 100) : 0;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <section className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6">
        <div className="border-b border-border pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
              KHKT Interactive Lab
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              <Award className="size-3" />
              Mô phỏng Phản xạ Chống Lừa đảo
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Phòng Thử Nghiệm Tình Huống Cuộc Gọi
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Trực tiếp tương tác với các kịch bản lừa đảo công nghệ cao thực tế. Rèn luyện phản xạ an toàn và bóc tách các đòn thao túng tâm lý.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
          {fraudScenarios.map((s) => {
            const isSelected = currentScenario.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectScenario(s)}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-sm'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div
                  className={`size-8 rounded-lg border flex items-center justify-center font-bold text-xs ${s.avatarColor}`}
                >
                  <PhoneCall className="size-4" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {s.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{s.category}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="text-center space-y-2 py-2">
              <div
                className={`size-16 mx-auto rounded-full border-2 flex items-center justify-center font-bold text-xl ${currentScenario.avatarColor}`}
              >
                <PhoneCall className="size-8" />
              </div>
              <h3 className="font-bold text-base text-foreground">{currentScenario.callerName}</h3>
              <p className="font-mono text-xs text-muted-foreground">{currentScenario.callerNumber}</p>
              <span className="inline-block rounded-full bg-destructive/15 text-destructive border border-destructive/30 px-2.5 py-0.5 text-[10px] font-semibold">
                Cảnh báo nguy cơ cao
              </span>
            </div>

            <div className="rounded-xl border border-border bg-secondary/60 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                  <Volume2 className="size-3.5" />
                  Lời thoại kẻ lừa đảo:
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Bước {currentStepIndex + 1}/{currentScenario.steps.length}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-foreground italic">
                “{currentStep.callerSpeech}”
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full bg-destructive/90 px-6 py-2.5 text-xs font-bold text-destructive-foreground hover:bg-destructive shadow-lg transition-all"
              >
                <PhoneOff className="size-4" />
                <span>Gác máy / Làm lại</span>
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-destructive" />
                <h4 className="font-bold text-sm text-destructive uppercase tracking-wide">
                  AI Phát hiện thủ đoạn: {currentStep.trapTag}
                </h4>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed">
                {currentStep.trapExplain}
              </p>
            </div>

            {isCompleted ? (
              <div className="rounded-2xl border-2 border-primary/50 bg-card p-6 shadow-glow text-center space-y-4 animate-fadeIn">
                <div className="size-14 mx-auto rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <ShieldCheck className="size-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Hoàn thành bài thử nghiệm!</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Bạn đã vượt qua tình huống giả lập lừa đảo công nghệ cao. Dưới đây là điểm số phản xạ an toàn của bạn:
                </p>
                <div className="py-2">
                  <p className="font-mono text-5xl font-extrabold text-primary">{scorePercent}%</p>
                  <p className="text-xs font-semibold text-foreground mt-1">
                    {scorePercent >= 80
                      ? 'Kỹ năng phòng vệ xuất sắc — Rất khó bị lừa!'
                      : scorePercent >= 50
                      ? 'Cần chú ý nâng cao cảnh giác với các cuộc gọi xưng danh cơ quan chức năng.'
                      : 'Cực kỳ nguy hiểm! Bạn rất dễ bị thao túng tâm lý qua điện thoại.'}
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Luyện tập lại kịch bản này</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <h3 className="font-bold text-sm text-foreground">
                  Bạn sẽ phản xạ xử lý như thế nào lúc này?
                </h3>
                <div className="space-y-2.5">
                  {currentStep.options.map((opt, idx) => {
                    const isSelected = selectedOptionIndex === idx;
                    let optionCls = 'border-border bg-secondary/40 text-muted-foreground hover:border-primary hover:text-foreground';
                    if (isSelected) {
                      optionCls = opt.isSafe
                        ? 'border-success bg-success/15 font-semibold text-foreground'
                        : 'border-destructive bg-destructive/15 font-semibold text-foreground';
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={selectedOptionIndex !== null}
                        className={`w-full rounded-xl border p-3.5 text-left text-xs leading-relaxed transition-all ${optionCls}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="font-mono text-primary font-bold">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span className="flex-1">{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedOptionIndex !== null && (
                  <div className="mt-4 rounded-xl border border-border bg-secondary/80 p-4 space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      {currentStep.options[selectedOptionIndex].isSafe ? (
                        <CheckCircle2 className="size-5 text-success" />
                      ) : (
                        <AlertTriangle className="size-5 text-destructive" />
                      )}
                      <p
                        className={`font-bold text-sm ${
                          currentStep.options[selectedOptionIndex].isSafe
                            ? 'text-success'
                            : 'text-destructive'
                        }`}
                      >
                        {currentStep.options[selectedOptionIndex].isSafe
                          ? 'Phản xạ an toàn đúng đắn (+50 điểm)'
                          : 'Rủi ro sập bẫy lừa đảo (0 điểm)'}
                      </p>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">
                      {currentStep.options[selectedOptionIndex].feedback}
                    </p>
                    <button
                      onClick={handleNextStep}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <span>
                        {currentStepIndex + 1 < currentScenario.steps.length
                          ? 'Tiếp tục bước tiếp theo'
                          : 'Xem kết quả đánh giá'}
                      </span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
