# Academic Showcase — Editorial Quality Revision, PR #38

URL đã nộp giữ nguyên: **https://wispy-silence-8006.susootran207.workers.dev/**. Không đổi Worker/subdomain, QR, slug hoặc điều hướng. Không merge hoặc deploy.

Lượt này tiếp tục trực tiếp trên nhánh `content-rewrite-v2-preserve-qr`, từ bản PR `6db2c0775ba76c976bbfadc93ac4ccbd4a7e654f`, theo toàn văn yêu cầu ở [EDITORIAL-REQUEST.md](EDITORIAL-REQUEST.md). Commit F0 gốc vẫn là `ad22186aa03053ff6050a8cefa65eacd9885bd68`.

## Nội dung và rà soát

Nguồn 29 bài đọc mới nằm trong `articles/`. Sáu bài C01/C05/C11/C17/E01/E05 được viết lại phần thân theo các điểm nghiệm thu; 23 bài còn lại phát triển lập luận theo vấn đề riêng. Giải thích cơ chế, phân biệt khái niệm, ví dụ và cách dùng kiến thức được đặt trong mạch bài; đã đọc lại để gộp các đoạn lặp. Không dùng số mục hay độ dài làm kết luận chất lượng.

[EDITORIAL-REVIEW.md](EDITORIAL-REVIEW.md) ghi riêng cho từng bài: kiến thức trọng tâm, điều giải thích sâu hơn, ví dụ đáng giữ, giới hạn và câu hỏi hiểu/vận dụng cùng ý cần trả lời. Đây là tự rà soát của trợ lý biên soạn, chưa là nghiệm thu bởi học sinh hoặc chuyên gia độc lập. [BEFORE-AFTER.md](BEFORE-AFTER.md) cho sáu mẫu so với bản PR trước lượt này.

Giữ các nguồn cũ và bổ sung năm nguồn cho những phần cần căn cứ mới. [RESEARCH-VERIFICATION.md](RESEARCH-VERIFICATION.md) phân biệt phần đã đọc trực tiếp, nguồn giới hạn truy cập/toàn văn và nhận định cần kiểm thêm. Audit 71 URL lịch sử được giữ với đúng ý nghĩa là log truy cập, không phải chứng nhận toàn văn.

## Hình và Reader

29 SVG giữ thiết kế, được rà lại alt, title/desc và chữ liên quan. Chú thích hiển thị ngắn, giải thích ý hình và giữ nguồn phù hợp. Thông tin học thuật cần thiết nằm trong phần giải thích hoặc tài liệu tham khảo; bỏ lời giải trình kỹ thuật ở chân hình.

Mô tả dài có native `details/summary` đóng mặc định, mở bằng chuột hoặc bàn phím. Ảnh dùng alt ngắn và `aria-describedby` tới mô tả tương ứng, kể cả trong hộp phóng lớn. Khi CSS không tải, cơ chế mở vẫn hoạt động. Vòng focus dialog gồm cả summary. Đây là thay đổi Reader được yêu cầu; không thiết kế lại giao diện.

## Build và bảo vệ baseline

`prototype/editorial/academic-rewrite.json` ghim hash nội dung, revision, asset metadata. `academic-reference-additions.ts` khai báo rõ nguồn bổ sung; validator vẫn từ chối thay đổi khác ngoài phạm vi. Build academic dùng trực tiếp nguồn đã sửa và xuất **`prototype/dist-academic`**. Không lấy `dist` standard thay cho artifact này.

Không sửa `source-manifest.json`, catalogue F0, weekly registry, policy/hồ sơ duyệt lịch sử, nguồn bài nháp cũ, public artworks hoặc HTML gốc. Trong src chỉ sửa ArticleReader và stylesheet Markdown cho disclosure/focus. Không tạo phê duyệt giả, đổi trạng thái xuất bản F0 hoặc gán approvals cũ cho nội dung mới. Chữ/bản viết mới do trợ lý AI biên soạn; hồ sơ sản xuất nằm ở đây, ngoài phần bài đọc.

Xem [VALIDATION.md](VALIDATION.md), [ROUTE-MATRIX.md](ROUTE-MATRIX.md), `ARTIFACT.json` và `SHA256SUMS.txt`. ZIP mới cùng hồ sơ nghiệm thu được đính kèm trong [artifacts/](artifacts/). [WORKERS-HANDOFF.md](WORKERS-HANDOFF.md) giữ hướng dẫn kiểm cấu hình thực, preview/version, rollback và QR; chưa thực hiện thao tác Cloudflare nào.
