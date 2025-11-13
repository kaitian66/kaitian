fetch('data.json')
  .then(response => response.json())
  .then(data => {

    // 專門的搜尋函式（滑鼠按鈕 & ENTER 都會用到）
    function doSearch() {
      const keyword = document.getElementById('searchInput').value.trim();
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // 清空之前結果

      if (!keyword) {
        resultsDiv.textContent = '請輸入搜尋關鍵字。';
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

    // 點擊按鈕搜尋
    document.getElementById('searchButton').addEventListener('click', doSearch);

    // 按 Enter 觸發搜尋
    document.getElementById('searchInput').addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // 防止預設提交
        doSearch(); // 執行搜尋
      }
    });

  })
  .catch(err => {
    console.error('讀取題庫失敗：', err);
    document.getElementById('results').textContent = '資料讀取錯誤';
  });
