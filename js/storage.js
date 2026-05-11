const Storage = {
  getResults() {
    return JSON.parse(localStorage.getItem('wowquiz_results') || '[]');
  },
  saveResult(entry) {
    const results = this.getResults();
    results.push(entry);
    localStorage.setItem('wowquiz_results', JSON.stringify(results));
  },
  clearResults() {
    localStorage.removeItem('wowquiz_results');
  },
  getCustomQuizzes() {
    return JSON.parse(localStorage.getItem('wowquiz_custom') || '[]');
  },
  saveCustomQuizzes(quizzes) {
    localStorage.setItem('wowquiz_custom', JSON.stringify(quizzes));
  }
};
