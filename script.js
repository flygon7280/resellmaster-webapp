async function analyze() {
  const sku = document.getElementById("skuInput").value.trim().toUpperCase();
  const resultBox = document.getElementById("resultBox");
  resultBox.textContent = "분석 중...";

  try {
    const response = await fetch('./api/data.json');
    const data = await response.json();
    if (data[sku]) {
      const item = data[sku];
      const margin = item.price - 18000 - (item.price * 0.12);
      resultBox.textContent = `
[SKU] ${sku}
[30일 판매량] ${item.volume}건
[평균 판매가] $${item.price.toLocaleString()}
[예상 수수료+배송비] 약 $${(item.price * 0.12 + 18000).toLocaleString()}
[순수익 추정] 약 $${margin.toFixed(2)}
[최근 업데이트] ${item.lastUpdated || "알 수 없음"}
      `;
    } else {
      resultBox.textContent = "해당 SKU는 데이터베이스에 없습니다.";
    }
  } catch (e) {
    resultBox.textContent = "분석 중 오류 발생.";
  }
}