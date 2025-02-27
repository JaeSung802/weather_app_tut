export const setPlaceholderText = () => {
    const input = document.getElementById("searchBar__text");
    // 화면 400
    window.innerWidth < 400 
        ? (input.placeholder = "City, State, Country") 
        : (input.placeholder = "City, State, Country, or Zip Code");
};

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

export const displayApiError = (statusCode) => {
    const properMsg = toProperCase(statusCode.message);
    updateWeatherLocationHeader(properMsg);
    updateScreenReaderConfirmation(`${properMsg}. Please tyr again.`);
};

const toProperCase = (text) => {
    const words = text.split(" ");
    const properWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return properWords.join(" ");
};

const updateWeatherLocationHeader = (message) => {
    const h1 = document.getElementById("currentForecat__location");
    h1.textContent = message;
};

export const updateScreenReaderConfirmation = (message) => {
    // 어디에 있는지 선택
    document.getElementById("confirmation").textContent = message;
};

export const updateDisplay = (weatherJson, locationObj) => {
    fadeDisplay();
    clearDisplay();

    fadeDisplay();
};

const fadeDisplay = () => {
    const cc = document.getElementById("currentForecast");
    cc.classList.toggle("zero-vis");
    cc.classList.toggle("fade-in");
    const sixDay = document.getElementById("dailyForecast");
    sixDay.classList.toggle("zero-vis");
    sixDay.classList.toggle("fade-in");
};

const clearDisplay = () => {
    const currentConditions = document.getElementById("currentForecast__conditions");
    deleteContents(currentConditions);
    const sixDayForecast = document.getElementById("dailyForecast__contents");
    deleteContents(sixDayForecast);
};