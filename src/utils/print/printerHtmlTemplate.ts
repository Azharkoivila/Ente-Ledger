//! a bug detetected when minus value is frist Transaction
export default function calculate(txn, summery, accountName, accountId) {
  let balance = 0;
  const ledgerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Account Ledger</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#eef1f5;
    --paper:#ffffff;
    --border:#e3e7ee;
    --border-strong:#d6dbe4;
    --ink:#131722;
    --ink-soft:#6b7280;
    --ink-faint:#9aa2b1;
    --accent:#2653e0;
    --debit:#c0362c;
    --credit:#1a7a4c;
    --row-alt:#f8f9fb;
    --shadow:0 1px 2px rgba(16,24,40,0.04), 0 12px 32px -12px rgba(16,24,40,0.14);
  }

  *{box-sizing:border-box;}

  /* NOTE: no min-height:100vh / flex-centering on body — unreliable
     inside a PDF render context. Center with margin auto instead. */
  body{
    margin:0;
    padding:48px 20px;
    background:var(--bg);
    font-family:'Inter',sans-serif;
    color:var(--ink);
  }

  .sheet{
    width:100%;
    max-width:760px;
    margin:0 auto;
    background:var(--paper);
    border:1px solid var(--border);
    border-radius:12px;
    box-shadow:var(--shadow);
    overflow:hidden;
  }

  /* header */
  .head{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:20px;
    padding:32px 36px;
    border-bottom:1px solid var(--border);
  }

  .brand{
    display:flex;
    align-items:center;
    gap:12px;
  }
  .brand-mark{
    width:38px;
    height:38px;
    border-radius:9px;
    background:var(--ink);
    display:flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
  }
  .brand-mark svg{ width:19px; height:19px; }

  .brand-text .product{
    font-size:11px;
    font-weight:600;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:var(--ink-faint);
  }
  .brand-text h1{
    margin:2px 0 0;
    font-size:20px;
    font-weight:700;
    letter-spacing:-0.01em;
  }

  .acct-meta{
    text-align:right;
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;
    color:var(--ink-soft);
    line-height:1.75;
  }
  .acct-meta span{ color:var(--ink); font-weight:600; }
  .acct-meta .row{ display:flex; gap:10px; justify-content:flex-end; }
  .acct-meta .k{ color:var(--ink-faint); }

  /* table */
  .table-wrap{ padding:0 36px; }

  .ledger-table{
    width:100%;
    border-collapse:collapse;
    font-size:13.5px;
  }

  .ledger-table thead th{
    text-align:left;
    padding:14px 12px;
    font-size:11px;
    font-weight:600;
    letter-spacing:0.06em;
    text-transform:uppercase;
    color:var(--ink-faint);
    border-bottom:1.5px solid var(--border-strong);
  }
  .ledger-table thead th.num{ text-align:right; }

  .ledger-table tbody td{
    padding:15px 12px;
    border-bottom:1px solid var(--border);
    font-family:'IBM Plex Mono', monospace;
  }
  .ledger-table tbody tr:nth-child(even){ background:var(--row-alt); }

  .item-cell{
    font-family:'Inter',sans-serif;
    font-weight:500;
    font-size:14px;
  }
  .item-cell .tag{
    display:block;
    font-family:'Inter',sans-serif;
    font-weight:400;
    font-size:12px;
    color:var(--ink-faint);
    margin-top:2px;
  }

  .num{ text-align:right; font-variant-numeric:tabular-nums; white-space:nowrap; }
  .debit{ color:var(--debit); font-weight:500; }
  .credit{ color:var(--credit); font-weight:500; }
  .balance{ font-weight:600; }
  .muted{ color:var(--ink-faint); }

  /* totals */
  .totals{
    margin:0 36px;
    padding:18px 12px;
    display:flex;
    justify-content:flex-end;
    gap:40px;
    border-top:2px solid var(--ink);
  }
  .totals .t{ text-align:right; }
  .totals .t .lbl{
    display:block;
    font-size:11px;
    font-weight:600;
    letter-spacing:0.06em;
    text-transform:uppercase;
    color:var(--ink-faint);
    margin-bottom:4px;
  }
  .totals .t .val{
    font-family:'IBM Plex Mono', monospace;
    font-size:16px;
    font-weight:600;
  }
  .totals .t.debit .val{ color:var(--debit); }
  .totals .t.credit .val{ color:var(--credit); }
  .totals .t.balance .val{ font-size:18px; color:var(--accent); }

  /* footer */
  .footer{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
    padding:20px 36px 28px;
    margin-top:8px;
    font-size:12px;
    color:var(--ink-faint);
  }
  .footer a{
    color:var(--ink-soft);
    text-decoration:none;
    font-weight:600;
  }
  .footer a:hover{ color:var(--accent); }

  @media (max-width:600px){
    .head{ flex-direction:column; align-items:flex-start; }
    .acct-meta{ text-align:left; }
    .acct-meta .row{ justify-content:flex-start; }
    .table-wrap{ padding:0 20px; }
    .totals{ margin:0 20px; }
    .footer{ padding:20px 20px 26px; flex-direction:column; align-items:flex-start; gap:6px; }
    .ledger-table{ font-size:12px; }
  }
</style>
</head>
<body>

<div class="sheet">

  <header class="head">
    <div class="brand">
      <div class="brand-mark">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h16v16H4V4z" stroke="#ffffff" stroke-width="1.5"/>
          <path d="M8 9h8M8 12.5h8M8 16h5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="brand-text">
        <div class="product">Ente Ledger</div>
        <h1>${accountName || "Guest User"}</h1>
      </div>
    </div>
    <div class="acct-meta">
      <div class="row"><span class="k">AccountID</span><span>${accountId || "Nill"}</span></div>
      <div class="row"><span class="k">Currency</span><span>INR</span></div>
      <div class="row"><span class="k">Entries</span><span>${txn.length}</span></div>
    </div>
  </header>
  <div class="table-wrap">
    <table class="ledger-table">
      <thead>
        <tr>
          <th class="num">No</th>
          <th style="width:44%;">Item</th>
          <th class="num">Debit</th>
          <th class="num">Credit</th>
          <th class="num">Balance</th>
        </tr>
      </thead>
      <tbody>
        ${txn
          .map((transaction, no) => {
            if (transaction.transactionType === "income") {
              balance += transaction.amount;
            } else {
              balance -= transaction.amount;
            }
            return `<tr>
          <td class="item-cell">${no + 1}</td>
          <td class="item-cell">${transaction.category.toUpperCase()}<span class="tag">${transaction.note.toUpperCase()}</span></td>
          <td class=${transaction.transactionType === "expense" ? '"num debit"' : '"num muted"'}>${transaction.transactionType === "expense" ? `₹ ${transaction.amount}` : "&mdash;"}</td>
          <td class=${transaction.transactionType === "income" ? '"num credit"' : '"num muted"'}>${transaction.transactionType === "income" ? `₹ ${transaction.amount}` : "&mdash;"}</td>
          <td class="num balance"> ₹ ${balance}</td>
        </tr>`;
          })
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="totals">
    <div class="t debit">
      <span class="lbl">Total Debit</span>
      <span class="val">₹ ${summery.totalExpense}</span>
    </div>
    <div class="t credit">
      <span class="lbl">Total Credit</span>
      <span class="val">₹ ${summery.totalIncome}</span>
    </div>
    <div class="t balance">
      <span class="lbl">Closing Balance</span>
      <span class="val">₹ ${summery.closingBalance}</span>
    </div>
  </div>

  <div class="footer">
    <span>&copy; 2026 Ente Ledger. All entries reconciled.</span>
    <span>Developed by <a href="https://azharkoivila.tedomum.org/" target="_blank" rel="noopener">AzharKoivila</a></span>
  </div>

</div>

</body>
</html>`;

  return ledgerHtml;
}
