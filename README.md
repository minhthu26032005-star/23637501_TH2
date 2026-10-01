PHAM MINH THU - 23637501 - https://github.com/minhthu26032005-star/23637501_TH2.git - #641299 - Số cuối: 1 - VARIANT: phone | shopFirst | selection | B | card

## Bài thi Thực hành 2 - Lập trình Thiết bị Di động (KTXGo)
- Trường ĐH Công nghiệp TP.HCM (IUH)
- Họ và tên: PHAM MINH THU
- MSSV: 23637501
- Lớp học phần: Lập trình Thiết bị Di động
- Mã định danh Stamp: #641299

---

## 📱 Giới thiệu dự án

**KTXGo** là ứng dụng di động hỗ trợ sinh viên đặt hàng và giao hàng tận phòng trong khuôn viên Ký túc xá (KTX). Dự án được phát triển bằng **React Native (TypeScript)** đáp ứng đầy đủ các tiêu chuẩn kiến trúc và yêu cầu kỹ thuật của đề thi TH2.

---

## 🛠️ Công nghệ & Thư viện sử dụng

- **Core & Framework:** React Native 0.87, React 19, TypeScript
- **Điều hướng (Navigation):** `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- **Quản lý State & Cache:** `zustand` (kết hợp `persist` với `@react-native-async-storage/async-storage`), `@tanstack/react-query`
- **Danh sách tối ưu:** `@shopify/flash-list` (hiển thị 2 cột)
- **Mạng (Network):** `axios` với Interceptor gắn Header định danh `X-Student-Id`
- **Phần cứng & Tiện ích:** `expo-location` (định vị GPS & tính phí ship theo công thức Haversine), `expo-haptics` (rung xúc giác)
- **Module Alias:** `babel-plugin-module-resolver`

---

## 📁 Cấu trúc thư mục (`src/`)

```
src/
├── components/
│   ├── ProductCard.tsx          # Card hiển thị sản phẩm, quy đổi giá VND & kích hoạt Haptic
│   └── Watermark.tsx            # Component Watermark hiển thị định danh đề thi TH2 & số lượng giỏ hàng
├── constants/
│   ├── student.ts               # Khai báo thông tin MSSV, cấu hình Biến thể (VARIANT), công thức Seed
│   └── theme.ts                 # Bảng màu thương hiệu (Primary, Secondary, Surface, Text, ...)
├── hooks/
│   ├── useCampusLocation.ts     # Hook GPS lấy tọa độ và tính phí ship Haversine theo công thức
│   └── useDebouncedValue.ts     # Hook Debounce hỗ trợ tìm kiếm sản phẩm mượt mà
├── navigation/
│   ├── AuthStack.tsx            # Stack điều hướng khi chưa đăng nhập (Login)
│   ├── MainTabs.tsx             # Bottom Tabs (Cửa hàng, Giỏ hàng, Tôi) sắp xếp theo VARIANT
│   ├── ShopStack.tsx            # Stack cửa hàng (Home -> Detail)
│   └── RootNavigator.tsx        # Điều hướng gốc chuyển đổi theo trạng thái Token
├── screens/
│   ├── CartScreen.tsx           # Màn hình Giỏ hàng, hiển thị phòng nhận & tổng phí ship
│   ├── DetailScreen.tsx         # Màn hình Chi tiết sản phẩm (Modal/Card theo VARIANT)
│   ├── HomeScreen.tsx           # Màn hình Cửa hàng (FlashList + TanStack Query + Debounce)
│   ├── LoginScreen.tsx          # Màn hình Đăng nhập (Email/Phone theo VARIANT)
│   └── MeScreen.tsx             # Màn hình Hồ sơ sinh viên, thông số đề thi, GPS & Đăng xuất
├── services/
│   ├── apiClient.ts             # Axios instance gắn Header X-Student-Id
│   └── productApi.ts            # Hàm gọi API lấy danh sách sản phẩm FakeStore
└── stores/
    ├── authStore.ts             # Quản lý Token và phiên đăng nhập
    └── cartStore.ts             # Quản lý giỏ hàng có Persist vào AsyncStorage
```

---

## 🎯 Các biến thể đề thi theo MSSV (`23637501`)

- **Số cuối MSSV:** `1`
- **Mã Stamp:** `#641299`
- **Watermark:** `watermarkAtTop: false` (hiển thị ở thanh đáy)
- **Trường Auth:** `authField: 'phone'` (đăng nhập bằng Số điện thoại)
- **Thứ tự Tab:** `tabOrder: 'shopFirst'` (ShopTab -> CartTab -> MeTab)
- **Phản hồi Haptic:** `hapticOnAdd: 'selection'`
- **Công thức tính Ship:** `shipFormula: 'B'`
- **Trình bày chi tiết:** `detailPresentation: 'card'`

---

## 📸 Ảnh chụp màn hình ứng dụng (`docs/`)

- `docs/screenshot-th2-login.png`: Màn hình Đăng nhập theo số điện thoại (Auth Stack).
- `docs/screenshot-th2-home.png`: Màn hình Home hiển thị lưới 2 cột và Watermark.
- `docs/screenshot-th2-detail.png`: Màn hình Chi tiết món (Card variant + Haptic feedback).
- `docs/screenshot-th2-cart.png`: Màn hình Giỏ hàng hiển thị danh sách món, địa chỉ phòng, cước phí ship và tổng tiền.
- `docs/screenshot-th2-location.png`: Màn hình Tôi / Định vị GPS tính phí ship theo khoảng cách KTX.
- `docs/screenshot-th2-loading.png`: Màn hình Đang tải dữ liệu món (Loading State).
- `docs/screenshot-th2-error.png`: Màn hình Trạng thái lỗi và nút Thử lại (Retry).

---

## 📝 Định danh đề thi
File `App.tsx` được gắn comment định danh bắt buộc:
```typescript
// TH2 | 23637501 | PHAM MINH THU | #641299
```
