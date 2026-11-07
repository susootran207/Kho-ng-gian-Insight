# Bàn giao bản viết lại Academic Showcase

PR: https://github.com/susootran207/Kho-ng-gian-Insight/pull/38 (draft, chưa merge).
Commit thay đổi: `1e4a0abb243a2df69aa548ccc1868aaf3a2a04c8`.

URL QR giữ nguyên: **https://wispy-silence-8006.susootran207.workers.dev/**.
Không merge/deploy, không đổi/xóa Worker `wispy-silence-8006` hoặc subdomain `susootran207`.

- `Academic-Showcase-content-v2.zip`: bản static build Academic Showcase, đủ 29 bài viết mới, 29 SVG, 10 chuyên đề; 68 files. `index.html` ở gốc ZIP. Không lấy thư mục `dist` standard thay cho bản này.
- `SHA256SUMS.txt`: SHA-256 của ZIP để đối chiếu trước giải nén/upload.
- `Ho-so-nghiem-thu-content-v2.zip`: 29 bài Markdown, SVG, manifest/hash, mẫu trước/sau C01/C17/E01/E05, baseline, ma trận đường dẫn, báo cáo và logs kiểm thử, hướng dẫn Workers/rollback/QR. Hồ sơ này để nghiệm thu nội bộ, không upload toàn bộ lên static assets.
- `HUONG-DAN-WORKERS.md`: hướng dẫn đầy đủ để kiểm cấu hình thực, tạo version preview, chuyển traffic sau xác nhận, rollback và kiểm QR. Chưa thực hiện những thao tác cloud này.

Kết quả local: 104 unit tests và 23 browser tests đạt; typecheck standard/academic, content validation, build standard/F0, Academic Showcase và scanner đạt. Các đường dẫn bài/chuyên đề được mở và reload ở 5 kích thước. ZIP được đối chiếu từng byte với `dist-academic`.

Commit baseline: `ad22186aa03053ff6050a8cefa65eacd9885bd68`. Bản nháp/hồ sơ duyệt lịch sử và F0 giữ nguyên. Bản viết lại có nguồn chuẩn riêng chỉ cho Academic Showcase; không tự tạo chứng nhận chuyên môn.

Cần phân biệt với phần đã kiểm: chưa có toàn văn CONTENT REWRITE V2 cũ ngoài yêu cầu bổ sung trong phiên; chưa có quyền Cloudflare để xác minh loại Worker/account ID/version/bindings hoặc tạo cloud preview. 16/71 URL nguồn không mở được qua công cụ web, đã ghi audit; mobile dùng emulation/CDP, chưa thử QR/cảm ứng trên điện thoại vật lý. Không tuyên bố đã kiểm production hoặc được chuyên gia duyệt.

Bước nghiệm thu tiếp theo: xem PR và mẫu trước/sau, đối chiếu bản V2 gốc nếu có; xác minh cấu hình/backup Cloudflare, rồi mới tạo version preview. Chỉ cập nhật production sau khi chủ dự án xác nhận version cụ thể. QR vẫn dùng URL cũ.
