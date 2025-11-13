fetch('data.json')
  .then(response => response.json())
  .then(data => {

    function doSearch() {
      const keyword = document.getElementById('searchInput').value.trim();
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      if (!keyword) {
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

    document.getElementById('searchButton').addEventListener('click', doSearch);

    document.getElementById('searchInput').addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        doSearch();
      }
    });

    document.getElementById('searchInput').addEventListener('input', doSearch);

  })
  .catch(err => {
    document.getElementById('results').textContent = '資料讀取錯誤';
  });

document.getElementById("reportOpen").addEventListener("click", () => {
    const box = document.getElementById("reportBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
});
