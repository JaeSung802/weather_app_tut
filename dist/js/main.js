import { addSpinner, displayError } from "./domFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
const currentLoc = new CurrentLocation();

// init 정의하기
const initApp = () => {
    // add listeners
    const geoButton = document.getElementById("getLocation"); // 지리적 위치
    geoButton.addEventListener("click", getGeoWeather);
    // set up

    // load weather
};

// 앱 로드 후 생성
document.addEventListener("DOMContentLoaded", initApp);

// 날씨 함수
const getGeoWeather = (event) => {
    if (event) {
        if (event.type === "click") {
            const mapIcon = document.querySelector(".fa-map-marker-alt"); // 맵 아이콘
            addSpinner(mapIcon); // 지도를 전달
        }
    }
    // 네비게이터 지리적 함수
    if (!navigator.geolocation) return geoError(); // 실패 : geo 에러 호출
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError); // 성공 : 지리적 위치 가져오기
}

// 오류 함수
const geoError = (errObj) => {
    // 오류 메시지지
    const errMsg = errObj ? errObj.message : "Geolocation not supported";
    // 디스플레이 오류 기능
    displayError(errMsg, errMsg);

}

// 위치 함수(위치값 전달)
const geoSuccess = (position) => {
    // 좌표 객체에 대한 코드
    const myCoordsObj = {
        lat : position.coords.latitude, // 위도
        lon : position.coords.longitute, // 경도
        name : `Lat: ${position.coords.latitude} Long:${position.coords.longitute}`
    };
    // set location object(위치 설정)
    // update data and display(데이터 및 디스플레이 업데이트)
};