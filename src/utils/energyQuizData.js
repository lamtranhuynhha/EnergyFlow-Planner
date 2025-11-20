/**
 * Energy Profile Quiz Data
 * 12 câu hỏi chia thành 4 nhóm:
 * - Chronotype (Q1-3): Đồng hồ sinh học
 * - Peak (Q4-6): Đỉnh năng lượng
 * - Recovery (Q7-9): Hồi phục
 * - External (Q10-12): Yếu tố bên ngoài
 */

export const quizQuestions = [
  // === CHRONOTYPE (Q1-3) ===
  {
    id: 1,
    category: 'chronotype',
    question: 'Vào ngày KHÔNG phải đi làm/đi học, bạn thường:',
    options: [
      { text: 'Ngủ trước 23h, dậy trước 7h', weight: 3 },
      { text: 'Ngủ 23-24h, dậy 7-8h', weight: 2 },
      { text: 'Ngủ 0-1h, dậy 8-9h', weight: 1 },
      { text: 'Ngủ sau 1h, dậy sau 9h', weight: 0 }
    ]
  },
  {
    id: 2,
    category: 'chronotype',
    question: 'Bạn cảm thấy TỈNH TÁO NHẤT vào khoảng:',
    options: [
      { text: '5-8h sáng', weight: 3 },
      { text: '8-11h sáng', weight: 2 },
      { text: '11h-14h', weight: 1 },
      { text: '14-18h', weight: 0.5 },
      { text: 'Sau 18h', weight: 0 }
    ]
  },
  {
    id: 3,
    category: 'chronotype',
    question: 'Nếu phải thức dậy lúc 6h và chỉ được ngủ 4h, bạn sẽ:',
    options: [
      { text: 'Khó chịu nhưng vẫn làm việc hiệu quả buổi sáng', weight: 3 },
      { text: 'Cần 1-2 tách cà phê mới hoạt động được', weight: 2 },
      { text: 'Không làm được gì trước 10h', weight: 1 },
      { text: '"Chết lâm sàng" cả ngày', weight: 0 }
    ]
  },

  // === PEAK ENERGY (Q4-6) ===
  {
    id: 4,
    category: 'peak',
    question: 'Trong 1 tuần bình thường, bạn làm việc KHÓ TẬP TRUNG NHẤT vào:',
    options: [
      { text: '6-9h sáng', weight: 0 },
      { text: '11-13h', weight: 1 },
      { text: '15-17h', weight: 2 },
      { text: '19-21h', weight: 3 },
      { text: 'Không có khung giờ nào đặc biệt khó', weight: 1.5 }
    ]
  },
  {
    id: 5,
    category: 'peak',
    question: 'Bạn có thể "vào guồng" làm việc sáng tạo NHANH NHẤT vào:',
    options: [
      { text: 'Trước 9h', weight: 3 },
      { text: '9-11h', weight: 2 },
      { text: '11-14h', weight: 1 },
      { text: '16-19h', weight: 0.5 },
      { text: 'Sau 21h', weight: 0 }
    ]
  },
  {
    id: 6,
    category: 'peak',
    question: 'Nếu phải họp quan trọng 30 phút, bạn CHỌN khung giờ nào:',
    options: [
      { text: '7-8h', weight: 3 },
      { text: '9-10h', weight: 2 },
      { text: '13-14h', weight: 1 },
      { text: '16-17h', weight: 0.5 },
      { text: '20-21h', weight: 0 }
    ]
  },

  // === RECOVERY (Q7-9) ===
  {
    id: 7,
    category: 'recovery',
    question: 'Sau bữa trưa, bạn thường:',
    options: [
      { text: 'Vẫn tỉnh táo, không cần nghỉ', weight: 3 },
      { text: 'Cần 10-15 min power-nap hoặc cafe để khởi động lại', weight: 2 },
      { text: 'Phải nghỉ 30-45 min, không thì chiều "đi tong"', weight: 1 },
      { text: 'Luôn trong trạng thái uể oải đến tận tối', weight: 0 }
    ]
  },
  {
    id: 8,
    category: 'recovery',
    question: 'Cuối tuần bạn thường:',
    options: [
      { text: 'Dậy cùng giờ ngày thường, không cần bù ngủ', weight: 3 },
      { text: 'Ngủ thêm 30-60 min là đủ', weight: 2 },
      { text: 'Ngủ thêm 1-2h mới "đầy pin"', weight: 1 },
      { text: 'Ngủ thêm 2h++ hoặc vẫn mệt', weight: 0 }
    ]
  },
  {
    id: 9,
    category: 'recovery',
    question: 'Khi làm 1 task cực kỳ tập trung 90 min, sau đó:',
    options: [
      { text: 'Chỉ cần 5 min nghỉ là tiếp tục mạnh', weight: 3 },
      { text: 'Cần 15-20 min nghỉ/giải lao', weight: 2 },
      { text: 'Cần 30-40 min hoặc chuyển sang việc nhẹ', weight: 1 },
      { text: 'Hết năng lượng, không làm thêm gì được nữa', weight: 0 }
    ]
  },

  // === EXTERNAL FACTORS (Q10-12) ===
  {
    id: 10,
    category: 'external',
    question: 'Ánh sáng tự nhiên buổi sáng:',
    options: [
      { text: 'Rất quan trọng, tôi cảm thấy buồn ngủ nếu thiếu', weight: 3 },
      { text: 'Tốt nhưng không phải yếu tố quyết định', weight: 2 },
      { text: 'Không ảnh hưởng, tôi hoạt động được trong phòng kín', weight: 1 }
    ]
  },
  {
    id: 11,
    category: 'external',
    question: 'Tiếng ồn xung quanh:',
    options: [
      { text: 'Tôi cần yên tĩnh tuyệt đối mới tập trung', weight: 0 },
      { text: 'Chấp nhận ồn nhẹ, có nhạc không lời cũng được', weight: 2 },
      { text: 'Làm việc được trong quán café ồn ào', weight: 3 }
    ]
  },
  {
    id: 12,
    category: 'external',
    question: 'Bạn uống caffeine:',
    options: [
      { text: 'Không dùng hoặc <1 ly/ngày', weight: 0 },
      { text: '1-2 ly, trước 14h', weight: 1 },
      { text: '2-3 ly, có thể đến 16h', weight: 2 },
      { text: '3+ ly, sau 18h vẫn uống bình thường', weight: 3 }
    ]
  }
];

/**
 * Map weight scores to profile attributes
 */
export const profileMappings = {
  chronotype: {
    ranges: [
      { min: 0, max: 1, value: 'night-owl', label: 'Night Owl', peakStart: 14, peakEnd: 22 },
      { min: 1, max: 2, value: 'neutral', label: 'Neutral', peakStart: 10, peakEnd: 18 },
      { min: 2, max: 3, value: 'morning-lark', label: 'Morning Lark', peakStart: 6, peakEnd: 14 }
    ]
  },
  peak: {
    ranges: [
      { min: 0, max: 1, value: 'low', label: 'Low Amplitude' },
      { min: 1, max: 2, value: 'medium', label: 'Medium Amplitude' },
      { min: 2, max: 3, value: 'high', label: 'High Amplitude' }
    ]
  },
  recovery: {
    ranges: [
      { min: 0, max: 1, value: 'slow', label: 'Slow Recovery', breakTime: 30 },
      { min: 1, max: 2, value: 'normal', label: 'Normal Recovery', breakTime: 15 },
      { min: 2, max: 3, value: 'fast', label: 'Fast Recovery', breakTime: 5 }
    ]
  },
  external: {
    ranges: [
      { min: 0, max: 1.5, value: 'sensitive', label: 'Environment Sensitive' },
      { min: 1.5, max: 2.5, value: 'moderate', label: 'Moderately Flexible' },
      { min: 2.5, max: 3, value: 'flexible', label: 'Highly Flexible' }
    ]
  }
};
