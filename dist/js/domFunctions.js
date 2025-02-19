export const addSpinner = (element) => {
    // 애니메이트 버튼
    animateButton(element);
    setTimeout(animateButton, 1000, element);
};

const animateButton = (element) => {
    element.classList.toggle("none");
    element.nextElementSibling.classList.toggle("block");
    element.nextElementSibling.classList.toggle("none");
};

// 디스플레이 오류 (헤더 메시지, 화면에서 받는 독자 메시지지)
export const displayError = (headermsg, srMsg) => {
    // 날씨 위치 헤더 메시지 업데이트
    updateWeatherLocationHeader(headermsg);
    // 화면 판독기 확인 업데이트
    updateScreenReaderConfirmation(srMsg);
};

const updateWeatherLocationHeader = (message) => {
    const h1 = document.getElementById("currentForecat__location");
    h1.textContent = message;
};

const updateScreenReaderConfirmation = (message) => {
    // 어디에 있는지 선택
    document.getElementById("confirmation").textContent = message;
};