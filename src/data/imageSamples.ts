export interface ImageSample {
  id: string;
  name: string;
  category: string;
  sampleDescription: string;
  previewUrl: string;
  result?: any;
  isFake?: boolean;
  authenticityScore?: number;
  documentType?: string;
  extractedText?: string;
  summary?: string;
  suspiciousElements?: any[];
  elaHeatmapDescription?: string;
  metadataChecks?: any[];
  [key: string]: any;
}

export const sampleImageDocuments: ImageSample[] = [
  {
    "id": "img-warrant",
    "name": "Lệnh Bắt Tạm Giam & Phong Tỏa Tài Sản Mạo Danh Bộ Công An",
    "category": "Văn bản hành chính / Tư pháp giả mạo",
    "sampleDescription": "Giấy tờ có Quốc huy, tiêu đề \"LỆNH BẮT TẠM GIAM VÀ KHÁM XÉT\", chữ ký giả mạo của Viện trưởng VKSND Tối cao và con dấu tròn đỏ ghép qua Photoshop.",
    "previewUrl": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22400%22%20viewBox%3D%220%200%20600%20400%22%20fill%3D%22%23f8fafc%22%3E%0A%20%20%20%20%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22%23ffffff%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22360%22%20fill%3D%22%23f8fafc%22%20stroke%3D%22%23dc2626%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%224%204%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%2255%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2214%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%230f172a%22%3EC%E1%BB%98NG%20H%C3%92A%20X%C3%83%20H%E1%BB%98I%20CH%E1%BB%A6%20NGH%C4%A8A%20VI%E1%BB%86T%20NAM%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%2275%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%20fill%3D%22%23475569%22%3E%C4%90%E1%BB%99c%20l%E1%BA%ADp%20-%20T%E1%BB%B1%20do%20-%20H%E1%BA%A1nh%20ph%C3%BAc%3C%2Ftext%3E%0A%20%20%20%20%3Cline%20x1%3D%22240%22%20y1%3D%2282%22%20x2%3D%22360%22%20y2%3D%2282%22%20stroke%3D%22%23dc2626%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%22120%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%23b91c1c%22%3EL%E1%BB%86NH%20B%E1%BA%AET%20T%E1%BA%A0M%20GIAM%20V%C3%80%20PHONG%20T%E1%BB%8EA%20T%C3%80I%20S%E1%BA%A2N%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%22145%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%23dc2626%22%3E%5BV%C4%82N%20B%E1%BA%A2N%20GI%E1%BA%A2%20M%E1%BA%A0O%20C%C6%A0%20QUAN%20C%C3%94NG%20QUY%E1%BB%80N%5D%3C%2Ftext%3E%0A%20%20%20%20%3Crect%20x%3D%2260%22%20y%3D%22165%22%20width%3D%22480%22%20height%3D%2290%22%20fill%3D%22%23fef2f2%22%20stroke%3D%22%23fca5a5%22%20rx%3D%226%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2280%22%20y%3D%22195%22%20font-family%3D%22monospace%22%20font-size%3D%2212%22%20fill%3D%22%23991b1b%22%3EC%C6%A1%20quan%3A%20B%E1%BB%98%20C%C3%94NG%20AN%20-%20VI%E1%BB%86N%20KI%E1%BB%82M%20S%C3%81T%20(Gh%C3%A9p%20sai)%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2280%22%20y%3D%22220%22%20font-family%3D%22monospace%22%20font-size%3D%2212%22%20fill%3D%22%23991b1b%22%3EY%C3%AAu%20c%E1%BA%A7u%3A%20N%E1%BB%99p%20500%20tri%E1%BB%87u%20v%C3%A0o%20t%C3%A0i%20kho%E1%BA%A3n%20phong%20t%E1%BB%8Fa%20trong%2024h%3C%2Ftext%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22480%22%20cy%3D%22300%22%20r%3D%2245%22%20fill%3D%22none%22%20stroke%3D%22%23dc2626%22%20stroke-width%3D%223%22%20opacity%3D%220.85%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22480%22%20y%3D%22295%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%229%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%23dc2626%22%3EC%C3%94NG%20AN%20TP%20H%C3%80%20N%E1%BB%98I%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22480%22%20y%3D%22310%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%228%22%20text-anchor%3D%22middle%22%20fill%3D%22%23dc2626%22%3ED%E1%BA%A4U%20GI%E1%BA%A2%20M%E1%BA%A0O%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E",
    "result": {
      "isFake": true,
      "authenticityScore": 4,
      "documentType": "police_warrant",
      "extractedText": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\nBỘ CÔNG AN - VIỆN KIỂM SÁT NHÂN DÂN TỐI CAO\nSố: 148/QĐ-VKSTC\nLỆNH BẮT TẠM GIAM VÀ PHONG TỎA TÀI SẢN\nCăn cứ Điều 119 Bộ luật Tố tụng Hình sự...\nQuyết định: Bắt tạm giam bị can và yêu cầu nộp toàn bộ tài sản vào tài khoản thanh tra cơ quan điều tra trong thời hạn 24 giờ...",
      "summary": "VĂN BẢN GIẢ MẠO 100%. Cơ quan Công an và Viện kiểm sát không bao giờ ban hành văn bản chung một tiêu đề ghép \"BỘ CÔNG AN - VIỆN KIỂM SÁT\", và không bao giờ gửi lệnh bắt qua mạng xã hội/Zalo/Telegram.",
      "anomalies": [
        {
          "box": "Tiêu ngữ & Quốc hiệu",
          "label": "Sai cơ quan ban hành",
          "severity": "critical",
          "explain": "Viện kiểm sát và Bộ Công an là 2 cơ quan tố tụng độc lập, không bao giờ cùng đứng tên ban hành một quyết định bắt tạm giam chung."
        },
        {
          "box": "Con dấu đỏ",
          "label": "Dấu mộc giả mạo ghép kỹ thuật số",
          "severity": "critical",
          "explain": "Hình ảnh con dấu có viền nhòe, sai tỉ lệ đường kính chuẩn 36mm theo quy chuẩn Bộ Công an, viền chữ \"Cơ quan cảnh sát điều tra\" bị chồng lấn giả tạo."
        },
        {
          "box": "Chữ ký & Thẩm quyền",
          "label": "Ký thay không đúng thẩm quyền tố tụng",
          "severity": "critical",
          "explain": "Lệnh bắt ghi \"Viện trưởng ký\" nhưng con dấu lại là dấu của cơ quan điều tra công an quận/huyện."
        },
        {
          "box": "Nội dung yêu cầu tài sản",
          "label": "Thủ đoạn tống tiền tài chính",
          "severity": "critical",
          "explain": "Lệnh bắt tư pháp không bao giờ kèm nội dung \"chuyển tiền vào tài khoản ngân hàng để thanh tra trong 24 giờ\"."
        }
      ],
      "administrativeChecks": [
        {
          "rule": "Thể thức Quốc hiệu & Tiêu ngữ",
          "standard": "Nghị định 30/2020/NĐ-CP",
          "status": "violation",
          "details": "Font chữ không chuẩn Times New Roman, khoảng cách giữa Quốc hiệu và Tiêu ngữ sai lệch 12pt."
        },
        {
          "rule": "Thẩm quyền ban hành lệnh bắt",
          "standard": "Bộ luật Tố tụng Hình sự 2015",
          "status": "violation",
          "details": "Lệnh bắt phải do Thủ trưởng Cơ quan điều tra ra lệnh và có Quyết định phê chuẩn riêng của Viện kiểm sát có thẩm quyền."
        },
        {
          "rule": "Phương thức tống đạt văn bản tố tụng",
          "standard": "Điều 137 BLTTHS",
          "status": "violation",
          "details": "Văn bản tố tụng bắt buộc phải được giao trực tiếp hoặc qua chính quyền địa phương, không tống đạt qua mạng Internet."
        }
      ],
      "verdictRecommendation": "Khuyến cáo khẩn cấp: Tuyệt đối không làm theo yêu cầu. Hãy lập tức lưu lại hình ảnh làm bằng chứng và đến trình báo tại Công an phường/xã gần nhất."
    }
  },
  {
    "id": "img-receipt",
    "name": "Biên Lai Chuyển Tiền Ngân Hàng Photoshop (Fake Bill)",
    "category": "Lừa đảo thanh toán thương mại điện tử",
    "sampleDescription": "Ảnh chụp màn hình biên lai chuyển khoản Vietcombank số tiền 50.000.000đ nhưng font chữ số tiền, số dư và mã giao dịch không đồng nhất độ phân giải pixel.",
    "previewUrl": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22400%22%20viewBox%3D%220%200%20600%20400%22%20fill%3D%22%230f172a%22%3E%0A%20%20%20%20%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22%230b1329%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%22120%22%20y%3D%2220%22%20width%3D%22360%22%20height%3D%22360%22%20rx%3D%2216%22%20fill%3D%22%231e293b%22%20stroke%3D%22%2300f0ff%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%2265%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2216%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%2338bdf8%22%3EVIETCOMBANK%20DIGITAL%3C%2Ftext%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22115%22%20r%3D%2226%22%20fill%3D%22%230284c7%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M%20290%20115%20L%20297%20122%20L%20312%20107%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%223.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%22165%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2213%22%20text-anchor%3D%22middle%22%20fill%3D%22%2394a3b8%22%3EChuy%E1%BB%83n%20ti%E1%BB%81n%20th%C3%A0nh%20c%C3%B4ng%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%22205%22%20font-family%3D%22monospace%22%20font-size%3D%2224%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%2322c55e%22%3E50%2C000%2C000%20VND%3C%2Ftext%3E%0A%20%20%20%20%3Crect%20x%3D%22150%22%20y%3D%22230%22%20width%3D%22300%22%20height%3D%22110%22%20rx%3D%228%22%20fill%3D%22%230f172a%22%20stroke%3D%22%23334155%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22170%22%20y%3D%22258%22%20font-family%3D%22monospace%22%20font-size%3D%2211%22%20fill%3D%22%2394a3b8%22%3ENg%C6%B0%E1%BB%9Di%20nh%E1%BA%ADn%3A%20NGUYEN%20VAN%20A%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22170%22%20y%3D%22283%22%20font-family%3D%22monospace%22%20font-size%3D%2211%22%20fill%3D%22%2394a3b8%22%3EM%C3%A3%20GD%3A%209812471904%20(L%E1%BB%87ch%20pixel)%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22170%22%20y%3D%22308%22%20font-family%3D%22monospace%22%20font-size%3D%2211%22%20fill%3D%22%23ef4444%22%3E%5BPH%C3%81T%20HI%E1%BB%86N%20FAKE%20BILL%20ELA%5D%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E",
    "result": {
      "isFake": true,
      "authenticityScore": 12,
      "documentType": "bank_receipt",
      "extractedText": "NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM (VIETCOMBANK)\nCHUYỂN TIỀN THÀNH CÔNG\nSố tiền: 50,000,000 VND\nNgười nhận: NGUYEN VAN A\nNgân hàng thụ hưởng: MB Bank\nNội dung: Thanh toan tien mua hang\nMã giao dịch: 9812471904\nThời gian: 14:32:05 09/11/2024",
      "summary": "PHÁT HIỆN DẤU HIỆU BIÊN LAI GIẢ MẠO (FAKE BILL). Phân tích ELA (Error Level Analysis) cho thấy vùng hiển thị số tiền \"50,000,000 VND\" và \"Thời gian\" có độ nhiễu pixel nén JPEG khác biệt hoàn toàn so với nền ảnh.",
      "anomalies": [
        {
          "box": "Số tiền 50,000,000 VND",
          "label": "Chèn ghép font chữ không đồng nhất",
          "severity": "critical",
          "explain": "Kích thước điểm ảnh và độ mịn răng cưa font chữ số tiền khác với font hệ thống gốc của app ngân hàng."
        },
        {
          "box": "Mã giao dịch FT",
          "label": "Định dạng mã giao dịch không hợp lệ",
          "severity": "warning",
          "explain": "Mã giao dịch Vietcombank thông thường bắt đầu bằng tiền tố hoặc chuỗi số chuẩn 12-16 ký tự kèm chữ cái."
        },
        {
          "box": "Thời gian chuyển khoản",
          "label": "Lệch căn lề chuẩn UI",
          "severity": "warning",
          "explain": "Dòng thời gian bị lệch 3 pixel so với trục đối xứng của khung giao diện ngân hàng."
        }
      ],
      "administrativeChecks": [
        {
          "rule": "Kiểm tra độ toàn vẹn hình ảnh (ELA)",
          "standard": "Digital Image Forensics",
          "status": "violation",
          "details": "Phát hiện sự không nhất quán về ma trận lượng tử hóa JPEG (Quantization Matrix Inconsistency)."
        },
        {
          "rule": "Định dạng giao dịch ngân hàng điện tử",
          "standard": "Quy chuẩn Napas 247",
          "status": "suspicious",
          "details": "Giao dịch chuyển nhanh Napas 247 tiền sẽ về tài khoản người nhận trong 3 giây. Nếu tài khoản chưa báo có thì 99% là bill giả."
        }
      ],
      "verdictRecommendation": "Cảnh báo người bán hàng: Chỉ giao hàng khi tiền đã thực sự nổi trong tài khoản ngân hàng của bạn, không tin vào bất kỳ ảnh chụp màn hình nào."
    }
  },
  {
    "id": "img-health",
    "name": "Ảnh Bài Đăng MXH Quảng Cáo \"Thần Dược Trị Dứt Điểm Ung Thư\"",
    "category": "Tin tức y tế sai lệch trên Facebook/TikTok",
    "sampleDescription": "Ảnh chụp bài viết có hình ảnh giáo sư bác sĩ nổi tiếng ghép cạnh lọ thuốc Nam, kèm khẳng định chữa khỏi mọi giai đoạn ung thư trong 30 ngày.",
    "previewUrl": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22400%22%20viewBox%3D%220%200%20600%20400%22%20fill%3D%22%23ffffff%22%3E%0A%20%20%20%20%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22%23fdf2f8%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2230%22%20y%3D%2220%22%20width%3D%22540%22%20height%3D%22360%22%20rx%3D%2212%22%20fill%3D%22%23ffffff%22%20stroke%3D%22%23f43f5e%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2230%22%20y%3D%2220%22%20width%3D%22540%22%20height%3D%2250%22%20rx%3D%2212%22%20fill%3D%22%23e11d48%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%2252%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2216%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%3ECH%E1%BA%A4N%20%C4%90%E1%BB%98NG%3A%20B%C3%80I%20THU%E1%BB%90C%20%C4%90%E1%BA%B6C%20TR%E1%BB%8A%20UNG%20TH%C6%AF%20100%25%3C%2Ftext%3E%0A%20%20%20%20%3Crect%20x%3D%2260%22%20y%3D%2290%22%20width%3D%22220%22%20height%3D%22180%22%20rx%3D%228%22%20fill%3D%22%23f1f5f9%22%20stroke%3D%22%23cbd5e1%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22170%22%20y%3D%22175%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%20fill%3D%22%2364748b%22%3E%5B%E1%BA%A2NH%20C%E1%BA%AET%20GH%C3%89P%20B%C3%81C%20S%C4%A8%5D%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22170%22%20y%3D%22195%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2210%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ef4444%22%3ESai%20s%E1%BB%B1%20th%E1%BA%ADt%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22310%22%20y%3D%22115%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2214%22%20font-weight%3D%22bold%22%20fill%3D%22%230f172a%22%3EGIA%20TRUY%E1%BB%80N%204%20%C4%90%E1%BB%9CI%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22310%22%20y%3D%22145%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2212%22%20fill%3D%22%23334155%22%3ECh%E1%BB%AFa%20kh%E1%BB%8Fi%20ung%20th%C6%B0%20gan%2C%20ph%E1%BB%95i%20trong%2030%20ng%C3%A0y%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22310%22%20y%3D%22175%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2212%22%20fill%3D%22%23334155%22%3EKh%C3%B4ng%20c%E1%BA%A7n%20x%E1%BA%A1%20tr%E1%BB%8B%2C%20h%C3%B3a%20tr%E1%BB%8B%20%C4%91au%20%C4%91%E1%BB%9Bn%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22310%22%20y%3D%22205%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20fill%3D%22%23e11d48%22%3ECam%20k%E1%BA%BFt%20kh%E1%BB%8Fi%20d%E1%BB%A9t%20%C4%91i%E1%BB%83m%20100%25%3C%2Ftext%3E%0A%20%20%20%20%3Crect%20x%3D%2260%22%20y%3D%22290%22%20width%3D%22480%22%20height%3D%2265%22%20rx%3D%228%22%20fill%3D%22%23fff1f2%22%20stroke%3D%22%23fda4af%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%22328%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%23be123c%22%3EC%E1%BA%A2NH%20B%C3%81O%20B%E1%BB%98%20Y%20T%E1%BA%BE%3A%20QU%E1%BA%A2NG%20C%C3%81O%20GIAN%20L%E1%BA%ACN%20NGUY%20HI%E1%BB%82M%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E",
    "result": {
      "isFake": true,
      "authenticityScore": 6,
      "documentType": "health_ad",
      "extractedText": "CHẤN ĐỘNG Y HỌC: BÀI THUỐC GIA TRUYỀN 4 ĐỜI CHỮA KHỎI HOÀN TOÀN UNG THƯ GAN, PHỔI, DẠ DÀY GIAI ĐOẠN CUỐI CHỈ SAU 1 LIỆU TRÌNH 30 NGÀY! Bệnh viện K bó tay nhưng uống thuốc này tế bào ung thư tự tiêu biến. Ai không chia sẻ sẽ hối hận cả đời!",
      "summary": "NỘI DUNG Y TẾ SAI SỰ THẬT VÀ NGUY HIỂM. Không có bài thuốc thảo dược nào có khả năng \"tiêu biến tế bào ung thư giai đoạn cuối trong 30 ngày\". Đây là chiêu trò quảng cáo bán thực phẩm chức năng lừa đảo người bệnh.",
      "anomalies": [
        {
          "box": "Tuyên bố \"Chữa khỏi dứt điểm ung thư\"",
          "label": "Trái ngược với khoa học y chứng",
          "severity": "critical",
          "explain": "Tổ chức Y tế Thế giới (WHO) và Bộ Y tế Việt Nam xác nhận ung thư cần phác đồ điều trị đa mô thức (phẫu thuật, hóa xạ trị, miễn dịch)."
        },
        {
          "box": "Hình ảnh bác sĩ/chuyên gia",
          "label": "Cắt ghép hình ảnh trái phép",
          "severity": "critical",
          "explain": "Hình ảnh GS.TS nguyên Giám đốc Bệnh viện K bị kẻ gian cắt ghép trái phép từ một hội thảo y khoa khác để gắn vào sản phẩm."
        },
        {
          "box": "Kêu gọi lan truyền tâm lý sợ hãi",
          "label": "Hành vi tin giả điển hình",
          "severity": "warning",
          "explain": "Sử dụng câu từ giật gân \"ai không chia sẻ sẽ hối hận\" để lôi kéo thuật toán mạng xã hội."
        }
      ],
      "administrativeChecks": [
        {
          "rule": "Quy định quảng cáo thuốc & thực phẩm chức năng",
          "standard": "Luật Dược 2016 & Nghị định 15/2018/NĐ-CP",
          "status": "violation",
          "details": "Nghiêm cấm quảng cáo thực phẩm chức năng gây hiểu nhầm như thuốc chữa bệnh; cấm sử dụng hình ảnh bác sĩ để quảng cáo."
        }
      ],
      "verdictRecommendation": "Cảnh báo: Báo cáo bài viết giả mạo cho nền tảng mạng xã hội và khuyên người thân tuân thủ hướng dẫn điều trị của bác sĩ chuyên khoa."
    }
  },
  {
    "id": "img-genuine",
    "name": "Văn Bản Hành Chính Nhà Nước Hợp Pháp (Chuẩn Nghị Định 30/2020)",
    "category": "Văn bản hành chính hợp pháp",
    "sampleDescription": "Thông báo hành chính chính thức của cơ quan nhà nước, định dạng đúng font, căn lề chuẩn, có số hiệu văn bản và chữ ký số điện tử hợp pháp.",
    "previewUrl": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22400%22%20viewBox%3D%220%200%20600%20400%22%20fill%3D%22%23f8fafc%22%3E%0A%20%20%20%20%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22%23ffffff%22%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2225%22%20y%3D%2220%22%20width%3D%22550%22%20height%3D%22360%22%20rx%3D%224%22%20fill%3D%22%23ffffff%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22130%22%20y%3D%2250%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%230f172a%22%3E%E1%BB%A6Y%20BAN%20NH%C3%82N%20D%C3%82N%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22130%22%20y%3D%2268%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2211%22%20text-anchor%3D%22middle%22%20fill%3D%22%230f172a%22%3ETH%C3%80NH%20PH%E1%BB%90%20H%C3%80%20N%E1%BB%98I%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22130%22%20y%3D%2285%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2210%22%20text-anchor%3D%22middle%22%20fill%3D%22%2364748b%22%3ES%E1%BB%91%3A%20215%2FTB-UBND%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22430%22%20y%3D%2250%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%230f172a%22%3EC%E1%BB%98NG%20H%C3%92A%20X%C3%83%20H%E1%BB%98I%20CH%E1%BB%A6%20NGH%C4%A8A%20VI%E1%BB%86T%20NAM%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22430%22%20y%3D%2268%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%230f172a%22%3E%C4%90%E1%BB%99c%20l%E1%BA%ADp%20-%20T%E1%BB%B1%20do%20-%20H%E1%BA%A1nh%20ph%C3%BAc%3C%2Ftext%3E%0A%20%20%20%20%3Cline%20x1%3D%22370%22%20y1%3D%2274%22%20x2%3D%22490%22%20y2%3D%2274%22%20stroke%3D%22%230f172a%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%22130%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2216%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%231e3a8a%22%3ETH%C3%94NG%20B%C3%81O%20H%C3%80NH%20CH%C3%8DNH%20CH%C3%8DNH%20TH%E1%BB%A8C%3C%2Ftext%3E%0A%20%20%20%20%3Crect%20x%3D%2260%22%20y%3D%22155%22%20width%3D%22480%22%20height%3D%2295%22%20fill%3D%22%23f0fdf4%22%20stroke%3D%22%2386efac%22%20rx%3D%226%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2280%22%20y%3D%22185%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2212%22%20fill%3D%22%23166534%22%3EV%C4%83n%20b%E1%BA%A3n%20chu%E1%BA%A9n%20m%E1%BB%B1c%20Ngh%E1%BB%8B%20%C4%91%E1%BB%8Bnh%2030%2F2020%2FN%C4%90-CP%20c%E1%BB%A7a%20Ch%C3%ADnh%20ph%E1%BB%A7%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2280%22%20y%3D%22210%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2212%22%20fill%3D%22%23166534%22%3ECh%E1%BB%AF%20k%C3%BD%20s%E1%BB%91%20%C4%91i%E1%BB%87n%20t%E1%BB%AD%20(.p7s)%20x%C3%A1c%20th%E1%BB%B1c%20Ban%20C%C6%A1%20y%E1%BA%BFu%20Ch%C3%ADnh%20ph%E1%BB%A7%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%2280%22%20y%3D%22235%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20fill%3D%22%2315803d%22%3E%5BK%E1%BA%BET%20LU%E1%BA%ACN%3A%20T%C3%80I%20LI%E1%BB%86U%20CH%C3%8DNH%20TH%E1%BB%90NG%20H%E1%BB%A2P%20PH%C3%81P%5D%3C%2Ftext%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22480%22%20cy%3D%22305%22%20r%3D%2238%22%20fill%3D%22none%22%20stroke%3D%22%2322c55e%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22480%22%20y%3D%22305%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%229%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%2316a34a%22%3E%C4%90%C3%83%20X%C3%81C%20TH%E1%BB%B0C%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22480%22%20y%3D%22318%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%228%22%20text-anchor%3D%22middle%22%20fill%3D%22%2316a34a%22%3ECH%E1%BB%AE%20K%C3%9D%20S%E1%BB%90%20PKI%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E",
    "result": {
      "isFake": false,
      "authenticityScore": 98,
      "documentType": "other",
      "extractedText": "ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI\nSố: 215/TB-UBND\nCỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\nHà Nội, ngày 15 tháng 10 năm 2024\nTHÔNG BÁO\nVề việc tiếp nhận và giải quyết thủ tục hành chính phục vụ người dân và doanh nghiệp trên Cổng Dịch vụ công Quốc gia...",
      "summary": "VĂN BẢN XÁC THỰC HỢP PHÁP (CHÍNH THỐNG 100%). Tài liệu tuân thủ chuẩn chỉnh quy chuẩn kỹ thuật thể thức văn bản hành chính theo Nghị định 30/2020/NĐ-CP của Chính phủ. Không phát hiện bất kỳ dấu vết can thiệp, chỉnh sửa hay cắt ghép pixel.",
      "anomalies": [],
      "administrativeChecks": [
        {
          "rule": "Thể thức Quốc hiệu & Tiêu ngữ",
          "standard": "Nghị định 30/2020/NĐ-CP",
          "status": "valid",
          "details": "Quốc hiệu in hoa đứng, Tiêu ngữ chữ in thường đứng đậm, cỡ chữ và khoảng cách dòng chuẩn chỉnh."
        },
        {
          "rule": "Thẩm quyền ban hành và số hiệu văn bản",
          "standard": "Luật Ban hành Văn bản QPPL",
          "status": "valid",
          "details": "Cơ quan ban hành có thẩm quyền hợp pháp, số hiệu và ký hiệu văn bản trùng khớp hệ thống quản lý văn bản điều hành."
        },
        {
          "rule": "Chữ ký số & Tính toàn vẹn dữ liệu",
          "standard": "Nghị định 130/2018/NĐ-CP",
          "status": "valid",
          "details": "Xác nhận tính toàn vẹn của chứng thư số điện tử hợp chuẩn Ban Cơ yếu Chính phủ."
        }
      ],
      "verdictRecommendation": "Tài liệu chính thống có giá trị pháp lý. Người dân có thể an tâm tra cứu và thực hiện theo nội dung hướng dẫn."
    }
  },
  {
    "id": "img-ai-deepfake",
    "name": "Ảnh Chân Dung / Nhân Vật Do AI Tạo Lập (Midjourney / Flux Deepfake)",
    "category": "Ảnh do AI tạo lập (Synthetic Media / Deepfake)",
    "sampleDescription": "Ảnh chân dung nhân vật được tổng hợp hoàn toàn bởi mô hình Diffusion AI (Midjourney v6/Flux), da láng mịn siêu thực nhưng bất đối xứng phản xạ đồng tử mắt.",
    "previewUrl": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22400%22%20viewBox%3D%220%200%20600%20400%22%20fill%3D%22%230f172a%22%3E%0A%20%20%20%20%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22%23090d16%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2230%22%20y%3D%2225%22%20width%3D%22540%22%20height%3D%22350%22%20rx%3D%2214%22%20fill%3D%22%230f172a%22%20stroke%3D%22%238b5cf6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2230%22%20y%3D%2225%22%20width%3D%22540%22%20height%3D%2245%22%20rx%3D%2214%22%20fill%3D%22%237c3aed%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22300%22%20y%3D%2254%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%3EPH%C3%81T%20HI%E1%BB%86N%20%E1%BA%A2NH%20T%E1%BB%94NG%20H%E1%BB%A2P%20DO%20TR%C3%8D%20TU%E1%BB%86%20NH%C3%82N%20T%E1%BA%A0O%20(AI%20GENERATED%20%2F%20DEEPFAKE)%3C%2Ftext%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22180%22%20cy%3D%22205%22%20r%3D%2285%22%20fill%3D%22%231e293b%22%20stroke%3D%22%23a78bfa%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%224%204%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22150%22%20cy%3D%22180%22%20r%3D%2214%22%20fill%3D%22%23334155%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22210%22%20cy%3D%22180%22%20r%3D%2214%22%20fill%3D%22%23334155%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22147%22%20cy%3D%22177%22%20r%3D%223%22%20fill%3D%22%23ef4444%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22206%22%20cy%3D%22182%22%20r%3D%223%22%20fill%3D%22%23ef4444%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M%20180%20195%20L%20175%20220%20L%20185%20220%22%20stroke%3D%22%23a78bfa%22%20fill%3D%22none%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M%20155%20245%20Q%20180%20260%20205%20245%22%20stroke%3D%22%23ef4444%22%20fill%3D%22none%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%2290%22%20width%3D%22220%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23ef4444%22%20opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22180%22%20y%3D%22106%22%20font-family%3D%22monospace%22%20font-size%3D%2210%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%3E%5BL%E1%BB%96I%20%C4%90%E1%BB%92NG%20T%E1%BB%AC%20%26%20B%E1%BA%A4T%20%C4%90%E1%BB%90I%20X%E1%BB%A8NG%20CATCHLIGHT%5D%3C%2Ftext%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22295%22%20width%3D%22220%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23ef4444%22%20opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22180%22%20y%3D%22311%22%20font-family%3D%22monospace%22%20font-size%3D%2210%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%3E%5BDA%20WAXY%20NH%E1%BB%B0A%20-%20THI%E1%BA%BEU%20PRNU%20C%E1%BA%A2M%20BI%E1%BA%BEN%5D%3C%2Ftext%3E%0A%20%20%20%20%3Crect%20x%3D%22310%22%20y%3D%2285%22%20width%3D%22240%22%20height%3D%22270%22%20rx%3D%228%22%20fill%3D%22%231e1b4b%22%20stroke%3D%22%236366f1%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22325%22%20y%3D%22115%22%20font-family%3D%22monospace%22%20font-size%3D%2212%22%20font-weight%3D%22bold%22%20fill%3D%22%2338bdf8%22%3EK%E1%BA%BET%20QU%E1%BA%A2%20PH%C3%82N%20T%C3%8DCH%20AI%3A%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22325%22%20y%3D%22145%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2211%22%20fill%3D%22%23f87171%22%3E%E2%80%A2%20M%C3%B4%20h%C3%ACnh%3A%20Diffusion%20%2F%20Midjourney%20%2F%20Flux%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22325%22%20y%3D%22175%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2211%22%20fill%3D%22%23f87171%22%3E%E2%80%A2%20T%E1%BA%A7n%20s%E1%BB%91%20FFT%3A%20M%E1%BA%A5t%20c%C3%A2n%20b%E1%BA%B1ng%20ph%E1%BB%95%20cao%20t%E1%BA%A7n%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22325%22%20y%3D%22205%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2211%22%20fill%3D%22%23f87171%22%3E%E2%80%A2%20V%C3%A2n%20c%E1%BA%A3m%20bi%E1%BA%BFn%20(PRNU)%3A%200%25%20d%E1%BA%A5u%20v%C3%A2n%20v%E1%BA%ADt%20l%C3%BD%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22325%22%20y%3D%22235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2211%22%20fill%3D%22%23f87171%22%3E%E2%80%A2%20L%E1%BB%97i%20VAE%20Decoder%3A%20M%E1%BB%9D%20nh%C3%B2e%20vi%E1%BB%81n%20ch%C3%A2n%20t%C3%B3c%3C%2Ftext%3E%0A%20%20%20%20%3Crect%20x%3D%22325%22%20y%3D%22270%22%20width%3D%22210%22%20height%3D%2265%22%20rx%3D%226%22%20fill%3D%22%23450a0a%22%20stroke%3D%22%23ef4444%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%22430%22%20y%3D%22295%22%20font-family%3D%22monospace%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fca5a5%22%3ER%E1%BB%A6I%20RO%20SYNTHETIC%3A%2096%25%3C%2Ftext%3E%0A%20%20%20%20%3Ctext%20x%3D%22430%22%20y%3D%22315%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2210%22%20text-anchor%3D%22middle%22%20fill%3D%22%23fca5a5%22%3EX%C3%A1c%20nh%E1%BA%ADn%20%E1%BA%A3nh%20do%20AI%20sinh%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E",
    "result": {
      "isFake": true,
      "authenticityScore": 14,
      "documentType": "ai_generated",
      "extractedText": "[PHÂN TÍCH QUANG PHỔ AI] Phát hiện đặc trưng mô hình Diffusion Model (Midjourney / Flux / SDXL). Không phát hiện văn bản ký tự có ý nghĩa ngữ nghĩa (chỉ có hoa văn tổng hợp kỹ thuật số).",
      "summary": "PHÁT HIỆN ẢNH TỔNG HỢP DO TRÍ TUỆ NHÂN TẠO (AI GENERATED / DEEPFAKE). Phân tích cấu trúc bề mặt da, quang phổ tần số cao FFT và vi vân cảm biến quang học (PRNU) xác nhận bức ảnh được tạo lập 100% bằng thuật toán AI tạo sinh.",
      "anomalies": [
        {
          "box": "Khu vực Da mặt & Chi tiết biểu cảm",
          "label": "Bề mặt da phi tự nhiên (Waxy Plastic Skin)",
          "severity": "critical",
          "explain": "Hiện tượng da láng mịn quá mức đặc trưng của mô hình khuếch tán (Diffusion Models), thiếu hoàn toàn vi vân lỗ chân lông và cấu trúc micro-texture sinh học tự nhiên."
        },
        {
          "box": "Đồng tử mắt & Điểm phản xạ ánh sáng",
          "label": "Bất đối xứng quang học (Catchlight Asymmetry)",
          "severity": "critical",
          "explain": "Điểm phản xạ ánh sáng trong hai đồng tử mắt lệch nhau về góc phản chiếu và nguồn sáng môi trường, chứng minh hình ảnh không được chụp từ camera vật lý."
        },
        {
          "box": "Viền chân tóc & Vùng tiếp giáp nền",
          "label": "Nội suy mờ nhòe (VAE Decoder Artifacts)",
          "severity": "warning",
          "explain": "Các sợi tóc giao thoa với hậu cảnh có hiện tượng hòa lẫn pixel bất thường và răng cưa mờ nhòe do bộ giải mã tiềm ẩn (Latent Decoder) của AI."
        },
        {
          "box": "Phổ tần số cao (High-Frequency Spectrum)",
          "label": "Thiếu dấu vân cảm biến vật lý (PRNU)",
          "severity": "critical",
          "explain": "Máy ảnh vật lý luôn để lại dấu vân nhiễu cảm biến PRNU (Photo Response Non-Uniformity). Bức ảnh này hoàn toàn vắng bóng PRNU của cảm biến quang học."
        }
      ],
      "administrativeChecks": [
        {
          "rule": "Tiêu chuẩn nhận diện truyền thông tổng hợp",
          "standard": "ISO/IEC DIS 30107 & C2PA Specification",
          "status": "violation",
          "details": "Thiếu chữ ký số xuất xứ nội dung C2PA (Coalition for Content Provenance and Authenticity) và có dấu hiệu che giấu nhãn AI."
        },
        {
          "rule": "Kiểm tra cảm biến quang học vật lý",
          "standard": "Digital Image Forensics (PRNU Signature)",
          "status": "violation",
          "details": "Ma trận lượng tử hóa và tần số phổ Fourier (FFT) phản ánh đặc trưng của mạng nơ-ron nhân tạo chứ không phải ống kính máy ảnh quang học."
        },
        {
          "rule": "Rà soát quy chuẩn phòng chống Deepfake",
          "standard": "Nghị định quản lý thông tin mạng Internet",
          "status": "suspicious",
          "details": "Hình ảnh nhân vật tổng hợp có nguy cơ bị sử dụng vào mục đích tạo danh tính ảo hoặc mạo danh người khác trong các cuộc gọi lừa đảo."
        }
      ],
      "verdictRecommendation": "Cảnh báo: Đây là hình ảnh do AI tạo lập (Synthetic Media / Deepfake). Tuyệt đối không sử dụng làm bằng chứng pháp lý, ảnh căn cước hay chứng thực cho các sự kiện có thật."
    }
  }
];
