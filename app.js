/**
 * SalesFlow — Executive Sales Analytics Dashboard
 * 100% Vanilla JavaScript, HTML5 Canvas, and Web Storage (localStorage)
 * No backend, no external charting libraries, ZERO CSS variables.
 */

(function () {
  'use strict';

  // --- Constants & Storage Keys ---
  const STORAGE_KEY = 'salesflow_analytics_data_v1';

  // 35 Realistic Enterprise Demo Transactions
  const DEMO_TRANSACTIONS = [
    { id: 'TRX-1001', customer: 'Acme Corporation', product: 'Enterprise Cloud License', category: 'Software / SaaS', amount: 14500.00, cost: 2200.00, date: '2026-10-28', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Wire Transfer' },
    { id: 'TRX-1002', customer: 'Global Logistics AG', product: 'Cloud Fleet Analytics', category: 'Cloud Services', amount: 8200.00, cost: 1400.00, date: '2026-10-24', status: 'Completed', channel: 'Partner Network', region: 'Europe', payment: 'Wire Transfer' },
    { id: 'TRX-1003', customer: 'FinTech Dynamics', product: 'Security Compliance Suite', category: 'Software / SaaS', amount: 12000.00, cost: 1800.00, date: '2026-10-20', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Stripe' },
    { id: 'TRX-1004', customer: 'Vertex Media Labs', product: 'Annual Team Subscription', category: 'Subscriptions', amount: 3600.00, cost: 450.00, date: '2026-10-17', status: 'Completed', channel: 'Online Store', region: 'Europe', payment: 'Credit Card' },
    { id: 'TRX-1005', customer: 'Pacific Health Systems', product: 'Edge Server Cluster Nodes', category: 'Hardware', amount: 22400.00, cost: 14200.00, date: '2026-10-12', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Wire Transfer' },
    { id: 'TRX-1006', customer: 'Elena Rostova', product: 'Developer Pro License', category: 'Software / SaaS', amount: 499.00, cost: 45.00, date: '2026-10-08', status: 'Completed', channel: 'Online Store', region: 'Europe', payment: 'Credit Card' },
    { id: 'TRX-1007', customer: 'NeoTokyo Robotics', product: 'AI Pipeline Architecture', category: 'Consulting', amount: 18500.00, cost: 4200.00, date: '2026-09-29', status: 'Completed', channel: 'Partner Network', region: 'Asia-Pacific', payment: 'Wire Transfer' },
    { id: 'TRX-1008', customer: 'Cascade Retail Group', product: 'Multi-Store POS Integration', category: 'Cloud Services', amount: 9400.00, cost: 1600.00, date: '2026-09-22', status: 'Completed', channel: 'Wholesale', region: 'North America', payment: 'Stripe' },
    { id: 'TRX-1009', customer: 'BioGenix Labs', product: 'High-Throughput Node Rack', category: 'Hardware', amount: 31000.00, cost: 21500.00, date: '2026-09-15', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Wire Transfer' },
    { id: 'TRX-1010', customer: 'Marcus Sterling', product: 'Data Strategy Workshop', category: 'Consulting', amount: 6500.00, cost: 950.00, date: '2026-09-10', status: 'Completed', channel: 'Direct Sales', region: 'Europe', payment: 'Stripe' },
    { id: 'TRX-1011', customer: 'AeroSpace Global', product: 'Mission Critical Monitoring', category: 'Software / SaaS', amount: 27500.00, cost: 4100.00, date: '2026-09-04', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Wire Transfer' },
    { id: 'TRX-1012', customer: 'Santiago Morales', product: 'Starter Cloud Package', category: 'Subscriptions', amount: 1200.00, cost: 180.00, date: '2026-08-27', status: 'Completed', channel: 'Online Store', region: 'Latin America', payment: 'Credit Card' },
    { id: 'TRX-1013', customer: 'Nordic Clean Energy', product: 'IoT Sensor Gateway', category: 'Hardware', amount: 16800.00, cost: 10800.00, date: '2026-08-21', status: 'Completed', channel: 'Partner Network', region: 'Europe', payment: 'Wire Transfer' },
    { id: 'TRX-1014', customer: 'Zenith Payments Inc', product: 'PCI DSS Audit & Consulting', category: 'Consulting', amount: 14000.00, cost: 2900.00, date: '2026-08-16', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Wire Transfer' },
    { id: 'TRX-1015', customer: 'Hyperion Gaming Studio', product: 'GPU Rendering Cluster', category: 'Cloud Services', amount: 19800.00, cost: 5800.00, date: '2026-08-09', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Stripe' },
    { id: 'TRX-1016', customer: 'CloudNine Marketing', product: 'SaaS Marketing Automation', category: 'Software / SaaS', amount: 5600.00, cost: 700.00, date: '2026-07-29', status: 'Completed', channel: 'Online Store', region: 'Europe', payment: 'Credit Card' },
    { id: 'TRX-1017', customer: 'Singapore Maritime Co', product: 'Port Logistics Dispatcher', category: 'Software / SaaS', amount: 24000.00, cost: 3600.00, date: '2026-07-22', status: 'Completed', channel: 'Partner Network', region: 'Asia-Pacific', payment: 'Wire Transfer' },
    { id: 'TRX-1018', customer: 'TerraFirma Construction', product: 'Survey Drone Telemetry', category: 'Hardware', amount: 11200.00, cost: 7200.00, date: '2026-07-14', status: 'Completed', channel: 'Wholesale', region: 'North America', payment: 'Credit Card' },
    { id: 'TRX-1019', customer: 'David Kim', product: 'Business Intelligence Pro', category: 'Subscriptions', amount: 2400.00, cost: 300.00, date: '2026-07-08', status: 'Completed', channel: 'Online Store', region: 'Asia-Pacific', payment: 'PayPal' },
    { id: 'TRX-1020', customer: 'Allied Insurance Group', product: 'Legacy Migration Sprint', category: 'Consulting', amount: 21000.00, cost: 4800.00, date: '2026-06-25', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Wire Transfer' },
    { id: 'TRX-1021', customer: 'Quantum Security Labs', product: 'Zero Trust Gateway', category: 'Software / SaaS', amount: 16500.00, cost: 2400.00, date: '2026-06-18', status: 'Completed', channel: 'Direct Sales', region: 'Europe', payment: 'Wire Transfer' },
    { id: 'TRX-1022', customer: 'Sao Paulo Finanças', product: 'Core Banking Cloud Bridge', category: 'Cloud Services', amount: 17800.00, cost: 3100.00, date: '2026-06-07', status: 'Completed', channel: 'Partner Network', region: 'Latin America', payment: 'Wire Transfer' },
    { id: 'TRX-1023', customer: 'Apex Manufacturing', product: 'Robotic Cell Controller', category: 'Hardware', amount: 28500.00, cost: 18200.00, date: '2026-05-24', status: 'Completed', channel: 'Wholesale', region: 'North America', payment: 'Wire Transfer' },
    { id: 'TRX-1024', customer: 'Horizon Telematics', product: 'Fleet Tracking SaaS', category: 'Software / SaaS', amount: 9800.00, cost: 1300.00, date: '2026-05-15', status: 'Completed', channel: 'Online Store', region: 'Europe', payment: 'Stripe' },
    { id: 'TRX-1025', customer: 'Beacon Health Inc', product: 'EMR Integration Consulting', category: 'Consulting', amount: 15400.00, cost: 3200.00, date: '2026-05-02', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Wire Transfer' },
    { id: 'TRX-1026', customer: 'Sydney Clean Water', product: 'Telemetry Sensor Array', category: 'Hardware', amount: 13900.00, cost: 8900.00, date: '2026-04-20', status: 'Completed', channel: 'Partner Network', region: 'Asia-Pacific', payment: 'Wire Transfer' },
    { id: 'TRX-1027', customer: 'Sophia Dubois', product: 'Creator Suite Membership', category: 'Subscriptions', amount: 840.00, cost: 90.00, date: '2026-04-12', status: 'Completed', channel: 'Online Store', region: 'Europe', payment: 'Credit Card' },
    { id: 'TRX-1028', customer: 'Atlas Distribution', product: 'Warehouse WMS Upgrade', category: 'Software / SaaS', amount: 18200.00, cost: 2600.00, date: '2026-04-03', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Wire Transfer' },
    { id: 'TRX-1029', customer: 'Vanguard Analytics', product: 'Snowflake Pipeline Setup', category: 'Consulting', amount: 12500.00, cost: 2200.00, date: '2026-03-27', status: 'Completed', channel: 'Direct Sales', region: 'North America', payment: 'Stripe' },
    { id: 'TRX-1030', customer: 'Kobe Heavy Industries', product: 'Edge Server Enclosure', category: 'Hardware', amount: 34000.00, cost: 22800.00, date: '2026-03-14', status: 'Completed', channel: 'Wholesale', region: 'Asia-Pacific', payment: 'Wire Transfer' },
    { id: 'TRX-1031', customer: 'Berlin Tech Incubator', product: 'Multi-Tenant Cloud Pod', category: 'Cloud Services', amount: 7800.00, cost: 1250.00, date: '2026-02-22', status: 'Completed', channel: 'Online Store', region: 'Europe', payment: 'Credit Card' },
    { id: 'TRX-1032', customer: 'Rio Power Grid', product: 'Substation SCADA Relay', category: 'Hardware', amount: 19500.00, cost: 12400.00, date: '2026-02-11', status: 'Completed', channel: 'Direct Sales', region: 'Latin America', payment: 'Wire Transfer' },
    { id: 'TRX-1033', customer: 'PixelCraft Interactive', product: 'Enterprise Media Engine', category: 'Software / SaaS', amount: 8900.00, cost: 1100.00, date: '2026-01-29', status: 'Completed', channel: 'Online Store', region: 'North America', payment: 'PayPal' },
    { id: 'TRX-1034', customer: 'Dr. Arthur Pendelton', product: 'Academic Research Pass', category: 'Subscriptions', amount: 1800.00, cost: 150.00, date: '2026-01-16', status: 'Completed', channel: 'Online Store', region: 'Europe', payment: 'Credit Card' },
    { id: 'TRX-1035', customer: 'Solaris Agritech', product: 'Soil Sensor Node Pilot', category: 'Hardware', amount: 4800.00, cost: 3200.00, date: '2026-10-30', status: 'Pending', channel: 'Online Store', region: 'North America', payment: 'Credit Card' }
  ];

  // Currency Symbols & Conversion Rates (normalized to USD base)
  const CURRENCIES = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 }
  };

  // Category Color Palette
  const CATEGORY_COLORS = {
    'Software / SaaS': '#38bdf8',
    'Hardware': '#f59e0b',
    'Cloud Services': '#a855f7',
    'Consulting': '#10b981',
    'Subscriptions': '#ec4899'
  };

  // --- Runtime Application State ---
  let appData = {
    currency: 'USD',
    transactions: []
  };

  let activeFilters = {
    timeRange: 'year',
    search: '',
    category: 'all',
    status: 'all'
  };

  let tableSort = {
    field: 'date',
    direction: 'desc'
  };

  let currentPage = 1;
  const ITEMS_PER_PAGE = 8;

  // --- Storage Functions ---
  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.transactions) && parsed.transactions.length > 0) {
          appData = parsed;
        } else {
          initDemoData();
        }
      } else {
        initDemoData();
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
      initDemoData();
    }
  }

  function initDemoData() {
    appData = {
      currency: 'USD',
      transactions: JSON.parse(JSON.stringify(DEMO_TRANSACTIONS))
    };
    saveData();
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      showToast('Storage quota exceeded or error saving data', 'danger');
    }
  }

  // --- Currency Formatting ---
  function formatCurrency(amount) {
    const cur = CURRENCIES[appData.currency] || CURRENCIES.USD;
    const converted = (amount || 0) * cur.rate;
    return `${cur.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function formatCompactCurrency(amount) {
    const cur = CURRENCIES[appData.currency] || CURRENCIES.USD;
    const converted = (amount || 0) * cur.rate;
    if (converted >= 1000000) {
      return `${cur.symbol}${(converted / 1000000).toFixed(1)}M`;
    }
    if (converted >= 1000) {
      return `${cur.symbol}${(converted / 1000).toFixed(1)}k`;
    }
    return `${cur.symbol}${converted.toFixed(0)}`;
  }

  // --- Date Filtering Helper ---
  function isDateInFilter(dateString, filterType) {
    if (!dateString) return false;
    if (filterType === 'all') return true;

    const txDate = new Date(dateString + 'T00:00:00');
    const now = new Date('2026-11-01T23:59:59'); // Baseline benchmark timestamp
    const txYear = txDate.getFullYear();
    const txMonth = txDate.getMonth(); // 0-indexed

    if (filterType === 'year') {
      return txYear === 2026;
    }
    if (filterType === 'q4') {
      return txYear === 2026 && txMonth >= 9 && txMonth <= 11;
    }
    if (filterType === 'q3') {
      return txYear === 2026 && txMonth >= 6 && txMonth <= 8;
    }
    if (filterType === 'last30') {
      const diffDays = (now - txDate) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 30;
    }
    if (filterType === 'last7') {
      const diffDays = (now - txDate) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    }
    return true;
  }

  function getFilteredTransactions() {
    return appData.transactions.filter(item => {
      // Time range check
      if (!isDateInFilter(item.date, activeFilters.timeRange)) {
        return false;
      }
      // Search check
      if (activeFilters.search) {
        const q = activeFilters.search.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesCustomer = item.customer.toLowerCase().includes(q);
        const matchesProduct = item.product.toLowerCase().includes(q);
        if (!matchesId && !matchesCustomer && !matchesProduct) {
          return false;
        }
      }
      // Category check
      if (activeFilters.category !== 'all' && item.category !== activeFilters.category) {
        return false;
      }
      // Status check
      if (activeFilters.status !== 'all' && item.status !== activeFilters.status) {
        return false;
      }
      return true;
    });
  }

  // --- Toast Notification System ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'danger') {
      iconSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else {
      iconSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#38bdf8" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      toast.addEventListener('animationend', () => toast.remove());
    }, 2800);
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return String(str);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- Rendering Functions ---

  function renderDashboard() {
    const filtered = getFilteredTransactions();

    renderKPIs(filtered);
    renderLineChart(filtered);
    renderDonutChart(filtered);
    renderPerformancePanels(filtered);
    renderTable(filtered);
  }

  // 1. KPI Cards
  function renderKPIs(records) {
    const completedRecords = records.filter(r => r.status === 'Completed');
    
    let totalRevenue = 0;
    let totalCost = 0;

    completedRecords.forEach(r => {
      totalRevenue += Number(r.amount) || 0;
      totalCost += Number(r.cost) || 0;
    });

    const netProfit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const orderCount = completedRecords.length;
    const aov = orderCount > 0 ? totalRevenue / orderCount : 0;

    // Update Elements
    const elRevenue = document.getElementById('kpi-revenue');
    const elProfit = document.getElementById('kpi-profit');
    const elMargin = document.getElementById('kpi-margin-text');
    const elTx = document.getElementById('kpi-transactions');
    const elAov = document.getElementById('kpi-aov');

    if (elRevenue) elRevenue.textContent = formatCurrency(totalRevenue);
    if (elProfit) elProfit.textContent = formatCurrency(netProfit);
    if (elMargin) {
      elMargin.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
        <span>${margin.toFixed(1)}% Gross Margin</span>
      `;
    }
    if (elTx) elTx.textContent = orderCount.toLocaleString();
    if (elAov) elAov.textContent = formatCurrency(aov);
  }

  // 2. High-DPI Line & Area Chart (Revenue & Profit over Time)
  let lineChartPoints = [];

  function renderLineChart(records) {
    const canvas = document.getElementById('revenue-line-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width || canvas.parentElement.clientWidth || 700;
    const displayHeight = 280;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);

    // Group Completed transactions by Month of 2026
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyRev = new Array(12).fill(0);
    const monthlyProf = new Array(12).fill(0);

    records.forEach(r => {
      if (r.status === 'Completed' && r.date) {
        const d = new Date(r.date + 'T00:00:00');
        if (d.getFullYear() === 2026) {
          const m = d.getMonth();
          monthlyRev[m] += Number(r.amount) || 0;
          monthlyProf[m] += (Number(r.amount) || 0) - (Number(r.cost) || 0);
        }
      }
    });

    const maxVal = Math.max(10000, ...monthlyRev) * 1.15;
    const padding = { top: 30, right: 24, bottom: 36, left: 58 };
    const chartW = displayWidth - padding.left - padding.right;
    const chartH = displayHeight - padding.top - padding.bottom;

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Draw horizontal grid lines & labels
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'right';

    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const stepVal = (maxVal / gridSteps) * i;
      const y = padding.top + chartH - (i / gridSteps) * chartH;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
      ctx.stroke();

      ctx.fillText(formatCompactCurrency(stepVal), padding.left - 10, y + 4);
    }

    // Determine slice of months to show based on filter
    let startIdx = 0;
    let endIdx = 11;
    if (activeFilters.timeRange === 'q4') { startIdx = 9; endIdx = 11; }
    else if (activeFilters.timeRange === 'q3') { startIdx = 6; endIdx = 8; }

    const activeMonths = months.slice(startIdx, endIdx + 1);
    const stepX = chartW / Math.max(1, activeMonths.length - 1);

    lineChartPoints = [];

    const revPoints = [];
    const profPoints = [];

    activeMonths.forEach((mName, i) => {
      const originalIdx = startIdx + i;
      const x = padding.left + i * stepX;
      const revY = padding.top + chartH - (monthlyRev[originalIdx] / maxVal) * chartH;
      const profY = padding.top + chartH - (monthlyProf[originalIdx] / maxVal) * chartH;

      revPoints.push({ x, y: revY, val: monthlyRev[originalIdx], month: mName });
      profPoints.push({ x, y: profY, val: monthlyProf[originalIdx], month: mName });

      lineChartPoints.push({
        x,
        y: revY,
        month: mName,
        rev: monthlyRev[originalIdx],
        prof: monthlyProf[originalIdx]
      });

      // X-axis label
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(mName, x, displayHeight - 12);
    });

    // Draw Area under Revenue line
    if (revPoints.length > 0) {
      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
      gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(revPoints[0].x, padding.top + chartH);
      revPoints.forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.lineTo(revPoints[revPoints.length - 1].x, padding.top + chartH);
      ctx.closePath();
      ctx.fill();
    }

    // Draw Revenue Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    revPoints.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    // Draw Profit Curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    profPoints.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    // Draw Data Point Dots
    revPoints.forEach(pt => {
      ctx.fillStyle = '#131b2e';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    profPoints.forEach(pt => {
      ctx.fillStyle = '#131b2e';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
  }

  // 3. Category Donut Chart
  function renderDonutChart(records) {
    const canvas = document.getElementById('category-donut-canvas');
    const legendContainer = document.getElementById('category-legend-list');
    if (!canvas || !legendContainer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 220 * dpr;
    canvas.height = 220 * dpr;
    ctx.scale(dpr, dpr);

    // Sum revenue per category
    const categoryTotals = {};
    Object.keys(CATEGORY_COLORS).forEach(c => categoryTotals[c] = 0);

    let totalCatRevenue = 0;
    records.forEach(r => {
      if (r.status === 'Completed') {
        const amt = Number(r.amount) || 0;
        const cat = r.category || 'Software / SaaS';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
        totalCatRevenue += amt;
      }
    });

    const centerX = 110;
    const centerY = 110;
    const outerRadius = 88;
    const innerRadius = 58;

    ctx.clearRect(0, 0, 220, 220);

    if (totalCatRevenue === 0) {
      // Empty placeholder ring
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 26;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.stroke();
      legendContainer.innerHTML = '<div style="color: #64748b; font-size: 0.8rem; text-align: center;">No completed sales in period</div>';
      return;
    }

    let startAngle = -Math.PI / 2;
    const legendRows = [];

    Object.entries(categoryTotals).forEach(([cat, amount]) => {
      if (amount <= 0) return;
      const sliceAngle = (amount / totalCatRevenue) * (Math.PI * 2);
      const endAngle = startAngle + sliceAngle;
      const color = CATEGORY_COLORS[cat] || '#38bdf8';

      // Draw donut arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Thin separator line
      ctx.strokeStyle = '#131b2e';
      ctx.lineWidth = 2;
      ctx.stroke();

      startAngle = endAngle;

      const pct = Math.round((amount / totalCatRevenue) * 100);
      legendRows.push(`
        <div class="category-legend-row">
          <div class="category-legend-label">
            <span class="category-legend-dot" style="background-color: ${color};"></span>
            <span>${escapeHtml(cat)}</span>
          </div>
          <div>
            <span class="category-legend-val">${formatCurrency(amount)}</span>
            <span class="category-legend-pct">(${pct}%)</span>
          </div>
        </div>
      `);
    });

    // Donut Center Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatCompactCurrency(totalCatRevenue), centerX, centerY - 6);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Total Sales', centerX, centerY + 12);

    legendContainer.innerHTML = legendRows.join('');
  }

  // 4. Performance Bars (Channels, Regions, Gateways)
  function renderPerformancePanels(records) {
    const channelCounts = {};
    const regionCounts = {};
    const paymentCounts = {};

    let totalRevenue = 0;

    records.forEach(r => {
      if (r.status === 'Completed') {
        const amt = Number(r.amount) || 0;
        totalRevenue += amt;

        channelCounts[r.channel] = (channelCounts[r.channel] || 0) + amt;
        regionCounts[r.region] = (regionCounts[r.region] || 0) + amt;
        paymentCounts[r.payment] = (paymentCounts[r.payment] || 0) + amt;
      }
    });

    renderBarGroup('channels-progress-list', channelCounts, totalRevenue, 'fill-blue');
    renderBarGroup('regions-progress-list', regionCounts, totalRevenue, 'fill-purple');
    renderBarGroup('payments-progress-list', paymentCounts, totalRevenue, 'fill-green');
  }

  function renderBarGroup(containerId, dataMap, total, fillClass) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sortedEntries = Object.entries(dataMap).sort((a, b) => b[1] - a[1]);
    if (sortedEntries.length === 0 || total === 0) {
      container.innerHTML = '<div style="color: #64748b; font-size: 0.8rem; padding: 8px 0;">No sales data available</div>';
      return;
    }

    container.innerHTML = sortedEntries.map(([name, amount]) => {
      const pct = Math.min(100, Math.round((amount / total) * 100));
      return `
        <div class="progress-item">
          <div class="progress-header">
            <span class="progress-name">${escapeHtml(name)}</span>
            <span class="progress-amount">${formatCurrency(amount)} (${pct}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill ${fillClass}" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 5. Data Table & Pagination
  function renderTable(records) {
    const tbody = document.getElementById('transactions-table-body');
    const paginationInfo = document.getElementById('pagination-info');
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    const pageNumIndicator = document.getElementById('current-page-num');

    if (!tbody) return;

    // Sorting
    const sorted = [...records].sort((a, b) => {
      let valA = a[tableSort.field];
      let valB = b[tableSort.field];

      if (tableSort.field === 'amount' || tableSort.field === 'cost') {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
      } else {
        valA = String(valA || '').toLowerCase();
        valB = String(valB || '').toLowerCase();
      }

      if (valA < valB) return tableSort.direction === 'asc' ? -1 : 1;
      if (valA > valB) return tableSort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    // Pagination calculations
    const totalRecords = sorted.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / ITEMS_PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, totalRecords);
    const paginated = sorted.slice(startIdx, endIdx);

    // Update Pagination UI
    if (paginationInfo) {
      paginationInfo.textContent = totalRecords === 0
        ? 'No matching transactions'
        : `Showing ${startIdx + 1}-${endIdx} of ${totalRecords} transactions`;
    }

    if (pageNumIndicator) pageNumIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;

    if (paginated.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 32px; color: #64748b;">
            No transactions match the current filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = paginated.map(r => {
      let statusClass = 'status-completed';
      if (r.status === 'Pending') statusClass = 'status-pending';
      if (r.status === 'Refunded') statusClass = 'status-refunded';

      return `
        <tr data-id="${escapeHtml(r.id)}">
          <td class="td-id">${escapeHtml(r.id)}</td>
          <td class="td-customer">${escapeHtml(r.customer)}</td>
          <td>${escapeHtml(r.product)}</td>
          <td><span style="color: ${CATEGORY_COLORS[r.category] || '#94a3b8'}; font-weight: 600;">${escapeHtml(r.category)}</span></td>
          <td>${escapeHtml(r.date)}</td>
          <td>${escapeHtml(r.channel)}</td>
          <td class="td-amount text-right">${formatCurrency(r.amount)}</td>
          <td><span class="status-badge ${statusClass}">${escapeHtml(r.status)}</span></td>
          <td class="text-center">
            <div class="row-actions">
              <button class="table-icon-btn edit-tx-btn" data-id="${escapeHtml(r.id)}" title="Edit transaction">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="table-icon-btn btn-delete delete-tx-btn" data-id="${escapeHtml(r.id)}" title="Delete transaction">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach row listeners
    tbody.querySelectorAll('.edit-tx-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openEditTransactionModal(id);
      });
    });

    tbody.querySelectorAll('.delete-tx-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteTransaction(id);
      });
    });
  }

  // --- CRUD Actions ---
  function openNewTransactionModal() {
    const form = document.getElementById('transaction-form');
    if (!form) return;
    form.reset();
    document.getElementById('edit-transaction-id').value = '';
    document.getElementById('modal-title').textContent = 'Record New Transaction';
    document.getElementById('form-date').value = new Date().toISOString().split('T')[0];
    openModal('transaction-modal');
  }

  function openEditTransactionModal(id) {
    const item = appData.transactions.find(t => t.id === id);
    if (!item) return;

    document.getElementById('edit-transaction-id').value = item.id;
    document.getElementById('modal-title').textContent = `Edit Transaction (${item.id})`;
    document.getElementById('form-customer').value = item.customer || '';
    document.getElementById('form-date').value = item.date || '';
    document.getElementById('form-product').value = item.product || '';
    document.getElementById('form-category').value = item.category || 'Software / SaaS';
    document.getElementById('form-amount').value = item.amount || '';
    document.getElementById('form-cost').value = item.cost || '0';
    document.getElementById('form-status').value = item.status || 'Completed';
    document.getElementById('form-channel').value = item.channel || 'Direct Sales';
    document.getElementById('form-region').value = item.region || 'North America';
    document.getElementById('form-payment').value = item.payment || 'Credit Card';

    openModal('transaction-modal');
  }

  function saveTransactionFromForm(e) {
    e.preventDefault();
    const editId = document.getElementById('edit-transaction-id').value;

    const customer = document.getElementById('form-customer').value.trim();
    const date = document.getElementById('form-date').value;
    const product = document.getElementById('form-product').value.trim();
    const category = document.getElementById('form-category').value;
    const amount = parseFloat(document.getElementById('form-amount').value) || 0;
    const cost = parseFloat(document.getElementById('form-cost').value) || 0;
    const status = document.getElementById('form-status').value;
    const channel = document.getElementById('form-channel').value;
    const region = document.getElementById('form-region').value;
    const payment = document.getElementById('form-payment').value;

    if (editId) {
      // Edit existing
      const idx = appData.transactions.findIndex(t => t.id === editId);
      if (idx !== -1) {
        appData.transactions[idx] = {
          id: editId,
          customer,
          product,
          category,
          amount,
          cost,
          date,
          status,
          channel,
          region,
          payment
        };
        showToast(`Updated transaction ${editId}`, 'success');
      }
    } else {
      // Create new
      const newId = `TRX-${1000 + appData.transactions.length + 1}`;
      appData.transactions.unshift({
        id: newId,
        customer,
        product,
        category,
        amount,
        cost,
        date,
        status,
        channel,
        region,
        payment
      });
      showToast(`Recorded new sale ${newId} (${formatCurrency(amount)})`, 'success');
    }

    saveData();
    closeModal('transaction-modal');
    renderDashboard();
  }

  function deleteTransaction(id) {
    if (confirm(`Are you sure you want to delete transaction ${id}?`)) {
      const idx = appData.transactions.findIndex(t => t.id === id);
      if (idx !== -1) {
        appData.transactions.splice(idx, 1);
        saveData();
        renderDashboard();
        showToast(`Deleted transaction ${id}`, 'info');
      }
    }
  }

  // --- Export & Import Features ---
  function exportToCSV() {
    const records = getFilteredTransactions();
    if (records.length === 0) {
      showToast('No records to export', 'warning');
      return;
    }

    const headers = ['Transaction ID', 'Customer', 'Product', 'Category', 'Date', 'Amount (USD)', 'Cost (USD)', 'Status', 'Channel', 'Region', 'Payment'];
    const rows = records.map(r => [
      `"${r.id}"`,
      `"${r.customer.replace(/"/g, '""')}"`,
      `"${r.product.replace(/"/g, '""')}"`,
      `"${r.category}"`,
      `"${r.date}"`,
      r.amount.toFixed(2),
      r.cost.toFixed(2),
      `"${r.status}"`,
      `"${r.channel}"`,
      `"${r.region}"`,
      `"${r.payment}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `salesflow_export_${activeFilters.timeRange}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(`Exported ${records.length} records to CSV`, 'success');
  }

  function exportToJSON() {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `salesflow_backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Full backup downloaded', 'success');
    } catch (e) {
      showToast('Export failed', 'danger');
    }
  }

  function importJSON(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed && Array.isArray(parsed.transactions)) {
          appData = parsed;
          saveData();
          renderDashboard();
          closeModal('data-mgr-modal');
          showToast('Data restored successfully!', 'success');
        } else {
          showToast('Invalid backup file schema', 'danger');
        }
      } catch (err) {
        showToast('Error reading JSON file', 'danger');
      }
    };
    reader.readAsText(file);
  }

  // --- Modals Management ---
  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --- Canvas Tooltip Interaction ---
  function setupChartTooltips() {
    const canvas = document.getElementById('revenue-line-canvas');
    const tooltip = document.getElementById('chart-tooltip');
    if (!canvas || !tooltip) return;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let closest = null;
      let minDistance = 35; // Pixel threshold

      lineChartPoints.forEach(pt => {
        const dist = Math.abs(pt.x - mouseX);
        if (dist < minDistance) {
          closest = pt;
          minDistance = dist;
        }
      });

      if (closest) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${closest.x}px`;
        tooltip.style.top = `${closest.y}px`;
        tooltip.innerHTML = `
          <strong style="color: #ffffff;">${closest.month} 2026</strong><br>
          <span style="color: #38bdf8;">Revenue: ${formatCurrency(closest.rev)}</span><br>
          <span style="color: #10b981;">Net Profit: ${formatCurrency(closest.prof)}</span>
        `;
      } else {
        tooltip.style.display = 'none';
      }
    });

    canvas.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  }

  // --- Event Listeners Setup ---
  function setupEventListeners() {
    // Currency Selector
    const curSelect = document.getElementById('currency-select');
    if (curSelect) {
      curSelect.value = appData.currency || 'USD';
      curSelect.addEventListener('change', (e) => {
        appData.currency = e.target.value;
        saveData();
        renderDashboard();
      });
    }

    // Time Range Selector
    document.getElementById('time-range-select')?.addEventListener('change', (e) => {
      activeFilters.timeRange = e.target.value;
      currentPage = 1;
      renderDashboard();
    });

    // Table Search Input
    document.getElementById('transaction-search')?.addEventListener('input', (e) => {
      activeFilters.search = e.target.value;
      currentPage = 1;
      renderDashboard();
    });

    // Table Category Filter
    document.getElementById('filter-category')?.addEventListener('change', (e) => {
      activeFilters.category = e.target.value;
      currentPage = 1;
      renderDashboard();
    });

    // Table Status Filter
    document.getElementById('filter-status')?.addEventListener('change', (e) => {
      activeFilters.status = e.target.value;
      currentPage = 1;
      renderDashboard();
    });

    // Sortable Headers
    document.querySelectorAll('.sales-table th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const field = th.getAttribute('data-sort');
        if (tableSort.field === field) {
          tableSort.direction = tableSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
          tableSort.field = field;
          tableSort.direction = 'desc';
        }
        renderTable(getFilteredTransactions());
      });
    });

    // Pagination
    document.getElementById('prev-page-btn')?.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable(getFilteredTransactions());
      }
    });

    document.getElementById('next-page-btn')?.addEventListener('click', () => {
      currentPage++;
      renderTable(getFilteredTransactions());
    });

    // Modal Triggers & Form Submits
    document.getElementById('open-new-sale-modal-btn')?.addEventListener('click', openNewTransactionModal);
    document.getElementById('transaction-form')?.addEventListener('submit', saveTransactionFromForm);

    document.getElementById('open-data-mgr-btn')?.addEventListener('click', () => openModal('data-mgr-modal'));
    document.getElementById('export-csv-btn')?.addEventListener('click', exportToCSV);
    document.getElementById('export-json-btn')?.addEventListener('click', exportToJSON);

    const fileInput = document.getElementById('import-json-file');
    document.getElementById('import-json-trigger-btn')?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importJSON(e.target.files[0]);
      }
    });

    document.getElementById('reset-demo-btn')?.addEventListener('click', () => {
      if (confirm('Reload the 35 demo transactions across all quarters?')) {
        initDemoData();
        renderDashboard();
        closeModal('data-mgr-modal');
        showToast('Demo dataset reloaded', 'success');
      }
    });

    document.getElementById('clear-all-data-btn')?.addEventListener('click', () => {
      if (confirm('⚠️ Permanently delete all transactions from browser storage?')) {
        appData.transactions = [];
        saveData();
        renderDashboard();
        closeModal('data-mgr-modal');
        showToast('All transaction records erased', 'warning');
      }
    });

    // Close Modal Listeners
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        closeModal(modalId);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal.id);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
      }
    });

    // Window Resize Chart Redraw
    window.addEventListener('resize', () => {
      const filtered = getFilteredTransactions();
      renderLineChart(filtered);
    });

    setupChartTooltips();
  }

  // --- Initialization ---
  function init() {
    loadData();
    setupEventListeners();
    renderDashboard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
