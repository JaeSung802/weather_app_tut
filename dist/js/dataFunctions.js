const WEATHER_API_KEY = '03f71ee925e984415939f2b7b6a983b3';

// 위치 객체 설정
export const setLocationObject = (locationObj, coordsObj) => { // 위치 객체, 브라우저의 지리적 위치
    const { lat, lon, name, unit } = coordsObj;
    // 호출
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
        locationObj.setUnit(unit);
    }
};

// 홈 위치
export const getHomeLocation = () => {
    // 로컬에서 홈 위치를 가져옮, 보관이 가능하니 우리가 해야 할 일은 반환하는 것뿐
    return localStorage.getItem("defaultWeatherLocation"); // 기본 날씨 찾기
};

export const getWeatherFromCoords = async (locationObj) => {
    const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const units = locationObj.getUnit();
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        console.error(err);
    }
};

// API에서 코드를 가져오기(검색할 단어, 단위)
export const getCoordsFromApi = async (entryText, units) => {
    const regex = /^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q"; // 우편번호
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
    const encodedUrl = encodeURI(url); // 인코딩 URL
    try {
        const dataStream = await fetch(encodedUrl);
        const jsonData = await dataStream.json();
        console.log(jsonData)
        return jsonData;
    } catch (err) {
        console.log(err.stack);
    }
};

// cleanText
export const cleanText = (text) => {
    // 연속된 두 개 이상의 공백을 찾기
    const regex = / {2,}/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
};