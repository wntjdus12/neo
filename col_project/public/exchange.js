let chartInstance = null;

document
  .getElementById("exchange-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const gifDiv = document.getElementById("loading-gif");
    gifDiv.style.display = "none";

    const originLeft = document.querySelector(".left-origin");
    originLeft.classList.add("noshow");

    const country = document.getElementById("country-exchange").value;

    const resultDiv = document.getElementById("result-exchange");
    const exchangeChartDiv = document.getElementById("exchange-chart");

    exchangeChartDiv.style.display = "none";

    fetch(`/rcurrent_exchange_rate?country=${country}`)
      .then((res) => res.json())
      .then((data) => {
        const resultDiv = document.getElementById("result-exchange");

        if (data.error) {
          resultDiv.innerHTML = `<p style="color:white;"><span style="color:red; font-weight: 800; font-size:30px">
          ${data.error}</span> <span style="font-size:20px">
          에 해당하는 데이터가 업숴😡😱!!!!</span></p>`;
          gifDiv.style.display = "block";
          return;
        }

        const current_rate = parseFloat(data["환율"]); // ✅ 현재 환율 저장
        const currency_code = data["통화코드"];
        const date = data["날짜"];
        const formattedDate = date
          ? `${date.slice(0, 4)}. ${date.slice(4, 6)}. ${date.slice(6)}일`
          : "";

        resultDiv.innerHTML = `
          <div>
            <h2 style="font-weight: 800; font-size: 40px">${formattedDate} </h2>
          </div>
          <p style="font-size:30px">  <span style="color:#a4d6cc; font-weight: 800">${country}</span>의 환율은 <span style="color:#a4d6cc; font-weight: 800">${current_rate} ${currency_code}</span>입니다.</p>
          <p>📊 최근 환율 정보!!!</p>
        `;

        // ✅ 과거 환율 데이터와 차트 생성
        return fetch(`/rexchange_rate?country=${country}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
              return;
            }

            const labels = data.labels.map(
              (d) =>
                `${d.slice(0, 4)}.${d.slice(4, 6).padStart(2, "0")}.${d
                  .slice(6)
                  .padStart(2, "0")}`
            );

            const datasets = data.datasets;

            // ✅ 현재 환율 기준선 추가
            datasets.push({
              label: "현재 환율",
              data: new Array(labels.length).fill(current_rate),
              borderColor: "#36a2eb",
              borderWidth: 2,
              borderDash: [5, 5],
              pointRadius: 0,
            });

            const ctx = document
              .getElementById("exchange-chart")
              .getContext("2d");

            if (chartInstance) {
              chartInstance.destroy();
            }

            chartInstance = new Chart(ctx, {
              type: "line",
              data: {
                labels: labels,
                datasets: datasets,
              },
              options: {
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: false,
                  },
                },
                plugins: {
                  backgroundColorPlugin: true,
                },
              },
              plugins: [
                {
                  id: "backgroundColorPlugin",
                  beforeDraw: function (chart) {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.fillStyle = "#f0f8ff"; // 배경색 설정
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                  },
                },
              ],
            });

            // 차트 생성 후 GIF 숨기기
            gifDiv.style.display = "none";
            exchangeChartDiv.style.display = "block";
          });
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        document.getElementById("result-exchange").innerHTML =
          "<p style='color:red;'>❌ 오류가 발생했습니다.</p>";
        gifDiv.style.display = "none"; // 오류시 GIF 숨기기
      });
  });

fetch("/api/all_exchange")
  .then((response) => response.json()) // 응답을 JSON으로 파싱
  .then((data) => {
    const container = document.getElementById("data-container"); // 데이터를 넣을 div

    if (!container) {
      console.error("data-container element not found.");
      return;
    }

    let content = ""; // HTML 문자열을 저장할 변수

    // 데이터를 하나씩 돌면서 card-content에 넣기
    data.forEach((item) => {
      content += `
        <div class="card-content">
          <p style="font-size: 20px; margin-right:10px;">${item.emoji} ${item.code} </p>
          <p style="font-size: 18px;">${item.exchange_rate}</p>
        </div>
      `;
    });

    // 한 번에 innerHTML로 삽입
    container.innerHTML = content;

    // 👇 슬라이드 기능
    const visibleCount = 3;
    const itemHeight = 32; // card-content의 높이
    let index = 0;

    setInterval(() => {
      index += visibleCount;
      if (index >= data.length) index = 0;
      container.style.transform = `translateY(-${index * itemHeight}px)`;
    }, 3000);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
