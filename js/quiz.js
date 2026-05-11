const ALL = {
  general: {
    name: 'Общие знания', emoji: '🌍',
    desc: 'История, география, литература и наука — 10 вопросов.',
    qs: [
      { q: "Какой элемент является наименьшей единицей живого организма?", opts: ["Атом", "Молекула", "Клетка", "Ядро"], c: 2 },
      { q: "В каком году был запущен первый искусственный спутник Земли?", opts: ["1945", "1957", "1961", "1969"], c: 1 },
      { q: "Столица Австралии — это:", opts: ["Сидней", "Мельбурн", "Брисбен", "Канберра"], c: 3 },
      { q: "Скорость света в вакууме составляет приблизительно:", opts: ["300 000 км/с", "150 000 км/с", "1 080 000 км/ч", "30 000 км/с"], c: 0 },
      { q: "Кто написал роман «Преступление и наказание»?", opts: ["Лев Толстой", "Антон Чехов", "Фёдор Достоевский", "Иван Тургенев"], c: 2 },
      { q: "Химический символ Au обозначает:", opts: ["Серебро", "Алюминий", "Аргон", "Золото"], c: 3 },
      { q: "Сколько планет в Солнечной системе?", opts: ["7", "8", "9", "10"], c: 1 },
      { q: "Самая высокая вершина мира:", opts: ["К2", "Денали", "Эльбрус", "Эверест"], c: 3 },
      { q: "Столица Японии:", opts: ["Осака", "Сеул", "Токио", "Пекин"], c: 2 },
      { q: "Какая река считается самой длинной в мире?", opts: ["Амазонка", "Нил", "Миссисипи", "Янцзы"], c: 1 }
    ]
  },
  science: {
    name: 'Наука', emoji: '🔬',
    desc: 'Биология, физика, химия и астрономия — 10 вопросов.',
    qs: [
      { q: "Какова химическая формула воды?", opts: ["HO", "H₂O₂", "H₂O", "H₃O"], c: 2 },
      { q: "Какая планета ближе всего к Солнцу?", opts: ["Венера", "Земля", "Марс", "Меркурий"], c: 3 },
      { q: "Какой природный материал является самым твёрдым?", opts: ["Кварц", "Корунд", "Алмаз", "Гранит"], c: 2 },
      { q: "Каков атомный номер углерода?", opts: ["4", "6", "8", "12"], c: 1 },
      { q: "Сколько хромосом содержится в клетках человека?", opts: ["23", "44", "46", "48"], c: 2 },
      { q: "Какой орган вырабатывает инсулин?", opts: ["Печень", "Почка", "Желудок", "Поджелудочная железа"], c: 3 },
      { q: "Приблизительная скорость звука в воздухе:", opts: ["240 м/с", "340 м/с", "440 м/с", "540 м/с"], c: 1 },
      { q: "Что изучает энтомология?", opts: ["Птиц", "Рыб", "Насекомых", "Млекопитающих"], c: 2 },
      { q: "Какой газ составляет наибольшую долю атмосферы Земли?", opts: ["Кислород", "Аргон", "Углекислый газ", "Азот"], c: 3 },
      { q: "За сколько дней Земля совершает полный оборот вокруг Солнца?", opts: ["364", "365", "366", "365,25"], c: 3 }
    ]
  },
  tech: {
    name: 'Технологии', emoji: '💻',
    desc: 'Программирование, IT и интернет — 10 вопросов.',
    qs: [
      { q: "Что означает аббревиатура HTML?", opts: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], c: 0 },
      { q: "Для чего используется CSS?", opts: ["Серверная логика приложений", "Описание внешнего вида веб-страниц", "Работа с базами данных", "Протокол передачи данных"], c: 1 },
      { q: "Сколько битов содержит один байт?", opts: ["4", "16", "8", "32"], c: 2 },
      { q: "Сколько байтов в одном килобайте?", opts: ["100", "512", "1000", "1024"], c: 3 },
      { q: "В каком году была основана компания Google?", opts: ["1994", "1996", "1998", "2001"], c: 2 },
      { q: "Что такое RAM?", opts: ["Жёсткий диск", "Видеокарта", "Оперативная память", "Процессор"], c: 2 },
      { q: "Кто создал операционную систему Linux?", opts: ["Билл Гейтс", "Стив Джобс", "Линус Торвальдс", "Деннис Ритчи"], c: 2 },
      { q: "Что означает «IP» в IP-адресе?", opts: ["Internal Protocol", "Internet Protocol", "Intranet Process", "Interface Program"], c: 1 },
      { q: "В каком году появился язык программирования Python?", opts: ["1985", "1991", "1995", "1999"], c: 1 },
      { q: "Что такое Git?", opts: ["Текстовый редактор", "Язык программирования", "Браузер", "Система контроля версий"], c: 3 }
    ]
  }
};

const LETTERS = ['А', 'Б', 'В', 'Г'];
let cat = 'general', customId = null, rawQs = [], QUESTIONS = [];
let current = 0, score = 0, answered = false, userAnswers = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOpts(q) {
  const idx = [0, 1, 2, 3];
  for (let i = 3; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return { q: q.q, opts: idx.map(i => q.opts[i]), c: idx.indexOf(q.c) };
}

function init() {
  const p = new URLSearchParams(location.search);
  cat = p.get('cat') || 'general';
  customId = p.get('id') || null;

  let name, emoji, desc;

  if (cat === 'custom' && customId !== null) {
    const customs = Storage.getCustomQuizzes();
    const quiz = customs[parseInt(customId)];
    if (!quiz || !quiz.questions || !quiz.questions.length) {
      document.getElementById('cat-title').textContent = 'Тест не найден';
      document.getElementById('cat-desc').textContent = 'Этот тест был удалён или не существует.';
      document.querySelector('.btn[onclick="startQuiz()"]').disabled = true;
      return;
    }
    name = quiz.name;
    emoji = '✏️';
    desc = `Пользовательский тест — ${quiz.questions.length} вопросов.`;
    rawQs = quiz.questions;
    document.title = `WowQuiz — ${name}`;
  } else {
    if (!ALL[cat]) cat = 'general';
    const data = ALL[cat];
    name = data.name;
    emoji = data.emoji;
    desc = data.desc;
    rawQs = data.qs;
    document.title = `WowQuiz — ${name}`;
  }

  document.getElementById('cat-emoji').textContent = emoji;
  document.getElementById('cat-title').textContent = name;
  document.getElementById('cat-desc').textContent = desc;

  const bestKey = cat === 'custom' ? `custom_${customId}` : cat;
  const best = Storage.getResults()
    .filter(r => r.cat === bestKey)
    .reduce((m, r) => Math.max(m, r.score), -1);
  if (best >= 0) {
    document.getElementById('best-block').style.display = 'block';
    document.getElementById('best-text').textContent = `🏅 Твой лучший результат: ${best} из ${rawQs.length}`;
  }
}

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startQuiz() {
  current = 0; score = 0; answered = false; userAnswers = [];
  QUESTIONS = shuffle(rawQs).map(shuffleOpts);
  show('screen-quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[current];
  answered = false;
  document.getElementById('q-counter').textContent = `Вопрос ${current + 1} из ${QUESTIONS.length}`;
  document.getElementById('score-live').textContent = '';
  document.getElementById('progress').style.width = `${(current / QUESTIONS.length) * 100}%`;
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('btn-next').disabled = true;

  const container = document.getElementById('options');
  container.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="letter">${LETTERS[i]}</span>${opt}`;
    btn.onclick = () => selectAnswer(i);
    container.appendChild(btn);
  });
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  const q = QUESTIONS[current];
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);
  buttons[idx].classList.add('selected');
  if (idx === q.c) score++;
  userAnswers.push({ chosen: idx, correct: q.c });
  document.getElementById('btn-next').disabled = false;
  document.getElementById('btn-next').textContent =
    current === QUESTIONS.length - 1 ? 'Результат 🎉' : 'Далее →';
}

function nextQuestion() {
  if (!answered) return;
  current++;
  if (current >= QUESTIONS.length) showResult();
  else renderQuestion();
}

function showResult() {
  const total = QUESTIONS.length;
  const pct = Math.round((score / total) * 100);

  const catKey = cat === 'custom' ? `custom_${customId}` : cat;
  const catName = cat === 'custom'
    ? (Storage.getCustomQuizzes()[parseInt(customId)]?.name || 'Свой тест')
    : ALL[cat].name;

  Storage.saveResult({ cat: catKey, catName, score, total, pct, date: new Date().toISOString() });

  document.getElementById('score-num').textContent = score;
  document.getElementById('score-den').textContent = `из ${total}`;
  document.getElementById('score-circle').style.setProperty('--pct', `${pct}%`);
  document.getElementById('stat-correct').textContent = `✓ ${score} правильно`;
  document.getElementById('stat-wrong').textContent = `✗ ${total - score} неправильно`;
  document.getElementById('stat-pct').textContent = `${pct}%`;

  let emoji, title, sub;
  if (pct === 100)      { emoji = '🏆'; title = 'Идеально!';        sub = 'Все вопросы правильно — блестяще!'; }
  else if (pct >= 80)  { emoji = '🥇'; title = 'Отличный результат!'; sub = 'Ты хорошо знаешь материал. Так держать!'; }
  else if (pct >= 60)  { emoji = '👍'; title = 'Хорошая работа!';   sub = 'Неплохо, но есть над чем поработать.'; }
  else if (pct >= 40)  { emoji = '📚'; title = 'Неплохо!';          sub = 'Больше половины правильно — есть прогресс!'; }
  else                  { emoji = '💪'; title = 'Не сдавайся!';      sub = 'Попробуй ещё раз — у тебя всё получится!'; }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-sub').textContent = sub;
  document.getElementById('progress').style.width = '100%';

  const reviewEl = document.getElementById('q-review');
  reviewEl.innerHTML = '';
  document.getElementById('review-toggle').textContent = '▾ Разбор ответов';
  reviewEl.style.display = 'none';
  QUESTIONS.forEach((q, i) => {
    const ua = userAnswers[i];
    const ok = ua.chosen === ua.correct;
    const item = document.createElement('div');
    item.className = `q-review-item ${ok ? 'ok' : 'fail'}`;
    item.innerHTML = `
      <div class="q-review-icon">${ok ? '✓' : '✗'}</div>
      <div class="q-review-body">
        <div class="q-review-q">${i + 1}. ${q.q}</div>
        <div class="q-review-ans">
          ${ok
            ? `<span class="ans-correct">Ваш ответ: ${q.opts[ua.chosen]}</span>`
            : `<span class="ans-wrong">Ваш ответ: ${q.opts[ua.chosen]}</span><br>
               <span class="ans-correct">Правильно: ${q.opts[ua.correct]}</span>`
          }
        </div>
      </div>`;
    reviewEl.appendChild(item);
  });

  show('screen-result');
}

function toggleReview() {
  const el = document.getElementById('q-review');
  const btn = document.getElementById('review-toggle');
  const hidden = el.style.display === 'none';
  el.style.display = hidden ? 'flex' : 'none';
  btn.textContent = hidden ? '▴ Скрыть разбор' : '▾ Разбор ответов';
}

init();
