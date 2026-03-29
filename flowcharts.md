# Parfume Reseller Dashboard — Flowcharts

## 1. Arsitektur Navigasi (Sitemap)

```mermaid
graph TB
    ROOT["🌐 Parfume Reseller App"]

    ROOT --> CONSUMER["👤 Consumer Layout"]
    ROOT --> ADMIN["🔐 Admin Layout"]

    subgraph consumer_pages ["Consumer Pages"]
        CONSUMER --> HOME["🏠 Home / Katalog<br/><code>/</code>"]
        CONSUMER --> PRODUCTS["📋 Daftar Produk<br/><code>/products</code>"]
        CONSUMER --> UPCOMING["🔔 Upcoming Restock<br/><code>/upcoming</code>"]
        CONSUMER --> CART["🛒 Keranjang<br/><code>/cart</code>"]
        CONSUMER --> ORDERS_C["📦 Riwayat Pesanan<br/><code>/orders</code>"]

        PRODUCTS --> DETAIL["🧴 Detail Produk<br/><code>/products/:id</code>"]
        CART --> CHECKOUT["💳 Checkout<br/><code>/checkout</code>"]
        ORDERS_C --> ORDER_DETAIL_C["📍 Detail Pesanan<br/><code>/orders/:id</code>"]
    end

    subgraph admin_pages ["Admin Pages"]
        ADMIN --> DASH["📊 Dashboard<br/><code>/admin</code>"]
        ADMIN --> PROD_MGMT["📦 Manajemen Produk<br/><code>/admin/products</code>"]
        ADMIN --> ORD_MGMT["📋 Manajemen Pesanan<br/><code>/admin/orders</code>"]
        ADMIN --> EXPENSES["💰 Buku Kas<br/><code>/admin/expenses</code>"]
        ADMIN --> ANALYTICS["📈 Analitik<br/><code>/admin/analytics</code>"]

        PROD_MGMT --> PROD_NEW["➕ Tambah Produk<br/><code>/admin/products/new</code>"]
        PROD_MGMT --> PROD_EDIT["✏️ Edit Produk<br/><code>/admin/products/:id/edit</code>"]
        ORD_MGMT --> ORD_DETAIL_A["📍 Detail Pesanan<br/><code>/admin/orders/:id</code>"]
    end

    style ROOT fill:#C9A84C,color:#0D0D0D,stroke:#C9A84C
    style CONSUMER fill:#1A1A2E,color:#F5F5F5,stroke:#C9A84C
    style ADMIN fill:#1A1A2E,color:#F5F5F5,stroke:#E8567F
```

---

## 2. Alur Pembeli (Consumer Journey)

```mermaid
flowchart TD
    START(["🟢 Pembeli Buka Aplikasi"])
    START --> HOME["🏠 Home / Katalog"]
    HOME --> BROWSE["Melihat Produk<br/>Ready Stock | Restocking | Sold Out"]

    BROWSE --> CLICK_PRODUCT["Klik Produk"]
    CLICK_PRODUCT --> DETAIL["📄 Halaman Detail Produk<br/>Notes, Longevity, Projection, Harga"]

    DETAIL --> CHECK_STATUS{"Status Produk?"}

    CHECK_STATUS -->|"✅ Ready Stock"| ADD_CART["🛒 Add to Cart"]
    CHECK_STATUS -->|"🟡 Restocking Soon"| PREORDER_CHOICE{"Pilihan Pembeli"}
    CHECK_STATUS -->|"🔴 Sold Out"| NOTIFY_ME["🔔 Notify When Available"]

    PREORDER_CHOICE -->|"Ingatkan Saja"| REMINDER["🔔 Set Reminder"]
    PREORDER_CHOICE -->|"Pre-Order DP"| ADD_CART

    ADD_CART --> CART["🛒 Review Keranjang"]
    CART --> CHECKOUT["💳 Checkout"]
    CHECKOUT --> FILL_FORM["Isi Data Pengiriman<br/>& Pilih Kurir"]
    FILL_FORM --> PAYMENT{"Metode Bayar?"}

    PAYMENT -->|"Transfer Manual"| UPLOAD_BUKTI["📤 Upload Bukti Bayar"]
    PAYMENT -->|"Payment Gateway"| PAY_GATEWAY["💳 Bayar via Gateway"]

    UPLOAD_BUKTI --> WAIT_VERIF["⏳ Menunggu Verifikasi Admin"]
    PAY_GATEWAY --> AUTO_VERIF["✅ Otomatis Terverifikasi"]

    WAIT_VERIF --> CONFIRMED["📦 Pesanan Dikonfirmasi"]
    AUTO_VERIF --> CONFIRMED

    CONFIRMED --> TRACKING["📍 Tracking Status"]
    TRACKING --> STATUS_UPDATES["Diproses → Dikirim → Selesai"]
    STATUS_UPDATES --> DONE(["🟢 Pesanan Selesai"])

    NOTIFY_ME --> NOTIFIED["📧 Dapat Notifikasi Saat Restok"]
    NOTIFIED --> ADD_CART
    REMINDER --> NOTIFIED

    style START fill:#4ADE80,color:#0D0D0D
    style DONE fill:#4ADE80,color:#0D0D0D
    style CHECK_STATUS fill:#C9A84C,color:#0D0D0D
    style PAYMENT fill:#C9A84C,color:#0D0D0D
    style PREORDER_CHOICE fill:#C9A84C,color:#0D0D0D
```

---

## 3. Alur Reseller / Admin

```mermaid
flowchart TD
    START_A(["🟢 Admin Login"])
    START_A --> DASHBOARD["📊 Dashboard<br/>Overview Metrics"]

    DASHBOARD --> CHOOSE{"Aksi Admin?"}

    CHOOSE -->|"Restock"| RESTOCK_FLOW
    CHOOSE -->|"Kelola Pesanan"| ORDER_FLOW
    CHOOSE -->|"Catat Pengeluaran"| EXPENSE_FLOW
    CHOOSE -->|"Lihat Analitik"| ANALYTICS_FLOW

    subgraph RESTOCK_FLOW ["📦 Alur Pengadaan Barang"]
        direction TB
        WAR["🏆 Dapat Parfum dari Official Store"]
        WAR --> INPUT_EXPENSE["💰 Input Pengeluaran<br/>Harga beli + Ongkir"]
        INPUT_EXPENSE --> SET_RESTOCKING["🟡 Update Status → Restocking Soon<br/>Set Estimasi Tanggal Tiba"]
        SET_RESTOCKING --> BARANG_TIBA["📦 Barang Tiba"]
        BARANG_TIBA --> SET_READY["✅ Update Status → Ready Stock<br/>Update Stok Quantity"]
    end

    subgraph ORDER_FLOW ["📋 Alur Manajemen Pesanan"]
        direction TB
        NEW_ORDER["📩 Pesanan Masuk"]
        NEW_ORDER --> CEK_BAYAR{"Pembayaran Valid?"}
        CEK_BAYAR -->|"✅ Ya"| VERIF_OK["✅ Verifikasi Pembayaran"]
        CEK_BAYAR -->|"❌ Tidak"| REJECT["❌ Tolak / Minta Ulang"]
        VERIF_OK --> PACKING["📦 Packing Barang"]
        PACKING --> CETAK_LABEL["🏷️ Cetak Label Pengiriman"]
        CETAK_LABEL --> INPUT_RESI["📝 Input Nomor Resi"]
        INPUT_RESI --> KIRIM["🚚 Status → Dikirim"]
        KIRIM --> SELESAI_ORDER["✅ Status → Selesai"]
    end

    subgraph EXPENSE_FLOW ["💰 Alur Buku Kas"]
        direction TB
        PILIH_KAT["Pilih Kategori<br/>Beli Parfum | Ongkir | Packaging | Lainnya"]
        PILIH_KAT --> ISI_DETAIL["Isi Deskripsi & Jumlah"]
        ISI_DETAIL --> SIMPAN["💾 Simpan ke Buku Kas"]
        SIMPAN --> SUMMARY["📊 Lihat Ringkasan Bulanan"]
    end

    subgraph ANALYTICS_FLOW ["📈 Alur Analitik"]
        direction TB
        SELECT_PERIOD["📅 Pilih Periode"]
        SELECT_PERIOD --> VIEW_METRICS["Lihat Metrics<br/>Revenue | Expenses | Net Profit"]
        VIEW_METRICS --> VIEW_CHARTS["Lihat Charts<br/>Tren Bulanan | Per Brand | Breakdown"]
    end

    SELESAI_ORDER --> AUTO_CALC["⚡ Sistem Auto-Hitung<br/>Harga Jual - Modal = Profit"]
    AUTO_CALC --> UPDATE_ANALYTICS["📈 Update Grafik Keuntungan"]

    style START_A fill:#4ADE80,color:#0D0D0D
    style CHOOSE fill:#C9A84C,color:#0D0D0D
    style CEK_BAYAR fill:#C9A84C,color:#0D0D0D
```

---

## 4. Alur Data & State Management

```mermaid
flowchart LR
    subgraph CONTEXT ["React Context Providers"]
        direction TB
        AUTH["🔐 AuthContext<br/>Login state, role"]
        CART_CTX["🛒 CartContext<br/>Items, qty, total"]
        PRODUCT_CTX["📦 ProductContext<br/>Katalog, filter, search"]
        ORDER_CTX["📋 OrderContext<br/>Orders, status updates"]
    end

    subgraph MOCK ["Mock Data (JSON)"]
        direction TB
        PROD_JSON["products.json"]
        ORD_JSON["orders.json"]
        EXP_JSON["expenses.json"]
    end

    MOCK -->|"load"| CONTEXT

    subgraph CONSUMER_UI ["Consumer UI"]
        C_HOME["Home"]
        C_DETAIL["Product Detail"]
        C_CART["Cart"]
        C_CHECKOUT["Checkout"]
        C_ORDERS["Orders"]
    end

    subgraph ADMIN_UI ["Admin UI"]
        A_DASH["Dashboard"]
        A_PROD["Products CRUD"]
        A_ORD["Order Mgmt"]
        A_EXP["Expenses"]
        A_ANALYTICS["Analytics"]
    end

    CONTEXT -->|"provide"| CONSUMER_UI
    CONTEXT -->|"provide"| ADMIN_UI

    style CONTEXT fill:#1A1A2E,color:#F5F5F5,stroke:#C9A84C
    style MOCK fill:#2A2A3E,color:#F5F5F5,stroke:#E8567F
```
