# Kiểm tra Editorial Quality Revision — PR #38

Môi trường local ngày 07/11/2026: Node v24.19.0, npm 11.9.0, Chromium 154.0.8037.57 / Debian. Không merge hoặc deploy. Evidence mới nằm ở `evidence/editorial-quality/`; evidence ở cấp ngoài là lịch sử lượt trước.

## Nội dung: đánh giá lập luận, không suy từ số lượng

Đã tiếp nhận toàn văn [yêu cầu](EDITORIAL-REQUEST.md), đối chiếu nguồn bài với commit `6db2c0775ba76c976bbfadc93ac4ccbd4a7e654f` và tự đọc lại theo khái niệm–giải thích–ví dụ–vận dụng. Sáu bài trọng điểm được viết lại phần thân; 23 bài khác được phát triển theo vấn đề riêng. Khi đọc lại đã bỏ/gộp phần lặp ở C02/C04/C07/C19/E02/E03/E04, không giữ câu chỉ để tăng độ dài.

[EDITORIAL-REVIEW.md](EDITORIAL-REVIEW.md) có 29 nhận xét riêng cùng câu hỏi hiểu/vận dụng và ý cần giải thích được. Không đánh dấu chất lượng PASS vì đủ 29 bài, có nhiều tiêu đề hay đạt một số từ. Đây chưa phải nghiên cứu với học sinh hoặc duyệt độc lập bởi chuyên gia. [BEFORE-AFTER.md](BEFORE-AFTER.md) trình bày sáu mẫu nghiệm thu.

[RESEARCH-VERIFICATION.md](RESEARCH-VERIFICATION.md) ghi phần nguồn đã đối chiếu, mức truy cập và giới hạn. Giữ 71 URL lịch sử (kể cả URL không mở được) và bổ sung năm nguồn có mục đích cụ thể. Việc giữ bibliography không được diễn đạt thành đã đọc lại toàn bộ mọi tài liệu.

## Kiểm tra kỹ thuật

| Kiểm tra | Kết quả |
|---|---|
| Pins source manifest F0 `--check` | PASS, không thay baseline |
| `test:f0` | 22/22 |
| `test:r1` | 12/12 |
| `test:c1` | 34/34 |
| `test:w1` | 12/12 |
| `test:d1` | 4/4 |
| `test:g1` | 2/2 |
| `test:p2` | 8/8 |
| `test:w2` | 6/6 |
| `test:academic` / content pins | 4/4, kiểm hash, phạm vi nguồn, slug, metadata và negative mutations |
| Typecheck standard / build | PASS, `tsc -b`, build và publication guard |
| Typecheck academic / build | PASS, `tsc -p tsconfig.academic.json`, content pins, unit, Vite và scanner |
| Content validation standard | PASS, F0 giữ lại 29 bài, public source articles 0; canary được phát hiện |
| Academic scanner | PASS, 29 bài / 29 SVG / 10 chuyên đề / 68 static files |
| Browser Academic Showcase | 24/24, không skip hoặc retry/flaky trong báo cáo cuối |
| Browser hồi quy R1 | 8/8, gồm reflow 720 CSS px ở DPR2, keyboard, dialog, zoom, scroll, TOC/hash/reload và axe |
| Kiểm baseline bảo vệ | Nguồn F0, weekly, hồ sơ lịch sử, public artworks và HTML gốc không đổi |
| Kiểm diff | Không lỗi whitespace |

Tổng unit: 104; browser: 24 Academic Showcase + 8 R1. Các số trên chỉ là kết quả kỹ thuật, không dùng thay kết luận biên tập.

### Browser mở bản build mới

Suite academic phục vụ **`dist-academic`** qua HTTP, không dùng Vite dev. Kiểm 29 bài mở/reload ở 320/390/768/1024/1440 px; 10 chuyên đề mở/reload cùng các kích thước; DOM khớp AST của nội dung mới; ảnh, bảng, nguồn, mục lục và không tràn ngang. Mọi file trong 68 static files được request, SVG kiểm text không vượt viewBox. DOI có ngoặc vẫn giữ đầy đủ.

Giữ các bài kiểm trang chủ, thư viện, tìm kiếm/lọc, lịch sử, liên kết liên quan, Mây, hoa, gió, đèn, các lớp cảnh, phản ứng pointer/touch mô phỏng, reduced motion và việc không lưu/gửi lời nhắn riêng. Không vô hiệu hóa kiểm thử để vượt lỗi.

### Mô tả hình và accessibility

- Đủ 29 hình có alt ngắn, caption hiển thị và ID mô tả duy nhất. Long description ở native disclosure đóng mặc định, không chen thành đoạn trong mạch đọc.
- `aria-describedby` được kiểm bằng accessible description thực của image, kể cả khi disclosure đóng; mở bằng chuột và Enter.
- Chromium accessibility tree ghi disclosure không bị ignored và expanded chuyển false → true. JSON nằm trong evidence.
- Trong dialog: giữ tên, mô tả, focus trap gồm summary, phóng to/cuộn, Escape và trả focus về nút mở.
- Trang không tải CSS vẫn có native summary để mở và đọc mô tả; không phụ thuộc visually-hidden CSS hay JavaScript riêng để bật disclosure.
- Đã xem render mobile/desktop của disclosure đóng/mở. Kiểm tự động axe nằm trong các suite; chưa nghe thử bằng NVDA/VoiceOver thật và không tuyên bố chứng nhận toàn diện WCAG.

### Các lỗi gặp trong kiểm tra và cách xử lý

Lượt đầu của test mới lấy `innerText` ở phần đóng, nhận chuỗi rỗng; expectation được sửa thành `textContent` để yêu cầu **đầy đủ mô tả** phải có trong accessible description, không hạ điều kiện. Focus trap được bổ sung `summary` để bàn phím tới được điều khiển mới.

R1 harness cũ chỉ nạp global/atmosphere, thiếu stylesheet sân vườn hiện dùng trong main. Nó bị tràn ngang kể cả khi tháo disclosure về cấu trúc paragraph cũ trong phép chẩn đoán. Đã cập nhật harness nạp đúng stylesheet, kiểm lại điều hướng TOC mobile qua nút mở hiện có. Không đổi CSS sân vườn, không bỏ assertion tràn ngang hoặc kiểm focus. Screenshot R1 nay ghi vào test-results thay vì ghi đè ảnh lịch sử trong docs.

Log lần lỗi được giữ riêng để phân biệt với báo cáo cuối.

## Giới hạn và bàn giao

Mobile là emulation/CDP, không phải máy vật lý. Native synthetic pan vẫn có giới hạn đã được suite đối chứng trên plain HTML ghi nhận; không suy thành swipe vật lý đạt. Performance là local không throttle, không phải Lighthouse. Cảnh báo kích thước chunk Vite không được che bằng đổi ngưỡng.

Chưa có credentials Cloudflare nên không xác nhận version/type/bindings của production, không upload preview và không quét QR bằng camera thật. URL, Worker và main branch không được cập nhật bởi tác vụ này. Xem hướng dẫn Workers hiện có trước mọi thao tác cloud.

ZIP public chỉ lấy **`dist-academic`**; đối chiếu từng byte và ghi SHA-256 trong `ARTIFACT.json`/`SHA256SUMS.txt`. Hồ sơ nghiệm thu ZIP là gói đọc nội bộ, không upload nó làm static assets.
