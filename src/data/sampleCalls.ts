export interface SampleCall {
  id: string;
  title: string;
  tag: string;
  phone: string;
  transcript: string;
  expectedRisk?: number;
  audioDurationSec?: number;
  expectedRiskLevel?: 'scam' | 'suspicious' | 'safe';
  keyPsyTactics?: string[];
  [key: string]: any;
}

export const sampleScamCalls: SampleCall[] = [
  {
    "id": "c1",
    "title": "Giả danh Điều tra viên Công an (Dọa rửa tiền 45 tỷ & Lệnh bắt)",
    "tag": "Tư pháp giả mạo",
    "phone": "024.7109.8888",
    "transcript": "Tôi là cán bộ điều tra thuộc Cơ quan Cảnh sát Điều tra Công an Thành phố Hà Nội. Căn cước công dân của bạn đang đứng tên mở tài khoản tại ngân hàng liên quan đến đường dây rửa tiền quốc tế 45 tỷ đồng. Viện kiểm sát đã phê chuẩn lệnh bắt tạm giam và phong tỏa tài sản. Yêu cầu bạn giữ bí mật tuyệt đối và nộp toàn bộ tiền tiết kiệm vào tài khoản phong tỏa của thanh tra trong 24 giờ để chứng minh vô tội.",
    "expectedRisk": 95
  },
  {
    "id": "c2",
    "title": "Cấp cứu Viện phí Khẩn cấp (Con bị tai nạn giao thông nguy kịch)",
    "tag": "Thao túng tâm lý gia đình",
    "phone": "090.318.9922",
    "transcript": "Alo, có phải phụ huynh của cháu Minh đang học lớp 11A không? Tôi là thầy giáo thể dục của trường đây. Cháu vừa bị ngã cầu thang va đập đầu chấn thương sọ não rất nặng, đang cấp cứu nguy kịch ở Bệnh viện Chợ Rẫy. Bác sĩ yêu cầu gia đình phải chuyển gấp 50 triệu viện phí tạm ứng để đưa vào phòng mổ ngay trong 10 phút, nếu chậm trễ sẽ nguy hiểm tính mạng!",
    "expectedRisk": 98
  },
  {
    "id": "c3",
    "title": "Khóa Thuê bao Viễn thông sau 2 giờ vì Nợ cước",
    "tag": "Lừa đảo cước & Chiếm đoạt SIM",
    "phone": "+84.28.9999.0011",
    "transcript": "Cục Viễn thông xin thông báo: Thuê bao của quý khách chưa hoàn thành chuẩn hóa thông tin định danh và đang phát sinh nợ cước viễn thông 8 triệu đồng. Thuê bao sẽ bị khóa vĩnh viễn và chuyển hồ sơ sang tòa án sau 2 giờ. Vui lòng bấm phím 1 để gặp nhân viên hỗ trợ và cung cấp mã OTP để được xử lý.",
    "expectedRisk": 88
  },
  {
    "id": "c4",
    "title": "Tuyển CTV làm Nhiệm vụ Sàn Shopee / TikTok Hoa hồng 30%",
    "tag": "Bẫy nạp tiền giật đơn",
    "phone": "098.776.5432",
    "transcript": "Chào bạn, mình là nhân sự bên sàn thương mại điện tử Shopee. Hiện bên mình đang tuyển cộng tác viên xử lý đơn hàng tại nhà, thu nhập 500k đến 2 triệu một ngày không cần kinh nghiệm. Bạn chỉ cần nạp 200k làm nhiệm vụ duyệt đơn đầu tiên, hệ thống sẽ hoàn vốn kèm hoa hồng 30% sau 5 phút qua Telegram.",
    "expectedRisk": 90
  },
  {
    "id": "c5",
    "title": "Cuộc gọi An toàn: Bệnh viện Bạch Mai nhắc lịch Tái khám",
    "tag": "Chính thống hợp pháp",
    "phone": "024.3869.3731",
    "transcript": "Xin chào bác, cháu gọi từ Khoa Khám bệnh theo yêu cầu của Bệnh viện Bạch Mai. Cháu xin phép nhắc bác về lịch hẹn khám chuyên khoa Tim mạch vào 8 giờ 30 sáng thứ 5 tuần này theo đơn thuốc trước đó. Khi đi bác nhớ mang theo sổ khám và CCCD, bệnh viện không yêu cầu chuyển tiền trước qua điện thoại ạ.",
    "expectedRisk": 10
  }
];
