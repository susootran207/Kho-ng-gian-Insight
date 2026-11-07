# Bàn giao Editorial Quality Revision — PR #38

PR: https://github.com/susootran207/Kho-ng-gian-Insight/pull/38 (draft, chưa merge).
URL QR giữ nguyên: https://wispy-silence-8006.susootran207.workers.dev/
Không merge/deploy; không đổi Worker, subdomain, slug hoặc điều hướng.

- Academic-Showcase-content-v2.zip: 29 bài, 29 SVG, 10 chuyên đề, 68 files từ dist-academic; đã đối chiếu từng byte. SHA-256: `6264509e54af7a4cab5c392f8cbd1d6883c4906b36e7671d1fd0d3e87adc869c`.
- Ho-so-nghiem-thu-content-v2.zip: bản mới của 29 bài, SVG, mẫu trước/sau sáu bài nghiệm thu, yêu cầu đã nhận, rà soát biên tập từng bài, nguồn đã kiểm/giới hạn truy cập và toàn bộ evidence của lượt này.
- SHA256SUMS.txt: checksum cho cả hai ZIP.
- Hướng dẫn Workers/rollback/kiểm QR: docs/content-rewrite-v2/WORKERS-HANDOFF.md trong PR hoặc hồ sơ nghiệm thu. Chưa thực hiện thao tác Cloudflare.

Kiểm tra local: 104 unit tests, 24 browser Academic Showcase, 8 browser R1; typecheck, content validation, build standard/F0, build academic và scanner. Kết quả kỹ thuật không thay nghiệm thu chất lượng nội dung. Rà soát biên tập do trợ lý biên soạn tự thực hiện, chưa là duyệt chuyên gia/học sinh độc lập. Native disclosure được kiểm qua accessible description, Chromium accessibility tree, bàn phím, dialog và CSS không tải; chưa thử NVDA/VoiceOver thật.

Các giới hạn nguồn và áp dụng từng bài được ghi rõ. Không xóa nguồn vì công cụ bị chặn, không bịa số liệu. Toàn văn yêu cầu đã được lưu và đối chiếu trong lượt này. Chưa có quyền Cloudflare để xác minh type/version/bindings, chưa quét QR bằng camera thật. Chỉ cập nhật production sau xác nhận của chủ dự án và kiểm cấu hình thực.
