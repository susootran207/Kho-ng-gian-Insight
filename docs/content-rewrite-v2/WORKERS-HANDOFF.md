# Cập nhật đúng Worker, không đổi QR

Tài liệu chuẩn bị để chủ dự án nghiệm thu. Không lệnh cloud nào dưới đây đã được chạy. Không đổi URL **https://wispy-silence-8006.susootran207.workers.dev/**; không tạo Pages thay thế, không đổi tên/subdomain, không xóa Worker. Không thực hiện production trước xác nhận của chủ dự án.

## 1. Xác nhận hệ thống đang chạy và khả năng phục hồi

Trong Cloudflare Dashboard, chọn đúng account sở hữu subdomain workers.dev `susootran207`, rồi chọn Worker **wispy-silence-8006**. Subdomain không phải account ID: không đoán account ID từ tên này.

Ghi lại account ID, Worker name, URL workers.dev, deployment ID, version ID và tỷ lệ traffic hiện hành; lưu ảnh màn hình và cấu hình hiện tại. Kiểm tra nguồn build, nhánh production, lệnh deploy tự động và bảo đảm nhánh PR không được cấu hình triển khai production. Không đổi thiết lập cloud để chạy kiểm thử local.

Kiểm tra Worker có phải assets-only, module Worker có `main`/API/bindings hay Workers Sites/KV kiểu cũ. Lưu mã Worker, cấu hình, compatibility date/flags, routes, bindings, các tên secret và bản static assets đang hoạt động nếu có thể xuất. Không đưa giá trị secret vào Git hoặc báo cáo. Kiểm tra phiên bản cũ còn rollback được và không xóa tài nguyên liên quan.

**Hiện chưa có quyền Cloudflare nên bước này chưa hoàn tất.** Không lấy cấu hình assets-only mẫu để ghi đè một Worker có code/bindings. Nếu đang dùng Workers Sites/KV, cần một phương án chuyển cấu hình riêng sau khi xem thực tế; dừng trước upload chứ không tự chuyển kiểu Worker.

Có thể dùng Wrangler đã cài và xác thực đúng account để đọc trạng thái, sau khi đã chuẩn bị file cấu hình đã đối chiếu:

```sh
wrangler whoami
wrangler deployments list --config wrangler.academic.jsonc
wrangler versions list --config wrangler.academic.jsonc
```

Lưu version ID ổn định dưới tên `OLD_VERSION_ID` trong ghi chép vận hành. Commit baseline repository là `ad22186aa03053ff6050a8cefa65eacd9885bd68`; chưa chứng minh trùng production. Có bản Git bundle local trong thư mục work để phục hồi mã nguồn phiên làm việc; không xem nó là backup Cloudflare.

## 2. Build và kiểm artifact

Từ `prototype/`, dùng Node cùng phiên bản CI và dependency lockfile:

```sh
npm ci
npm run content:manifest -- --check
npm run test:f0
npm run test:r1
npm run test:c1
npm run test:w1
npm run test:d1
npm run test:g1
npm run test:p2
npm run test:w2
npm run build
npm run build:academic
npm run scan:academic
CHROMIUM_PATH="$(node -e "console.log(require('playwright').chromium.executablePath())")" npm run test:academic:browser
```

`build:academic` gồm typecheck academic, kiểm pins nội dung, unit tests, Vite academic và scanner. `build` standard tạo `dist` để kiểm ranh giới F0; **chỉ lấy `dist-academic/` để cập nhật website đã nộp**. Bộ kiểm trình duyệt cần Chromium và FFmpeg; cài bằng `npx playwright install --with-deps chromium` nếu máy chưa có (ví dụ lệnh trên dùng Bash). Nếu dùng Chromium hệ thống đã có, đặt `CHROMIUM_PATH` tới executable tương ứng. Không bỏ test khi thiếu dependency.

Đối chiếu ZIP với `SHA256SUMS.txt` và giải nén vào một thư mục sạch. ZIP có `index.html` ở gốc; các tệp bên trong phải khớp từng byte với `dist-academic`. Không upload dossier, manifest, log, source map hoặc source code như static assets.

## 3. Cấu hình Static Assets sau khi kiểm loại Worker

Có mẫu tại `prototype/wrangler.academic.example.jsonc`, không phải cấu hình tự động được kích hoạt. Chỉ tạo `prototype/wrangler.academic.jsonc` sau khi đã xác minh bước 1. Thay placeholder account ID bằng ID đã xác nhận; giữ name đúng `wispy-silence-8006` và `workers_dev: true`. Với Worker assets-only đã xác nhận, assets directory là `./dist-academic` tương đối với file cấu hình trong `prototype/`.

Nếu Worker có main script và bindings: giữ nguyên code/cấu hình cần thiết, tích hợp hoặc cập nhật assets directory trong cấu hình đã xuất, giữ binding `ASSETS` nếu code dùng nó. Kiểm `run_worker_first`, API routes và logic fetch để không bỏ qua API hay thay behavior ngoài yêu cầu. Không thêm/xóa migration, KV, D1, Durable Object hoặc secret.

Ứng dụng đang dùng HashRouter: đường dẫn là `/#/bai-viet/<slug>` và `/#/chuyen-de/<slug>`. Trình duyệt chỉ gửi phần trước `#` tới Worker, nên reload bắt đầu từ `/` và **không cần SPA fallback** cho đường dẫn hash. Mẫu để nguyên xử lý tài nguyên không tồn tại, giúp tệp thiếu vẫn trả 404. Nếu cấu hình thực tế có fallback cần cho tính năng khác, giữ theo hệ thống đang chạy và kiểm riêng. Vite `base: './'` cùng URL tài nguyên hiện tại được giữ.

## 4. Version preview để nghiệm thu, chưa chuyển traffic

Chỉ sau khi account, loại Worker, cấu hình và backup đã xác nhận, dùng bản Wrangler hiện hành hỗ trợ Static Assets/version upload. Đối chiếu help với tài liệu chính thức trước khi thực hiện. Các lệnh dưới đây là thao tác thủ công của người vận hành; không nằm trong npm scripts hoặc CI:

```sh
wrangler versions upload --config wrangler.academic.jsonc --preview-alias content-v2
```

Version upload tạo version để xem trước; không dùng `wrangler deploy` cho bước này. Ghi version ID và URL do CLI trả về. URL preview có tiền tố là URL nghiệm thu, không thay URL chính của QR. Không tự tạo Worker mới nếu upload không hỗ trợ cấu hình hiện tại; kiểm lỗi trước.

Kiểm lại deployment/traffic sau upload để xác nhận production vẫn ở version cũ. Mở preview bằng trình duyệt ở desktop/mobile; kiểm đủ 29 bài mới, 29 hình, 10 chuyên đề, tìm kiếm/lọc, các trang chính, TOC, hình lớn, tiến trình đọc, lịch sử/back/reload, Mây, hoa, đèn và reduced motion. Đối chiếu sample C01, C17, E01, E05 với bản mới. Version URL có thể công khai nếu bật; giữ kiểm soát truy cập hiện có.

## 5. Chỉ cập nhật production sau khi chủ dự án xác nhận

Xác nhận của chủ dự án phải chỉ rõ version đã nghiệm thu. Kiểm lần cuối account ID, name, domain, assets directory và version ID. Với version đã upload, chuyển traffic của **chính Worker này** qua Deployments trong Dashboard, hoặc lệnh tương ứng:

```sh
wrangler versions deploy NEW_VERSION_ID@100% --config wrangler.academic.jsonc
```

Không đổi QR, không chuyển domain hoặc Worker. Ghi deployment ID mới, version cũ/mới, thời điểm và người thao tác. Không merge hoặc deploy tự động từ PR.

## 6. Rollback nếu có lỗi

Nếu bài, asset hoặc tương tác bị lỗi sau cập nhật, vào **đúng Worker > Deployments**, chọn version ổn định đã ghi ở bước 1 và Rollback. Có thể dùng:

```sh
wrangler rollback OLD_VERSION_ID --config wrangler.academic.jsonc
```

Xác nhận traffic về version cũ, rồi kiểm URL QR và các trang. Theo Cloudflare, rollback có giới hạn version gần đây và không khôi phục tài nguyên dữ liệu bên ngoài; vì vậy cần giữ bindings và không xóa tài nguyên. Nếu version cũ không còn đủ điều kiện rollback, dùng mã/cấu hình/assets backup đã xác nhận để chuẩn bị phương án phục hồi cùng chủ dự án, không xóa rồi tạo lại Worker.

Khôi phục Git chỉ khôi phục mã nguồn, không tự phục hồi Cloudflare. Không `force push` main hay xóa lịch sử để rollback.

## 7. Kiểm QR sau triển khai

Dùng camera điện thoại quét **mã QR cũ trong bài đã nộp**, kiểm URL mở đúng `https://wispy-silence-8006.susootran207.workers.dev/`, không bị đưa sang preview/Pages/Worker khác. Thử Wi-Fi và dữ liệu di động nếu có.

Mở trang chủ, chạm hoa, kéo Mây, thả đèn; vào thư viện thấy 29 bài, tìm một bài mới, mở hình và mục lục; reload một URL bài và một URL chuyên đề; kiểm 10 chuyên đề. Xem Network trên desktop để tìm CSS/JS/SVG/font/ảnh lỗi. Kiểm đoạn đầu C01 bắt đầu bằng “Cảm xúc giúp chúng ta…” thay cho câu chuyện An. Không có banner hay hồ sơ duyệt cũ trong phần bài.

Ghi ảnh màn hình, URL cuối cùng và thời điểm kiểm tra. Mã QR trỏ đúng URL không tự chứng minh mọi nội dung hoạt động, nên hoàn tất cả kiểm truy cập lẫn kiểm chức năng.

## Tài liệu Cloudflare đã tham khảo ngày 07/11/2026

- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Configuration and bindings](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Versions and deployments](https://developers.cloudflare.com/workers/versions-and-deployments/)
- [Version URLs và versions upload](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/)
- [Rollbacks và giới hạn](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)
