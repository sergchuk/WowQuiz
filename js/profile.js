const CATS = {
  general: { name: 'Общие знания', emoji: '🌍' },
  science: { name: 'Наука',        emoji: '🔬' },
  tech:    { name: 'Технологии',   emoji: '💻' }
};

const ACHIEVEMENTS = [
  { icon: '🎯', name: 'Первый шаг',    desc: 'Пройди первую викторину',               check: r => r.length >= 1 },
  { icon: '🔥', name: 'На разогреве',  desc: 'Пройди 5 викторин',                    check: r => r.length >= 5 },
  { icon: '📅', name: 'Постоянство',   desc: 'Пройди 10 викторин',                   check: r => r.length >= 10 },
  { icon: '⭐', name: 'Хорошист',      desc: 'Набери 80%+ в любой викторине',         check: r => r.some(x => x.pct >= 80) },
  { icon: '🏆', name: 'Отличник',      desc: 'Набери 100% в любой викторине',         check: r => r.some(x => x.pct === 100) },
  { icon: '📖', name: 'Эрудит',        desc: 'Пройди все три категории',              check: r => new Set(r.map(x => x.cat)).size >= 3 },
  { icon: '🎓', name: 'Мастер',        desc: 'Набери 80%+ в каждой из трёх категорий', check: r => ['general','science','tech'].every(c => r.filter(x=>x.cat===c).some(x=>x.pct>=80)) },
  { icon: '💎', name: 'Перфекционист', desc: 'Набери 100% в каждой категории',        check: r => ['general','science','tech'].every(c => r.filter(x=>x.cat===c).some(x=>x.pct===100)) }
];

function clearAll() {
  if (!confirm('Удалить всю историю результатов?')) return;
  Storage.clearResults();
  renderAll();
}

function renderAll() {
  const results = Storage.getResults();
  renderStats(results);
  renderCatProgress(results);
  renderAchievements(results);
  renderHistory(results);
}

function renderStats(results) {
  const total = results.length;
  const best = total ? Math.max(...results.map(r => r.pct)) : null;
  const avg = total ? Math.round(results.reduce((s, r) => s + r.pct, 0) / total) : null;
  const correct = results.reduce((s, r) => s + r.score, 0);

  document.getElementById('stats-row').innerHTML = [
    { icon: '🎮', val: total,                            lbl: 'Всего игр' },
    { icon: '🏅', val: best !== null ? best + '%' : '—', lbl: 'Лучший результат' },
    { icon: '📊', val: avg  !== null ? avg  + '%' : '—', lbl: 'Средний результат' },
    { icon: '✓',  val: correct,                          lbl: 'Правильных ответов' }
  ].map(s => `<div class="stat-box">
    <div class="icon">${s.icon}</div>
    <div class="val">${s.val}</div>
    <div class="lbl">${s.lbl}</div>
  </div>`).join('');
}

function renderCatProgress(results) {
  const el = document.getElementById('cat-progress');
  if (!results.length) {
    el.innerHTML = '<div class="empty-state"><p>Ещё нет данных. Пройди хоть бы одну викторину!</p><a class="btn" href="../index.html">Начать</a></div>';
    return;
  }
  el.innerHTML = Object.entries(CATS).map(([key, cat]) => {
    const catResults = results.filter(r => r.cat === key);
    if (!catResults.length) {
      return `<div class="cat-row">
        <span class="cat-row-icon">${cat.emoji}</span>
        <div class="cat-row-info"><div class="cat-row-name">${cat.name}</div><div class="cat-row-meta no-data">Ещё не пройдено</div></div>
        <div class="cat-row-bar"><div class="bar-track"><div class="bar-fill" style="width:0%"></div></div><div class="bar-label">—</div></div>
        <div class="cat-row-score" style="color:var(--muted)">—</div>
      </div>`;
    }
    const best = Math.max(...catResults.map(r => r.pct));
    const bestScore = catResults.find(r => r.pct === best);
    return `<div class="cat-row">
      <span class="cat-row-icon">${cat.emoji}</span>
      <div class="cat-row-info">
        <div class="cat-row-name">${cat.name}</div>
        <div class="cat-row-meta">Сыграно: ${catResults.length} раз</div>
      </div>
      <div class="cat-row-bar">
        <div class="bar-track"><div class="bar-fill" style="width:${best}%"></div></div>
        <div class="bar-label">Лучший: ${bestScore.score} из ${bestScore.total}</div>
      </div>
      <div class="cat-row-score">${best}%</div>
    </div>`;
  }).join('');
}

function renderAchievements(results) {
  const unlocked = ACHIEVEMENTS.filter(a => a.check(results)).length;
  document.getElementById('ach-counter').textContent = `${unlocked} / ${ACHIEVEMENTS.length} разблокировано`;
  document.getElementById('achievements').innerHTML = ACHIEVEMENTS.map(a => {
    const done = a.check(results);
    return `<div class="ach-card ${done ? 'unlocked' : 'locked'}">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
      <span class="ach-badge ${done ? 'done' : 'todo'}">${done ? '✓ Получено' : 'Заблокировано'}</span>
    </div>`;
  }).join('');
}

function renderHistory(results) {
  const el = document.getElementById('history');
  if (!results.length) {
    el.innerHTML = '<div class="empty-state"><p>История пуста. Сыграй в викторину и результаты появятся здесь!</p><a class="btn" href="../index.html">Играть</a></div>';
    return;
  }
  const reversed = [...results].reverse().slice(0, 20);
  el.innerHTML = '<div class="history-list">' + reversed.map(r => {
    const pctClass = r.pct >= 70 ? 'high' : r.pct >= 40 ? 'mid' : 'low';
    const date = new Date(r.date).toLocaleString('ru', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    const cat = CATS[r.cat] || { emoji: '✏', name: r.catName };
    return `<div class="hist-row">
      <span style="font-size:1.1rem">${cat.emoji}</span>
      <span class="hist-cat">${r.catName}</span>
      <span class="hist-score">${r.score} из ${r.total}</span>
      <span class="hist-pct ${pctClass}">${r.pct}%</span>
      <span class="hist-date">${date}</span>
    </div>`;
  }).join('') + '</div>';
}

renderAll();
