export interface BlacklistItem {
  id: string;
  type: "phone" | "url";
  target: string;
  category: string;
  riskLevel: "critical" | "high" | "medium" | "safe";
  reportsCount: number;
  lastReported: string;
  description: string;
  spoofedEntity: string;
  source: string;
}

export const initialBlacklist: BlacklistItem[] = [
  {
    "id": "t-1",
    "type": "phone",
    "target": "+842471098888",
    "category": "Giả danh Cơ quan Công an / Viện kiểm sát",
    "riskLevel": "critical",
    "reportsCount": 1428,
    "lastReported": "10 phút trước",
    "description": "Gọi điện dọa nạn nhân có liên quan đến đường dây rửa tiền, buôn ma túy và yêu cầu chuyển tiền vào tài khoản thanh tra.",
    "spoofedEntity": "Bộ Công an / Công an TP Hà Nội",
    "source": "Cục An toàn Thông tin & Báo cáo cộng đồng"
  },
  {
    "id": "t-2",
    "type": "phone",
    "target": "02899991234",
    "category": "Giả mạo Khóa cước Viễn thông",
    "riskLevel": "high",
    "reportsCount": 890,
    "lastReported": "25 phút trước",
    "description": "Thông báo sim sẽ bị khóa vĩnh viễn trong 2 giờ do chưa chuẩn hóa thông tin, yêu cầu bấm phím 1 gặp tổng đài viên và đọc OTP.",
    "spoofedEntity": "Tổng đài Viễn thông VNPT / Viettel",
    "source": "Tổng đài 156 / 5656"
  },
  {
    "id": "t-3",
    "type": "phone",
    "target": "0834567890",
    "category": "Giả mạo Cán bộ Thuế / Cài ứng dụng lạ",
    "riskLevel": "critical",
    "reportsCount": 2150,
    "lastReported": "Hôm nay",
    "description": "Yêu cầu tải ứng dụng Dịch vụ công hoặc VNeID bản .APK từ đường link lạ, chiếm quyền trợ năng Accessibility để chiếm đoạt tài khoản ngân hàng.",
    "spoofedEntity": "Tổng cục Thuế",
    "source": "Cơ quan Cảnh sát điều tra"
  },
  {
    "id": "t-4",
    "type": "url",
    "target": "https://vneid-dichvucong.cc",
    "category": "Website giả mạo đánh cắp định danh",
    "riskLevel": "critical",
    "reportsCount": 3410,
    "lastReported": "1 giờ trước",
    "description": "Trang web mạo danh cổng thông tin định danh điện tử VNeID để phát tán mã độc Android APK Trojan.",
    "spoofedEntity": "Cổng Dịch vụ công Quốc gia",
    "source": "Trung tâm Giám sát An toàn Không gian mạng Quốc gia (NCSC)"
  },
  {
    "id": "t-5",
    "type": "url",
    "target": "https://vietcombank-ebanking-smart.top",
    "category": "Website giả mạo ngân hàng (Phishing)",
    "riskLevel": "critical",
    "reportsCount": 1820,
    "lastReported": "Hôm qua",
    "description": "Giao diện bắt chước 99% trang đăng nhập Internet Banking của Vietcombank nhằm đánh cắp thông tin đăng nhập và mã OTP.",
    "spoofedEntity": "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)",
    "source": "Cảnh báo Hiệp hội An toàn thông tin (VNISA)"
  },
  {
    "id": "t-6",
    "type": "phone",
    "target": "19001091",
    "category": "Tổng đài chính thức đã xác thực",
    "riskLevel": "safe",
    "reportsCount": 0,
    "lastReported": "Chính thống",
    "description": "Đường dây nóng chăm sóc khách hàng chính thức của nhà mạng VinaPhone.",
    "spoofedEntity": "Tập đoàn Bưu chính Viễn thông Việt Nam VNPT",
    "source": "Cơ quan Nhà nước xác thực"
  }
];
