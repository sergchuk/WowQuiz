const LETTERS = ['А', 'Б', 'В', 'Г'];

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast'; }, 2800);
}

function addQuestion() {
  const list = document.getElementById('questions-list');
  const idx = list.children.length;

  const block = document.createElement('div');
  block.className = 'q-block';
  block.dataset.idx = idx;

  block.innerHTML = `
    <div class="q-block-header">
      <span class="q-num">Вопрос ${idx + 1}</span>
      <button class="q-del" onclick="removeQuestion(this)">✕ Удалить</button>
    </div>
    <input class="q-text-input" type="text" placeholder="Текст вопроса..." maxlength="300" />
    <div class="opts-label">Варианты ответов <span class="correct-hint">— отметь правильный</span></div>
    ${[0,1,2,3].map(i => `
      <div class="opt-row">
        <span class="opt-letter">${LETTERS[i]}</span>
        <input type="radio" name="correct_${idx}" value="${i}" ${i === 0 ? 'checked' : ''} />
        <input type="text" placeholder="Вариант ${LETTERS[i]}..." maxlength="200" />
      </div>
    `).join('')}
  `;

  list.appendChild(block);
  renumberQuestions();
}

function removeQuestion(btn) {
  btn.closest('.q-block').remove();
  renumberQuestions();
}

function renumberQuestions() {
  Array.from(document.getElementById('questions-list').children).forEach((block, i) => {
    block.dataset.idx = i;
    block.querySelector('.q-num').textContent = `Вопрос ${i + 1}`;
    block.querySelectorAll('input[type="radio"]').forEach(r => r.name = `correct_${i}`);
  });
}

function saveQuiz() {
  const name = document.getElementById('quiz-name').value.trim();
  if (!name) { showToast('Введите название теста', 'error'); return; }

  const blocks = document.querySelectorAll('.q-block');
  if (!blocks.length) { showToast('Добавьте хоть бы один вопрос', 'error'); return; }

  const questions = [];
  let valid = true;

  blocks.forEach((block, i) => {
    const qText = block.querySelector('.q-text-input').value.trim();
    if (!qText) { showToast(`Введите текст вопроса ${i + 1}`, 'error'); valid = false; return; }

    const optInputs = block.querySelectorAll('.opt-row input[type="text"]');
    const opts = Array.from(optInputs).map(inp => inp.value.trim());
    if (opts.some(o => !o)) { showToast(`Заполните все варианты в вопросе ${i + 1}`, 'error'); valid = false; return; }

    const correctRadio = block.querySelector('input[type="radio"]:checked');
    const c = correctRadio ? parseInt(correctRadio.value) : 0;

    questions.push({ q: qText, opts, c });
  });

  if (!valid) return;

  const customs = Storage.getCustomQuizzes();
  customs.push({ name, questions, date: new Date().toISOString() });
  Storage.saveCustomQuizzes(customs);

  document.getElementById('quiz-name').value = '';
  document.getElementById('questions-list').innerHTML = '';

  showToast('Тест сохранён!', 'success');
  renderSaved();
}

function deleteQuiz(idx) {
  if (!confirm('Удалить этот тест?')) return;
  const customs = Storage.getCustomQuizzes();
  customs.splice(idx, 1);
  Storage.saveCustomQuizzes(customs);
  renderSaved();
}

function renderSaved() {
  const customs = Storage.getCustomQuizzes();
  const el = document.getElementById('saved-list');

  if (!customs.length) {
    el.innerHTML = `<div class="empty">
      <div class="icon">📝</div>
      <p>Ты ещё не создал ни одного теста.<br>Заполни форму выше и нажми «Сохранить тест».</p>
    </div>`;
    return;
  }

  el.innerHTML = `<div class="quiz-list">${customs.map((q, i) => {
    const date = new Date(q.date).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' });
    return `<div class="quiz-item">
      <div class="quiz-info">
        <div class="quiz-name">${escHtml(q.name)}</div>
        <div class="quiz-meta">${q.questions.length} вопросов · создан ${date}</div>
      </div>
      <div class="quiz-actions">
        <a class="btn play" href="../pages/quiz.html?cat=custom&id=${i}">▶ Пройти</a>
        <button class="btn danger" onclick="deleteQuiz(${i})">🗑</button>
      </div>
    </div>`;
  }).join('')}</div>`;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

addQuestion();
renderSaved();
