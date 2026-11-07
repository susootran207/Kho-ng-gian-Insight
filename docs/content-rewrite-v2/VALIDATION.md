# Kết quả kiểm tra bản viết lại

Kiểm tra local ngày 07/11/2026. Node v24.19.0, npm 11.9.0, Chromium 154.0.8037.57 trên Debian. Không deploy, không merge, không đổi URL. Evidence nằm trong [evidence/](evidence/).

## Kiểm tra mã và nội dung

| Kiểm tra | Kết quả |
|---|---|
| `content:manifest -- --check` | PASS; baseline 29 bài không đổi |
| `test:f0` | 22/22 PASS |
| `test:r1` | 12/12 PASS |
| `test:c1` | 34/34 PASS |
| `test:w1` | 12/12 PASS |
| `test:d1` | 4/4 PASS |
| `test:g1` | 2/2 PASS |
| `test:p2` | 8/8 PASS |
| `test:w2` | 6/6 PASS |
| `test:academic` | 4/4 PASS, gồm negative tests cho route, hash, nguồn, trạng thái duyệt và baseline bị sửa |
| Typecheck standard | PASS qua `npm run build` / `tsc -b` |
| Typecheck academic | PASS qua `tsc -p tsconfig.academic.json` và `build:academic` |
| Pins nội dung academic | PASS qua `content:academic` / generator `--check` |
| Build standard + content validation | PASS; 39 files; giữ lại 29 bài khỏi public F0, 0 bài source public, 0 chuyên đề public; canary bị phát hiện đúng |
| Build Academic Showcase + scanner | PASS; 29 bài mới, 29 SVG, 10 chuyên đề, 68 files |
| `git diff --check` | PASS |
| So với baseline các đường dẫn bảo vệ | PASS; source manifest, catalogue, weekly registry, policy cũ, docs/phase-3, src, public và HTML gốc không đổi |

Tổng cộng 104 unit tests PASS, không fail/skip. Test dùng tệp tạm cho mutation rồi tự dọn; không sửa baseline để vượt kiểm tra. Số bảng và AST node thay đổi do bài được viết lại: kiểm thử trình duyệt so với AST của nguồn mới thay cho số lượng bảng cố định của bản cũ.

## Mở bản build trực tiếp trong trình duyệt

23/23 Playwright tests PASS, 0 fail, 0 skipped, 0 flaky. Test chạy HTTP server chỉ phục vụ `dist-academic`; không chạy Vite dev server. Báo cáo máy đọc được tại [browser-report.json](evidence/browser-report.json); stdout tại [browser-final.log](evidence/browser-final.log).

- Mở và reload cả 29 đường dẫn bài, ở 320, 390, 768, 1024, 1440 px: 145 lượt kiểm bài. Kiểm tiêu đề, DOM theo AST mới, đoạn mở đầu mới, bảng, liên kết nguồn, hình tải được, anchor mục lục và không tràn ngang.
- Mở và reload cả 10 chuyên đề ở cùng năm kích thước: 50 lượt kiểm chuyên đề. Kiểm số bài đúng liên kết hiện có.
- Mở đủ 68 tệp output qua HTTP và kiểm nội dung không rỗng; SVG trả đúng MIME. Kiểm mọi text SVG nằm trong viewBox và DOI có ngoặc không bị cắt.
- Trang chủ, thư viện, dòng chảy, nền tảng, trang không tồn tại, tìm kiếm tiếng Việt không dấu, bộ lọc, lịch sử back/forward, reload, bài liên quan.
- Reader, active TOC, tiến trình đọc, ảnh lớn, đóng bằng Escape, trở về thư viện với bộ lọc.
- Mây, kéo bằng chuột và cảm ứng mô phỏng, hoa, gió, thả đèn, chuyển động con trỏ, lớp cảnh độc lập, các vật thể, dừng khi ra khỏi khung nhìn, keyboard và reduced motion.
- Kiểm lantern không đưa lời nhắn riêng lên network/storage; dossier/source/fixture không được phục vụ như tài nguyên web.
- Axe tự động trên các trang trong suite, kiểm layout và ảnh ở năm kích thước; không xem đây là chứng nhận toàn diện về accessibility.

Đã xem trực tiếp ảnh render library mobile, reader desktop/mobile, SVG cảm xúc và SVG giấc ngủ. Ảnh C01 tại [mobile](evidence/reader-c01-390.png) và [desktop](evidence/reader-c01-1440.png).

Lượt chạy đầu có 10 test không mở được trang vì thiếu binary FFmpeg dùng để ghi hình. Đã dùng `/usr/bin/ffmpeg` qua đường dẫn cache trong `work/`, rồi chạy lại đầy đủ và đạt. Không tắt ghi hình hay bỏ animation tests. Giữ log lượt đầu trong `evidence/browser.log` để đối chiếu. Một lượt sau gặp phép đo Mây ngay trong lúc chuyển vị trí sau scroll: visibility đổi trước khoảng nghỉ 650 ms và CSS transition 1 giây. Đã sửa test để poll hình học hiện tại đến khi không chồng nội dung (timeout 4 giây), giữ nguyên điều kiện không chồng và không sửa component/CSS. Log trước sửa nằm trong `evidence/browser-before-sync.log`.

## Giới hạn kiểm chứng

- Mobile là Chromium emulation/CDP, không phải điện thoại vật lý. Tap/drag được kiểm. Native synthetic swipe không cuộn ngay cả trên trang HTML đối chứng; test ghi [giới hạn native pan](evidence/native-pan-limit.json), kiểm mouse-wheel riêng và không giả nhận là swipe thiết bị thật.
- Performance đo local, không throttle CPU/network; không phải Lighthouse hoặc bằng chứng tốc độ ở mọi thiết bị.
- Nguồn ngoài: thử mở 71 URL duy nhất; 55 nhận trang, 16 không truy cập được qua công cụ web. Xem [audit](SOURCE-LINK-AUDIT.json), gồm lần thử lại DOI đầy đủ. Giữ thư mục nguồn/hồ sơ nghiên cứu lịch sử; không tuyên bố mọi full text đã được đọc lại hoặc có chuyên gia duyệt bản mới.
- Chưa có toàn văn CONTENT REWRITE V2 trước đó để đối chiếu ngoài tiêu chí trong tin nhắn hiện tại. Đây là bản để chủ dự án nghiệm thu.
- Proxy chặn truy cập production bằng CONNECT 403; không phải kết quả HTTP từ Worker. Không có credentials Cloudflare, chưa biết account ID/version/type/bindings hoặc production commit. Chưa tạo Cloudflare preview/version, chưa kiểm QR bằng camera thật và chưa xác nhận cấu hình cloud. [Hướng dẫn Workers](WORKERS-HANDOFF.md) yêu cầu kiểm những điều này trước upload hoặc production.
- Build có cảnh báo kích thước chunk của Vite; không hạ ngưỡng kiểm tra hoặc đổi cấu trúc chunk trong tác vụ nội dung.

## Artifact

ZIP chỉ chứa các static files trong `dist-academic` và đã được đối chiếu từng byte với thư mục build. Hash và build digest được ghi trong `ARTIFACT.json` và `SHA256SUMS.txt`. `dist` standard không được dùng trong ZIP.
