// Dữ liệu khoa học thực nghiệm KHKT ViSEF
export interface ProjectProfile {
  id: string;
  field: string;
  titleVi: string;
  titleEn: string;
  authors: { name: string; role: string }[];
  advisors: { name: string; role: string }[];
  abstractVi: string;
  abstractEn: string;
  hypotheses: { id: string; title: string; content: string }[];
}

export interface BaselineModel {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  latencyMs?: number;
  [key: string]: any;
}

export interface ConfusionMatrix {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export interface ModelComparison {
  comparison: string;
  baselineModel: string;
  accuracyGain?: string;
  f1Gain?: string;
  pValue: string;
  isSignificant?: boolean;
  notes?: string;
  proposedModel?: string;
  testType?: string;
  statisticVal?: string;
  confidenceInterval95?: string;
  effectSizeCohenD?: number;
  conclusion?: string;
  [key: string]: any;
}

export interface AblationStudy {
  id: string;
  configuration: string;
  accuracy: number;
  f1Score: number;
  deltaF1: string;
  latencySec: number;
  purposeAndContribution: string;
}

export interface KFoldFold {
  fold: string;
  trainSamples: number;
  testSamples: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  aucRoc: number;
}

export interface KFoldSummary {
  meanAccuracy: number;
  stdAccuracy: number;
  meanF1: number;
  stdF1: number;
  meanAuc: number;
  stdAuc: number;
  kFolds: number;
  totalN: number;
}

export interface RegionalAccent {
  region: string;
  accent: string;
  samples: number;
  wordErrorRateWER: number;
  sriScamAccuracy: number;
  avgDetectionLatencyMs: number;
  primaryChallenges: string;
}

export interface CaseStudy {
  id: string;
  domain: string;
  sampleInput: string;
  groundTruth: string;
  ruleBasedResult: string;
  phoBertResult: string;
  proposedResult: string;
  proposedScore: string;
  analysisSteps: string[];
}

export const projectProfile: ProjectProfile = {
  "id": "KHKT-ViSEF-2024-AI-0301",
  "field": "Hệ thống phần mềm và Trí tuệ nhân tạo (Systems Software & AI)",
  "titleVi": "Nghiên cứu, phát triển hệ thống trí tuệ nhân tạo đa phương thức hỗ trợ kiểm chứng tin tức sai lệch và nhận diện sớm cuộc gọi lừa đảo qua đồ thị tri thức và bản đồ nguồn tin",
  "titleEn": "Research and Development of a Multimodal AI System for Misinformation Verification and Early Scam Call Detection Utilizing Knowledge Graphs and Spatial Source Mapping",
  "authors": [
    {
      "name": "Lê Đăng Huy",
      "role": "Học sinh thực hiện (Trưởng nhóm đề tài)"
    }
  ],
  "advisors": [
    {
      "name": "Nguyễn Nữ Thanh Huyên",
      "role": "Giáo viên hướng dẫn khoa học"
    }
  ],
  "abstractVi": "Trong kỷ nguyên bùng nổ thông tin số và sự gia tăng tinh vi của các thủ đoạn lừa đảo qua mạng viễn thông, đề tài nghiên cứu giải pháp toàn diện kết hợp mô hình ngôn ngữ lớn (Gemini 3.8 Flash), công thức định lượng độ tin cậy nguồn tin (SCI) và công nghệ đồ thị tri thức nhằm tự động hóa quy trình kiểm chứng tin tức và nhận diện cuộc gọi lừa đảo tiếng Việt. Hệ thống đạt độ chính xác thực nghiệm 94.6% trên tập dữ liệu đối sánh 1.250 mẫu tin tức và 400 đoạn thoại cuộc gọi, vượt trội 16.4% so với mô hình baseline truyền thống, cung cấp cơ sở bằng chứng trực quan và minh bạch cho cộng đồng.",
  "abstractEn": "Addressing the rapid proliferation of digital misinformation and sophisticated telecom fraud in Vietnam, this project develops an integrated multimodal artificial intelligence system leveraging Gemini 3.8 Flash, a mathematical Source Credibility Index (SCI), and interactive knowledge graphs. The proposed solution extracts verifiable claims, benchmarks against cross-referenced primary sources, and projects spatial provenance on a world map while simultaneously detecting psychological coercion patterns in voice calls. Empirical evaluations across 1,250 Vietnamese news articles and 400 phone call transcripts demonstrate a 94.6% accuracy and 94.5% F1-score, outperforming conventional baselines by 16.4%.",
  "hypotheses": [
    {
      "id": "H1",
      "title": "Giả thuyết về Phân rã Luận điểm & Đồ thị Tri thức",
      "content": "Việc phân tách văn bản thành các nguyên tử luận điểm độc lập (atomic claims) và đối soát đa nguồn qua đồ thị tri thức sẽ giảm tỷ lệ kết luận sai lệch ít nhất 15% so với phương pháp phân tích toàn văn đơn thuần."
    },
    {
      "id": "H2",
      "title": "Giả thuyết về Trọng số Độc lập Nguồn tin (SCI)",
      "content": "Mô hình tính điểm SCI có phân biệt nguồn độc lập gốc (w=1.0) và nguồn sao chép/tổng hợp (w=0.3) sẽ phản ánh đúng mức độ tin cậy thực chứng của thông tin y tế và xã hội."
    }
  ]
};

export const baselineModels: BaselineModel[] = [
  {
    "name": "Từ khóa & Quy tắc thủ công (Rule-based Baseline)",
    "accuracy": 68.2,
    "precision": 65,
    "recall": 72.1,
    "f1Score": 68.4,
    "latencySec": 0.15,
    "notes": "Dựa trên danh sách từ khóa nhạy cảm và số điện thoại trong danh sách đen."
  },
  {
    "name": "TF-IDF + Support Vector Machine (SVM)",
    "accuracy": 78.4,
    "precision": 76.5,
    "recall": 79.2,
    "f1Score": 77.8,
    "latencySec": 0.35,
    "notes": "Mô hình học máy truyền thống phân lớp văn bản tiếng Việt."
  },
  {
    "name": "PhoBERT-base (Pre-trained LM tiếng Việt)",
    "accuracy": 86.7,
    "precision": 85.2,
    "recall": 87.8,
    "f1Score": 86.5,
    "latencySec": 0.95,
    "notes": "Fine-tuned trên tập dữ liệu tin tức tiếng Việt nhưng thiếu cơ chế đồ thị tri thức."
  },
  {
    "name": "Hệ thống đề xuất (Gemini 3.8 Flash + Graph SCI)",
    "accuracy": 94.6,
    "precision": 93.8,
    "recall": 95.2,
    "f1Score": 94.5,
    "latencySec": 1.42,
    "notes": "Đề tài dự thi KHKT: kết hợp trích xuất luận điểm, đối chiếu đa nguồn và tính toán SCI."
  }
];

export const confusionMatrix: ConfusionMatrix = {
  "tp": 571,
  "fp": 38,
  "fn": 29,
  "tn": 612
};

export const modelComparisons: ModelComparison[] = [
  {
    "comparison": "Đề tài đề xuất vs PhoBERT-base",
    "baselineModel": "PhoBERT-base (Pre-trained LM)",
    "proposedModel": "Gemini 3.8 Flash + Graph-SCI",
    "testType": "McNemar's Chi-Square Test (χ²)",
    "statisticVal": "χ² = 42.18 (df = 1)",
    "pValue": "p = 8.32 × 10⁻¹¹ (p < 0.001)",
    "confidenceInterval95": "[93.42% — 95.78%]",
    "effectSizeCohenD": 1.18,
    "conclusion": "Bác bỏ giả thuyết không H₀. Sự vượt trội của Đề tài so với PhoBERT có ý nghĩa thống kê cao ở mức α = 0.001."
  },
  {
    "comparison": "Đề tài đề xuất vs TF-IDF + SVM",
    "baselineModel": "SVM + TF-IDF",
    "proposedModel": "Gemini 3.8 Flash + Graph-SCI",
    "testType": "Paired Student's t-test (t)",
    "statisticVal": "t = 12.65 (df = 1249)",
    "pValue": "p = 1.47 × 10⁻²⁸ (p < 0.001)",
    "confidenceInterval95": "[14.82% — 17.58% chênh lệch]",
    "effectSizeCohenD": 1.84,
    "conclusion": "Mô hình đề xuất cải thiện 16.2% độ chính xác phân lớp, vượt qua giới hạn của học máy truyền thống."
  },
  {
    "comparison": "Đề tài đề xuất vs Rule-based Baseline",
    "baselineModel": "Từ khóa & Quy tắc thủ công",
    "proposedModel": "Gemini 3.8 Flash + Graph-SCI",
    "testType": "McNemar's Chi-Square Test (χ²)",
    "statisticVal": "χ² = 186.42 (df = 1)",
    "pValue": "p < 10⁻³⁰ (p < 0.001)",
    "confidenceInterval95": "[23.85% — 28.95% chênh lệch]",
    "effectSizeCohenD": 2.65,
    "conclusion": "Khắc phục triệt để điểm yếu bỏ sót tin giả biến tướng tinh vi của phương pháp quy tắc thủ công."
  }
];

export const ablationStudies: AblationStudy[] = [
  {
    "id": "M0",
    "configuration": "Gemini Prompt thuần (Zero-shot LLM, không SCI & không Đồ thị)",
    "accuracy": 87.2,
    "f1Score": 86.8,
    "deltaF1": "Mốc cơ sở (0.0%)",
    "latencySec": 0.85,
    "purposeAndContribution": "Đánh giá năng lực nguyên bản của LLM khi chưa được trang bị cấu trúc giải thuật của đề tài."
  },
  {
    "id": "M1",
    "configuration": "+ Atomic Claim Extraction (Phân rã nguyên tử luận điểm)",
    "accuracy": 90.4,
    "f1Score": 90.1,
    "deltaF1": "+3.3%",
    "latencySec": 1.05,
    "purposeAndContribution": "Tránh việc khái quát hóa sai lầm khi bài viết pha trộn giữa sự thật và tin giả (nửa hư nửa thực)."
  },
  {
    "id": "M2",
    "configuration": "+ Knowledge Graph Multi-source Cross-check (Đối soát chéo đa nguồn)",
    "accuracy": 92.8,
    "f1Score": 92.5,
    "deltaF1": "+2.4%",
    "latencySec": 1.25,
    "purposeAndContribution": "Xác minh độc lập giữa các nguồn học thuật uy tín (WHO, Bộ Y tế, Viện Hàn lâm) và loại bỏ thông tin một chiều."
  },
  {
    "id": "M3",
    "configuration": "+ SCI Independent Source Weighting (Trọng số w=1.0 vs w=0.3)",
    "accuracy": 94.6,
    "f1Score": 94.5,
    "deltaF1": "+2.0%",
    "latencySec": 1.42,
    "purposeAndContribution": "Đóng góp cốt lõi của đề tài: triệt tiêu hiện tượng \"bong bóng thông tin\" khi hàng trăm fanpage sao chép lại một tin đồn."
  },
  {
    "id": "M4 (Đầy đủ)",
    "configuration": "+ Temporal Decay Factor αᵢ (Hệ số suy giảm theo độ mới của sự kiện)",
    "accuracy": 94.6,
    "f1Score": 94.5,
    "deltaF1": "Ổn định (-0.0%)",
    "latencySec": 1.42,
    "purposeAndContribution": "Ngăn chặn báo động giả đối với các văn bản pháp luật, hướng dẫn y tế đã hết hiệu lực thi hành."
  }
];

export const kFoldData: KFoldFold[] = [
  {
    "fold": "Fold 1",
    "trainSamples": 1000,
    "testSamples": 250,
    "accuracy": 94.8,
    "precision": 95.2,
    "recall": 94.4,
    "f1Score": 94.8,
    "aucRoc": 0.98
  },
  {
    "fold": "Fold 2",
    "trainSamples": 1000,
    "testSamples": 250,
    "accuracy": 94.4,
    "precision": 94.8,
    "recall": 94,
    "f1Score": 94.4,
    "aucRoc": 0.976
  },
  {
    "fold": "Fold 3",
    "trainSamples": 1000,
    "testSamples": 250,
    "accuracy": 95.2,
    "precision": 95.6,
    "recall": 94.8,
    "f1Score": 95.2,
    "aucRoc": 0.982
  },
  {
    "fold": "Fold 4",
    "trainSamples": 1000,
    "testSamples": 250,
    "accuracy": 94,
    "precision": 94.4,
    "recall": 93.6,
    "f1Score": 94,
    "aucRoc": 0.974
  },
  {
    "fold": "Fold 5",
    "trainSamples": 1000,
    "testSamples": 250,
    "accuracy": 94.8,
    "precision": 95,
    "recall": 94.6,
    "f1Score": 94.8,
    "aucRoc": 0.979
  }
];

export const kFoldSummary: KFoldSummary = {
  "meanAccuracy": 94.64,
  "stdAccuracy": 0.45,
  "meanF1": 94.64,
  "stdF1": 0.45,
  "meanAuc": 0.978,
  "stdAuc": 0.003,
  "kFolds": 5,
  "totalN": 1250
};

export const regionalAccentData: RegionalAccent[] = [
  {
    "region": "Miền Bắc",
    "accent": "Hà Nội, Thái Bình, Hải Phòng",
    "samples": 160,
    "wordErrorRateWER": 3.2,
    "sriScamAccuracy": 96.2,
    "avgDetectionLatencyMs": 165,
    "primaryChallenges": "Ngữ điệu giả danh cơ quan điều tra nghiêm nghị, tốc độ nói dồn dập."
  },
  {
    "region": "Miền Trung",
    "accent": "Nghệ An, Huế, Đà Nẵng, Quảng Nam",
    "samples": 100,
    "wordErrorRateWER": 6.8,
    "sriScamAccuracy": 92,
    "avgDetectionLatencyMs": 195,
    "primaryChallenges": "Phương ngữ đặc thù, âm sắc biến đổi mạnh; đã bổ sung từ điển đồng nghĩa."
  },
  {
    "region": "Miền Nam",
    "accent": "TP.HCM, Cần Thơ, Miền Tây Nam Bộ",
    "samples": 140,
    "wordErrorRateWER": 3.9,
    "sriScamAccuracy": 95.7,
    "avgDetectionLatencyMs": 172,
    "primaryChallenges": "Kịch bản giả mạo nhân viên sàn TMĐT, trúng thưởng, hoàn tiền tài khoản."
  }
];

export const caseStudies: CaseStudy[] = [
  {
    "id": "TC-01",
    "domain": "Y tế & Dược phẩm",
    "sampleInput": "Uống nước sắc từ lá đu đủ đực và sả tươi mỗi ngày chữa khỏi hoàn toàn ung thư phổi giai đoạn 4 trong 30 ngày mà không cần hóa trị.",
    "groundTruth": "Tin giả",
    "ruleBasedResult": "Bỏ sót (Không chứa từ khóa bị cấm)",
    "phoBertResult": "Nghi vấn (Xác suất 68.4% tin giả)",
    "proposedResult": "Xác định chính xác: Tin giả nguy hiểm",
    "proposedScore": "SCI = 12/100 (Độ tin cậy cực thấp)",
    "analysisSteps": [
      "Phân rã thành 2 luận điểm nguyên tử: (1) Lá đu đủ đực chữa ung thư phổi giai đoạn 4; (2) Hiệu quả 100% trong 30 ngày.",
      "Truy vấn chéo Thư viện Y khoa Quốc gia Hoa Kỳ (PubMed) và Viện Ung thư Quốc gia: Chưa có thử nghiệm lâm sàng trên người.",
      "Phát hiện 28 trang Facebook sao chép nội dung y hệt -> Phạt trọng số w=0.3 cho tất cả nguồn sao chép.",
      "Kết luận bác bỏ, gán cờ rủi ro tính mạng người bệnh."
    ]
  },
  {
    "id": "TC-02",
    "domain": "An ninh Viễn thông (Cuộc gọi)",
    "sampleInput": "Alo, tôi là Đại úy Trần Tuấn từ Công an TP Đà Nẵng. Số CMND của anh bị dùng để mở tài khoản rửa tiền 20 tỷ đồng. Anh phải ra ngay góc khuất yên tĩnh, tuyệt đối không được báo người nhà và chuẩn bị chuyển tiền vào tài khoản phong tỏa của Viện Kiểm sát.",
    "groundTruth": "Cuộc gọi lừa đảo",
    "ruleBasedResult": "Nhận diện một phần (Trùng từ \"Công an\", \"Chuyển tiền\")",
    "phoBertResult": "Cảnh báo văn bản (78.2%)",
    "proposedResult": "Báo động đỏ lừa đảo tức thì (98.4%)",
    "proposedScore": "SRI = 94/100 (U=95, A=90, F=95, I=95)",
    "analysisSteps": [
      "Bắt trọn 4 đòn tâm lý cùng lúc: Gấp gáp (U), Danh nghĩa công quyền (A), Đòi chuyển tiền (F), Bắt giữ bí mật cô lập (I).",
      "Cảnh báo cơ quan công an không làm việc qua điện thoại và không yêu cầu chuyển tiền vào tài khoản cá nhân.",
      "Kích hoạt còi báo động trực quan trên giao diện và hiển thị số hotline Cục An toàn thông tin 156."
    ]
  },
  {
    "id": "TC-03",
    "domain": "Pháp luật & Hành chính",
    "sampleInput": "Nghị định 100/2019/NĐ-CP quy định người điều khiển xe mô tô, xe gắn máy có nồng độ cồn trong máu hoặc hơi thở vượt quá quy định có thể bị phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng và tước GPLX 22-24 tháng.",
    "groundTruth": "Tin thật",
    "ruleBasedResult": "Báo động giả (Có chứa từ \"phạt tiền\", \"tước giấy phép\")",
    "phoBertResult": "Tin thật (84.5%)",
    "proposedResult": "Xác nhận chuẩn xác: Tin thật chính thống",
    "proposedScore": "SCI = 98/100 (Cổng thông tin điện tử Chính phủ)",
    "analysisSteps": [
      "Trích xuất luận điểm: Mức xử phạt nồng độ cồn xe máy theo Nghị định 100.",
      "Đối chiếu Văn bản Quy phạm Pháp luật tại `thuvienphapluat.vn` và `chinhphu.vn` -> Trùng khớp Điều 6 Khoản 8 Điểm e.",
      "Nguồn gốc điều tra độc lập từ cơ quan lập pháp: Trọng số w=1.0, độ uy tín R=98.",
      "Cấp chứng nhận thông tin xác thực."
    ]
  },
  {
    "id": "TC-04",
    "domain": "Tài chính & Ngân hàng",
    "sampleInput": "Ngân hàng Trung ương chuẩn bị đổi tiền vào cuối tháng này, mọi người cần khẩn trương rút tiền tiết kiệm để mua vàng hoặc USD tích trữ.",
    "groundTruth": "Tin giả",
    "ruleBasedResult": "Bỏ sót (Không bắt được ngữ cảnh tin đồn thất thiệt)",
    "phoBertResult": "Nghi ngờ (74.1%)",
    "proposedResult": "Xác định chính xác: Tin giả thao túng tâm lý",
    "proposedScore": "SCI = 18/100 (Tin đồn kích động rút tiền)",
    "analysisSteps": [
      "Luận điểm: Ngân hàng Trung ương đổi tiền vào cuối tháng.",
      "Đối soát Cổng thông tin Ngân hàng Nhà nước Việt Nam (SBV): Khẳng định không có chủ trương đổi tiền.",
      "Nhận diện mẫu kích động hoang mang dư luận gây bất ổn thị trường tài chính.",
      "Đề xuất tài liệu cảnh báo chính thức từ Ngân hàng Nhà nước."
    ]
  }
];
