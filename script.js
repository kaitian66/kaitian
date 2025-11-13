fetch('data.json')
  .then(response => response.json())
  .then(data => {

    function doSearch() {
      const keyword = document.getElementById('searchInput').value.trim();
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // 清空之前的結果

      if (!keyword) {
        // 若沒輸入就清空即可，不顯示提示
        return;
      }

      const matches = data.filter(item => item.question.includes(keyword));

      if (matches.length === 0) {
        resultsDiv.textContent = '查無資料';
      } else {
        matches.forEach(item => {
          const pQ = document.createElement('p');
          pQ.textContent = '題目：' + item.question;

          const pA = document.createElement('p');
          pA.textContent = '答案：' + item.answer;

          resultsDiv.appendChild(pQ);
          resultsDiv.appendChild(pA);
        });
      }
    }

    // 點擊按鈕搜尋（保留）
    document.getElementById('searchButton').addEventListener('click', doSearch);

    // Enter 搜尋（保留）
    document.getElementById('searchInput').addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        doSearch();
      }
    });

    // ⛳ **即時搜尋（輸入就自動搜尋）**
    document.getElementById('searchInput').addEventListener('input', doSearch);

  })
  .catch(err => {
    console.error('讀取題庫失敗：', err);
    document.getElementById('results').textContent = '資料讀取錯誤';
  });
