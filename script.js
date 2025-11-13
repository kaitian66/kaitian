fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const input = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    input.addEventListener('input', () => {
      const keyword = input.value.trim();
      resultsDiv.innerHTML = '';

      if (!keyword) return;

      const matches = data.filter(item => item.question.includes(keyword));

      if (matches.length === 0) {
        resultsDiv.textContent = '查無資料';
        return;
      }

      matches.forEach(item => {
        const pQ = document.createElement('p');
        pQ.textContent = '題目：' + item.question;
        const pA = document.createElement('p');
        pA.textContent = '答案：' + item.answer;
        resultsDiv.appendChild(pQ);
        resultsDiv.appendChild(pA);
      });
    });
  })
  .catch(err => {
    document.getElementById('results').textContent = '資料讀取錯誤';
  });
