# Viết lại nội dung Academic Showcase, giữ QR đã nộp

URL chính thức: **https://wispy-silence-8006.susootran207.workers.dev/**.
Worker giữ tên `wispy-silence-8006`; giữ workers.dev subdomain `susootran207`. Không có lệnh deploy, merge, đổi domain hoặc xóa Worker trong tác vụ.

## Phạm vi và nguồn chuẩn

29 bản đọc mới nằm trong `articles/`: C01–C24 và E01–E05. Academic Showcase biên dịch trực tiếp các tệp này, không lọc nội dung nháp lúc chạy trình duyệt. `prototype/editorial/academic-rewrite.json` ghim source hash, revision hash, SVG hash, metadata, nguồn và slug cho từng bài. `prototype/scripts/generate-academic-rewrite.mts --check` kiểm tra pins, không tự sửa pins trong CI.

Commit nền: `ad22186aa03053ff6050a8cefa65eacd9885bd68`, cũng là HEAD remote tại lúc kiểm tra. Đây là commit mã nguồn, **chưa xác nhận là commit được triển khai trên Cloudflare**. Nhánh sửa: `content-rewrite-v2-preserve-qr`.

Không sửa `source-manifest.json`, catalogue F0, weekly registry, các hồ sơ duyệt lịch sử, 29 bài nháp lịch sử hay HTML gốc. Kiểm tra 107 hồ sơ được bảo vệ vẫn chạy. Các hồ sơ đó chỉ chứng minh baseline lịch sử; không được dùng làm chứng nhận duyệt bản viết lại. Bản mới giữ trạng thái draft nội bộ, `publication: null`, `publishedAt: null`, không tạo chuyên gia/người học giả.

## Biên tập

Mỗi bài mở thẳng vào kiến thức, sau đó giải thích cơ chế, giới hạn bằng chứng, cách dùng trong đời sống học đường và khi nào/nhờ ai hỗ trợ. Không ép tiêu đề 5W1H vào bài nhưng trả lời các câu hỏi cần thiết theo chủ đề. Bỏ nhân vật và tình huống dài, bài tập tự chấm lặp lại, ghi chú bản nháp, liên kết dossier và mã revision khỏi phần đọc. Giữ khái niệm chuyên môn, phân biệt liên hệ với nhân quả, mô hình với công cụ, sàng lọc với chẩn đoán.

29 SVG được giữ theo bộ minh họa hiện có, sao chép sang `assets/`; chỉnh những chữ còn phụ thuộc câu chuyện cũ, metadata nháp và mô tả tiếp cận. Không thay artwork sân vườn, CSS, component tương tác hoặc cấu trúc router. Caption vẫn giữ ghi nguồn khái niệm; thông tin sản xuất bằng AI được ghi tại đây thay vì lặp lại trong bài: các bản viết lại và chỉnh chữ SVG được trợ lý AI biên soạn, chưa có rà soát chuyên môn độc lập cho phiên bản mới.

Tài liệu tham khảo giữ theo hồ sơ đã cung cấp. Sửa một lỗi kỹ thuật của manifest cũ: DOI Monsell bị regex cắt ở dấu ngoặc; bản academic dùng đủ `https://doi.org/10.1016/S1364-6613(03)00028-7`. Không thay DOI hay tài liệu thực trong bài gốc. E05 nêu rõ phân tích 2024 tìm thấy lợi ích trung bình nhỏ nhưng chưa đủ ủng hộ áp dụng rộng rãi, tránh diễn đạt thành không có bất kỳ hiệu ứng nào.

10 chuyên đề, tiêu đề, mô tả, liên kết liên quan và thứ tự hiện có được giữ. Metadata chủ đề, mùa, nhóm bài và bài liên quan khớp baseline. Mục tiêu Bloom lịch sử là thông tin nội bộ của baseline, không được trình bày như bài kiểm tra mới đã được nghiệm thu.

## Kiểm tra và giới hạn

Xem `VALIDATION.md`, `SOURCE-LINK-AUDIT.json` và `BEFORE-AFTER.md`. Liên kết nguồn được thử mở qua công cụ web: 55/71 trả về trang, 16/71 không truy cập được bằng công cụ. Những lỗi đó không tự chứng minh tài liệu sai hoặc URL hỏng. DOI Monsell đầy đủ được thử lại riêng và nhận 403; không công bố tất cả nguồn đạt kiểm tra truy cập trực tiếp.

Phiên làm việc chỉ nhận được yêu cầu bổ sung trong tin nhắn ngày 07/11/2026; không có toàn văn CONTENT REWRITE V2 trước đó trong lịch sử được cung cấp. Đã hỏi lại và thực hiện theo các tiêu chí cụ thể trong yêu cầu hiện tại. Cần đối chiếu thêm nếu bản V2 trước có tiêu chí khác; không ghi nhận là đã nghiệm thu một tài liệu chưa được cung cấp.

Không có credentials Cloudflare. Request đến production bị proxy môi trường từ chối CONNECT 403; công cụ web cũng không mở được URL đó. Không suy ra website đang ngừng hoạt động. Loại Worker, binding, account ID và deployment/version hiện hành chưa xác minh. Xem `WORKERS-HANDOFF.md` trước bất kỳ thao tác cloud nào.
