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

// cleanText
export const cleanText = (text) => {
    // 연속된 두 개 이상의 공백을 찾기
    const regex = / {2,}/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
};