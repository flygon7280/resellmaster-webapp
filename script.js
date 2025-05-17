async function analyze() {
    const sku = document.getElementById("skuInput").value.trim();
    const cost = parseInt(document.getElementById("costInput").value.trim());
    const resultBox = document.getElementById("resultBox");

    if (!sku || isNaN(cost)) {
        resultBox.textContent = "❗ SKU와 국내가를 모두 입력해주세요.";
        return;
    }

    try {
        const response = await fetch("api/data.json");
        const data = await response.json();
        const item = data[sku];

        if (!item) {
            resultBox.textContent = "❗ 해당 SKU 정보가 없습니다.";
            return;
        }

        const price = item.price;
        const volume = item.volume;
        const fee = Math.round(price * 0.12 + 18000);
        const profit = price - fee - cost;

        resultBox.innerHTML =
            `[📦 SKU] ${sku}\n` +
            `[🧾 30일 판매량] ${volume}건\n` +
            `[💵 평균 판매가] ${price.toLocaleString()}원\n` +
            `[📉 예상 수수료+배송비] 약 ${fee.toLocaleString()}원\n` +
            `[💰 순수익 추정] 약 ${profit.toLocaleString()}원\n` +
            `[🗓 최근 업데이트] 2025-05-17`;
    } catch (error) {
        resultBox.textContent = "❗ 오류 발생: " + error.message;
    }
}