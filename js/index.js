(function renderRecent() {
  const results = Storage.getResults();
  const container = document.getElementById('recent-container');
  if (!results.length) {
    container.innerHTML = '<div class="empty-recent">Ты ещё не прошёл ни одной викторины.<br>Выбери категорию выше и начни прямо сейчас!</div>';
    return;
  }
  const last6 = results.slice(-6).reverse();
  container.innerHTML = '<div class="recent-grid">' +
    last6.map(r => {
      const pctClass = r.pct >= 70 ? 'high' : r.pct >= 40 ? 'mid' : 'low';
      const date = new Date(r.date).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' });
      return `<div class="recent-card">
        <div class="recent-cat">${r.catName}</div>
        <div class="recent-score">${r.score} <span>из ${r.total}</span></div>
        <div class="recent-pct ${pctClass}">${r.pct}%</div>
        <div class="recent-date">${date}</div>
      </div>`;
    }).join('') +
    '</div>';
})();
