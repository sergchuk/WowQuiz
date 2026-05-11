let currentFilter = 'all';

function setFilter(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
}

function clearHistory() {
  if (!confirm('Удалить всю историю результатов?')) return;
  Storage.clearResults();
  renderSummary();
  renderTable();
}

function renderSummary() {
  const results = Storage.getResults();
  const total = results.length;
  const best = total ? Math.max(...results.map(r => r.pct)) : 0;
  const avg = total ? Math.round(results.reduce((s, r) => s + r.pct, 0) / total) : 0;
  document.getElementById('summary').innerHTML = `
    <div class="s-pill"><div class="val">${total}</div><div class="lbl">Попыток всего</div></div>
    <div class="s-pill"><div class="val">${best ? best + '%' : '—'}</div><div class="lbl">Лучший результат</div></div>
    <div class="s-pill"><div class="val">${avg ? avg + '%' : '—'}</div><div class="lbl">Средний результат</div></div>
  `;
}

function renderTable() {
  const results = Storage.getResults();
  const filtered = currentFilter === 'all' ? results : results.filter(r => r.cat === currentFilter);
  const sorted = [...filtered].sort((a, b) => b.pct - a.pct || new Date(b.date) - new Date(a.date));
  const el = document.getElementById('content');

  if (!sorted.length) {
    el.innerHTML = `<div class="empty">
      <div class="icon">😭</div>
      <p>${currentFilter === 'all'
        ? 'Ты ещё не прошёл ни одной викторины.<br>Выбери категорию и начни!'
        : 'Нет результатов по этой категории.'}</p>
      <a class="btn" href="../index.html">Выбрать категорию</a>
    </div>`;
    return;
  }

  const rows = sorted.map((r, i) => {
    const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'rank-num';
    const rankLabel = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1;
    const date = new Date(r.date).toLocaleString('ru', {
      day: '2-digit', month: '2-digit', year: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
    return `<tr>
      <td><span class="rank ${rankClass}">${rankLabel}</span></td>
      <td><span class="cat-badge">${r.catName}</span></td>
      <td><strong>${r.score}</strong> <span style="color:var(--muted)">из ${r.total}</span></td>
      <td>
        <div class="pct-bar">
          <div class="pct-track"><div class="pct-fill" style="width:${r.pct}%"></div></div>
          <span class="pct-label">${r.pct}%</span>
        </div>
      </td>
      <td style="color:var(--muted);font-size:.8rem">${date}</td>
    </tr>`;
  }).join('');

  el.innerHTML = `<div class="table-wrap">
    <table>
      <thead><tr>
        <th>#</th><th>Категория</th><th>Счёт</th><th>Результат</th><th>Дата</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

renderSummary();
renderTable();
