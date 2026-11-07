# CONTENT REWRITE V2 — EDITORIAL QUALITY REVISION

Hãy tiếp tục chỉnh sửa trực tiếp trên nhánh `content-rewrite-v2-preserve-qr` của draft PR #38.

KHÔNG tạo PR mới, không merge và không deploy.

Tôi đã được kiểm tra độc lập 29 bài trong PR #38 và nhận được phản hồi rằng bản viết lại vẫn chưa đạt chất lượng mong muốn.

## 1. Những vấn đề đã xác nhận

- 28/29 bài chỉ có đúng ba mục nội dung chính, E01 có bốn mục.
- Các bài khá ngắn, nhiều phần chỉ nêu ý mà chưa giải thích thấu đáo.
- Một số nội dung giống bản tóm tắt kiến thức hơn là bài viết phổ biến tâm lý học có chiều sâu.
- Vẫn xuất hiện các chú thích học thuật mang tính phòng vệ, giải thích quy trình biên tập.
- “Mô tả tương đương bằng chữ” vẫn hiển thị ngay trong mạch đọc và gây ngắt quãng.
- Chất lượng câu chữ đã cải thiện nhưng cấu trúc toàn bộ bài còn quá giống nhau.

Đây là yêu cầu CHỈNH SỬA NỘI DUNG THỰC CHẤT, không phải chỉ tăng số chữ, thêm tiêu đề hoặc thay đổi CSS.

## 2. Viết lại theo trọng tâm riêng của mỗi bài

Với cả 29 bài, hãy kiểm tra lại nội dung theo tư duy 5W1H:

- Khái niệm hoặc vấn đề thực sự là gì?
- Bản chất hoặc cơ chế tâm lý liên quan là gì?
- Vì sao hiện tượng xuất hiện, hoặc những yếu tố nào có liên quan?
- Nó thể hiện và tác động thế nào trong đời sống học đường?
- Có những hiểu lầm nào đáng lưu ý?
- Học sinh có thể ứng dụng kiến thức như thế nào?
- Đọc xong, điều quan trọng nhất cần hiểu là gì?

Không ép các bài vào cùng một số mục. Độ dài phụ thuộc độ phức tạp và giá trị kiến thức, không phụ thuộc quota từ.

Mỗi bài cần có một luận điểm trung tâm, những phần giải thích đủ sâu và trình tự triển khai mạch lạc.

## 3. Ưu tiên sáu bài nghiệm thu

C01 — Giải thích kỹ hơn cảm xúc là gì, chức năng, quá trình liên quan, ảnh hưởng tới suy nghĩ/hành vi, phân biệt cảm xúc với suy nghĩ, cách nhận diện và điều hòa phù hợp. Không chỉ hướng dẫn gọi tên cảm xúc.

C05 — Đi sâu vào nguồn gốc áp lực thi, tác động tới chú ý và học tập, cách ôn tập có bằng chứng, quản lý khối lượng học và những điều kiện thực tế ảnh hưởng tới kế hoạch.

C11 — Giữ rõ dấu hiệu bắt nạt, khác biệt với mâu thuẫn thông thường, ảnh hưởng tâm lý, cơ chế nhóm và vai trò của người chứng kiến, phương án hỗ trợ an toàn.

C17 — Giải thích nhu cầu ngủ ở tuổi vị thành niên, đồng hồ sinh học, áp lực ngủ, các yếu tố môi trường và lịch học, hậu quả thiếu ngủ, cách cải thiện và khi nào nên đi khám.

E01 — Giải thích bốn cặp khuynh hướng MBTI cụ thể, cách tạo 16 kiểu, cách diễn giải kết quả, khác biệt với 16Personalities, bằng chứng và các giới hạn ứng dụng.

E05 — Giải thích rõ giả thuyết phong cách học tập, lý do một sở thích không tương đương với hiệu quả học tập, bằng chứng khoa học, ví dụ lựa chọn phương pháp phù hợp với từng môn và cách tự đánh giá hiệu quả học.

Sau đó áp dụng cùng tiêu chuẩn chất lượng cho 23 bài còn lại, nhưng không sao chép cùng bố cục.

## 4. Sửa cách viết

Văn phong cần tự nhiên, trưởng thành, phù hợp học sinh THPT.

- Giải thích bằng ví dụ cụ thể khi cần, không dùng nhân vật giả định kéo dài.
- Không viết những câu hiển nhiên nhằm tăng độ dài.
- Giảm việc liên tục khẳng định bài học “không phải thang đo”, “không bảo đảm hiệu quả”, “không phải nghiên cứu thực nghiệm”.
- Giữ cảnh báo thật sự cần thiết cho an toàn hoặc tính chính xác khoa học.
- Chuyển giới hạn nghiên cứu quan trọng thành một phần giải thích tự nhiên.
- Dùng trích dẫn ở các nhận định chuyên môn quan trọng, không đưa tên nhà nghiên cứu vào mọi đoạn.
- Đoạn nào cũng cần đóng góp kiến thức hoặc giúp người đọc hiểu rõ hơn.

## 5. Chỉnh lại chú thích hình và Reader

Kiểm tra 29 bài cùng 29 hình SVG.

Loại các chú thích hiện lên như văn bản kỹ thuật hoặc giải trình nội bộ.

Các phần mô tả tương đương dài vẫn phải hỗ trợ người dùng công nghệ trợ năng, nhưng không mặc định hiển thị thành các đoạn văn chen giữa bài đọc.

Có thể sử dụng cơ chế visually-hidden, phần mở rộng có chủ đích hoặc giải pháp accessibility phù hợp. Kiểm tra screen reader semantics, aria-describedby, alt text và trường hợp CSS không tải.

Chú thích hiển thị bên dưới hình phải ngắn, có ý nghĩa và giúp hiểu hình.

Không xóa thông tin học thuật quan trọng để làm chú thích ngắn hơn.

## 6. Nguồn nghiên cứu

Rà soát những nhận định quan trọng đối chiếu với nguồn gốc, đặc biệt khi bản mới bổ sung cơ chế hoặc nghiên cứu.

16/71 URL chưa truy cập được qua công cụ không đồng nghĩa 16 nguồn sai. Không tự xóa nguồn chỉ vì công cụ bị chặn.

Phải phân biệt:
- Nguồn đã kiểm chứng.
- Nguồn chưa truy cập được đầy đủ.
- Nhận định cần xác minh thêm.

Không bịa trích dẫn, số liệu hoặc nghiên cứu.

## 7. Điều kiện nghiệm thu

Ngoài kiểm thử kỹ thuật, hãy thực hiện đánh giá biên tập thực sự.

Với từng bài, viết ngắn:
- Kiến thức trọng tâm đã triển khai.
- Điều mới được giải thích sâu hơn so với V2.
- Ví dụ hoặc ứng dụng đáng giữ.
- Điểm còn hạn chế hoặc cần xác minh.

Không đánh giá PASS chỉ vì có đủ bài, đủ tiêu đề hoặc đạt một số từ nhất định.

Kiểm tra chất lượng bằng cách đọc toàn văn như một học sinh THPT: đọc xong có thể giải thích lại khái niệm và vận dụng đúng hay không?

## 8. Bảo vệ website đã nộp

Giữ nguyên:
https://wispy-silence-8006.susootran207.workers.dev/

Không đổi Worker, QR, slug bài viết, cấu trúc điều hướng hoặc các hiệu ứng đã hoàn thiện.

Không merge hoặc deploy.

Tiếp tục sử dụng pipeline Academic Showcase V2 hiện có, cập nhật chính xác content hash, manifest, asset metadata và build sau khi biên tập.

Chỉ bàn giao một bản nội dung đã được cải thiện thực sự trên PR #38, kèm ZIP mới và kết quả kiểm thử.

MỤC TIÊU: 29 bài không chỉ gọn hơn bản cũ mà còn hay hơn, sâu sắc hơn, mạch lạc hơn và có giá trị kiến thức thực sự đối với học sinh.
