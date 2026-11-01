# SalesFlow — Executive Sales Analytics Dashboard

A single-page, real-time Sales Analytics Dashboard built with **100% Vanilla HTML, CSS, and JavaScript**.

- **No backend** — all data is persistently stored in browser `localStorage`.
- **Zero external chart libraries** — visualizations are rendered natively using high-DPI HTML5 `<canvas>`.
- **No Tailwind CSS** and **ZERO CSS Variables** — all styling uses direct, standard CSS rules.
- **No landing page / No auth** — boots straight into the executive dashboard.

---

## Key Features

1. **Executive KPI Metric Cards**:
   - **Total Revenue**: Filtered sum of all completed transactions with growth trend.
   - **Net Profit & Margin**: Real-time margin calculation `((Revenue - Cost) / Revenue) * 100%`.
   - **Total Transactions**: Total completed order count.
   - **Average Order Value (AOV)**: Revenue per completed transaction.

2. **Native HTML5 Canvas Charts**:
   - **Revenue & Profit Trajectory (Line & Area Chart)**:
     - Area-filled curve for Revenue (Sky Blue) and Net Profit (Emerald Green).
     - Interactive cursor hover detection with tooltips showing exact monthly figures.
     - Responsive Retina display scaling (`window.devicePixelRatio`).
   - **Revenue by Category (Donut Chart)**:
     - Donut breakdown across *Software / SaaS*, *Hardware*, *Cloud Services*, *Consulting*, and *Subscriptions*.
     - Embedded total summary and percentage legend.

3. **Performance Distributions**:
   - **Sales by Channel**: Online Store, Direct Sales, Partner Network, and Wholesale.
   - **Regional Performance**: North America, Europe, Asia-Pacific, and Latin America.
   - **Payment Gateways**: Wire Transfer, Credit Card, Stripe, and PayPal.

4. **Interactive Transaction Ledger**:
   - **Search**: Instant multi-field filtering by Customer Name, Product, or Transaction ID.
   - **Filters**: Category and Status dropdowns.
   - **Sortable Columns**: Click table headers (ID, Customer, Product, Date, Amount) to toggle ascending/descending order.
   - **Pagination**: Smooth page navigation with record counts.
   - **Row Actions**: Full Create, Read, Update, and Delete (CRUD) support.

5. **Data Management & Currency Support**:
   - Multi-currency toggle: USD (`$`), EUR (`€`), and GBP (`£`).
   - Filter by date range: *All Recorded Time*, *Current Year (2026)*, *Q4*, *Q3*, *Last 30 Days*, *Last 7 Days*.
   - **Export to CSV**: Formatted transaction table download.
   - **Backup & Restore**: Export/import complete JSON snapshots.
   - **Demo Data Reset**: Replenish 35 realistic enterprise transactions across all quarters anytime.

---

## How to Run

Simply open `index.html` in your web browser:

```bash
open "/Users/admin/Desktop/All folders/Dev and Design/index.html"
```
