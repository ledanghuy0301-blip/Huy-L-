export interface ScenarioOption {
  text: string;
  isSafe: boolean;
  feedback: string;
  points: number;
}

export interface ScenarioStep {
  callerSpeech: string;
  trapTag: string;
  trapExplain: string;
  options: ScenarioOption[];
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  callerNumber: string;
  callerName: string;
  avatarColor: string;
  steps: ScenarioStep[];
}

export const fraudScenarios: Scenario[] = [
  {
    "id": "s-1",
    "title": "Kịch bản 1: Giả danh Điều tra viên Công an",
    "category": "Thao túng dọa bắt giam & Rửa tiền",
    "callerNumber": "024.7109.8888",
    "callerName": "Đại úy Trần Văn Nam (Bộ Công an)",
    "avatarColor": "bg-red-900/60 text-red-300 border-red-700",
    "steps": [
      {
        "callerSpeech": "Tôi là Đại úy Trần Văn Nam, điều tra viên Cục Cảnh sát Hình sự. Hiện căn cước công dân của bạn đang mở tài khoản tại ngân hàng liên quan đến đường dây rửa tiền xuyên quốc gia trị giá 45 tỷ đồng. Lệnh bắt tạm giam đã được Viện Kiểm sát phê chuẩn!",
        "trapTag": "Bẫy đe dọa pháp luật & Tâm lý hoảng sợ",
        "trapExplain": "Kẻ lừa đảo sử dụng chức danh ngành công an và thuật ngữ tư pháp nặng nề (lệnh bắt, rửa tiền) nhằm làm nạn nhân tê liệt khả năng suy xét logic.",
        "options": [
          {
            "text": "Dạ em không biết gì hết, em phải làm sao để chứng minh mình vô tội ạ?",
            "isSafe": false,
            "feedback": "Sai lầm! Bộc lộ sự hoảng loạn sẽ khiến kẻ lừa đảo dễ dàng dồn ép bạn vào các bước tiếp theo.",
            "points": 0
          },
          {
            "text": "Cơ quan công an không làm việc qua điện thoại. Nếu có lệnh, đề nghị các anh gửi giấy triệu tập về Công an phường nơi tôi cư trú.",
            "isSafe": true,
            "feedback": "Xuất sắc! Đây là nguyên tắc vàng theo quy định của Bộ Công an. Tắt máy ngay.",
            "points": 50
          },
          {
            "text": "Để tôi gọi cho người nhà làm công an hỏi lại xem thế nào.",
            "isSafe": true,
            "feedback": "Khá tốt! Việc kiểm tra chéo qua người thân sẽ giúp bạn tỉnh táo thoát khỏi bẫy thao túng.",
            "points": 40
          }
        ]
      },
      {
        "callerSpeech": "Yêu cầu bạn giữ bí mật tuyệt đối theo Điều 177 Bộ luật Tố tụng Hình sự! Không được nói cho bất kỳ ai biết kể cả người thân. Bây giờ bạn cần kê khai toàn bộ số dư và chuyển vào tài khoản tạm giữ của Hội đồng Giám định để phục vụ thanh tra trong 24 giờ.",
        "trapTag": "Bẫy cô lập nạn nhân & Đòi chuyển tiền",
        "trapExplain": "Kẻ gian luôn yêu cầu \"tuyệt đối bí mật\" để nạn nhân không có cơ hội tham khảo ý kiến chuyên gia, sau đó dồn ép chuyển tiền vào tài khoản mạo danh.",
        "options": [
          {
            "text": "Cho tôi xin số tài khoản tạm giữ để tôi ra ngân hàng chuyển gấp.",
            "isSafe": false,
            "feedback": "Nguy hiểm! Tuyệt đối không bao giờ chuyển tiền cho bất kỳ ai qua điện thoại, bạn sẽ mất trắng.",
            "points": 0
          },
          {
            "text": "Cơ quan nhà nước không có tài khoản ngân hàng cá nhân nào gọi là \"tài khoản tạm giữ\". Tôi cúp máy và báo công an ngay bây giờ!",
            "isSafe": true,
            "feedback": "Chính xác 100%! Cơ quan tố tụng không bao giờ thu tiền hay lập tài khoản tạm giữ qua điện thoại.",
            "points": 50
          },
          {
            "text": "Tôi chỉ có vài triệu trong tài khoản, có chuyển được không anh?",
            "isSafe": false,
            "feedback": "Sai lầm! Kẻ gian sẽ vét sạch dù bạn chỉ có vài trăm nghìn đồng.",
            "points": 0
          }
        ]
      }
    ]
  },
  {
    "id": "s-2",
    "title": "Kịch bản 2: Giả mạo Cán bộ Thuế / Cài ứng dụng VNeID giả mạo",
    "category": "Chiếm quyền điều khiển điện thoại (Trojan APK)",
    "callerNumber": "0834.567.890",
    "callerName": "Cán bộ Thuế hỗ trợ doanh nghiệp",
    "avatarColor": "bg-amber-900/60 text-amber-300 border-amber-700",
    "steps": [
      {
        "callerSpeech": "Chào anh/chị, em là cán bộ Chi cục Thuế. Hồ sơ quyết toán thuế và định danh điện tử của anh/chị chưa đồng bộ nên đang bị phạt chậm trễ 5 triệu đồng. Em sẽ gửi link Zalo cho anh/chị tải ứng dụng \"Dịch vụ công\" bản nâng cấp về cài đặt để miễn phạt.",
        "trapTag": "Bẫy phạt tiền giả định & Gửi mã độc .APK",
        "trapExplain": "Kẻ xấu viện cớ lỗi hệ thống hoặc nợ phạt để thúc ép nạn nhân tải file cài đặt ngoài luồng (file đuôi .apk) chứa mã độc.",
        "options": [
          {
            "text": "Vâng bạn gửi link Zalo đi để mình tải về cài ngay.",
            "isSafe": false,
            "feedback": "Rất nguy hiểm! Cài file .apk từ link lạ sẽ khiến điện thoại bị chiếm quyền, kẻ gian tự chuyển sạch tiền.",
            "points": 0
          },
          {
            "text": "Tôi chỉ tải ứng dụng từ Google Play Store hoặc App Store chính thức. Tôi sẽ lên trực tiếp bộ phận một cửa của Chi cục Thuế để làm việc.",
            "isSafe": true,
            "feedback": "Tuyệt vời! Cơ quan nhà nước không bao giờ gửi link qua Zalo hay yêu cầu cài file ngoài chợ ứng dụng.",
            "points": 50
          }
        ]
      }
    ]
  },
  {
    "id": "s-3",
    "title": "Kịch bản 3: Đe dọa khóa SIM viễn thông sau 2 tiếng",
    "category": "Mạo danh nhà mạng đoạt mã OTP",
    "callerNumber": "028.9999.1234",
    "callerName": "Tổng đài Chăm sóc Khách hàng",
    "avatarColor": "bg-blue-900/60 text-blue-300 border-blue-700",
    "steps": [
      {
        "callerSpeech": "Tổng đài thông báo: Thuê bao của quý khách chưa chuẩn hóa thông tin cá nhân và sẽ bị khóa liên lạc 2 chiều vĩnh viễn sau 2 giờ nữa. Bấm phím 1 để gặp tổng đài viên hỗ trợ, hoặc đọc mã xác nhận OTP đang gửi về máy.",
        "trapTag": "Bẫy giới hạn thời gian gấp gáp (Urgency)",
        "trapExplain": "Kẻ gian tạo áp lực thời gian \"2 giờ nữa bị khóa sim\" khiến nạn nhân cuống cuồng làm theo mà không kịp suy xét.",
        "options": [
          {
            "text": "Đọc luôn mã OTP vừa nhận để mở khóa sim.",
            "isSafe": false,
            "feedback": "Mã OTP là chìa khóa tài khoản! Đọc mã OTP đồng nghĩa bạn dâng tài khoản cho kẻ lừa đảo.",
            "points": 0
          },
          {
            "text": "Cúp máy, tự mở ứng dụng My Viettel / My VNPT chính thức hoặc ra cửa hàng giao dịch của nhà mạng để kiểm tra.",
            "isSafe": true,
            "feedback": "Rất đúng đắn! Luôn chủ động kiểm tra qua kênh chính thức của nhà mạng.",
            "points": 50
          }
        ]
      }
    ]
  }
];
