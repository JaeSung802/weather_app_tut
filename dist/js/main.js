import { 
    setLocationObject, 
    getHomeLocation, 
    getWeatherFromCoords, 
    getCoordsFromApi, 
    cleanText 
} from "./dataFunctions.js";
import { 
    setPlaceholderText, 
    addSpinner, 
    displayError, 
    displayApiError, 
    updateScreenReaderConfirmation 
} from "./domFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
const currentLoc = new CurrentLocation();

// init 정의하기
const initApp = () => {
    // add listeners
    // 지리적 위치
    const geoButton = document.getElementById("getLocation"); 
    geoButton.addEventListener("click", getGeoWeather);
    // home
    const homeButton = document.getElementById("home");
    homeButton.addEventListener("click", loadWeather);
    //save
    const saveButton = document.getElementById("saveLocation");
    saveButton.addEventListener("click", saveLocation);
    // unit
    const unitButton = document.getElementById("unit");
    unitButton.addEventListener("click", setUnitPref);
    //refresh
    const refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click", refreshWeather);
    // 위치 항목
    const locationEntry = document.getElementById("searchBar__form");
    locationEntry.addEventListener("submit", submitNewLocation);

    // set up
    setPlaceholderText();

    // load weather
    loadWeather();
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
        lon : position.coords.longitude, // 경도
        name : `Lat: ${position.coords.latitude} Long:${position.coords.longitude}`
    };
    // set location object(위치 설정)
    setLocationObject(currentLoc, myCoordsObj); // 우리가 정의한 현재 위치, 우리의 좌표
    // update data and display(데이터 및 디스플레이 업데이트)
    updateDataAndDisplay(currentLoc);
};

// 날씨 기능
const loadWeather = (event) => {
    // 우리의 위치나 즐겨찾는 곳을 저장
    const savedLocation = getHomeLocation();
    // 저장된 위치가 없는 경우와 이벤트가 전달되지 않았으면 지리적 날씨를 얻으세요.
    if (!savedLocation && !event) return getGeoWeather();
    // 저장된 위치가 없는 경우와 클릭해서 버튼이 있다는 것을 알 수 있는 경우우
    if (!savedLocation && !event.type === "click") {
        // displayError(오류 메시지, 화면 판독기용)
        displayError(
            "No Home Location Saved.",
            "Sorry. Please save your home location first."
        )
    } else if (savedLocation && !event) {   // 저장된 위치가 있고 이벤트가 없으면
        displayHomeLocationWeather(savedLocation); // 저장된 위치를 전달
    } else {
        const homeIcon = document.querySelector(".fa-home");
        addSpinner(homeIcon); // 
        displayHomeLocationWeather(savedLocation); // 위치를 표시
    }
};

// 홈 위치 날씨
const displayHomeLocationWeather = (home) => {
    // 로컬스토리지에서 유형을 확인
    if (typeof home === "string") {
        const locationJson = JSON.parse(home);
        const myCoordsObj = {
            lat: locationJson.lat,
            lon: locationJson.lon,
            name: locationJson.name,
            unit: locationJson.unit
        };
        // 설정한 위치 객체
        setLocationObject(currentLoc, myCoordsObj);
        updateDataAndDisplay(currentLoc);
    }
};

// 저장 위치 
const saveLocation = () => {
    // 현재 위치 경도, 위도 얻기기
    if (currentLoc.getLat && currentLoc.getLon()) {
        const saveIcon = document.querySelector(".fa-save");
        addSpinner(saveIcon);
        const location = {
            name: currentLoc.getName(),
            lat: currentLoc.getLat(),
            lon: currentLoc.getLon(),
            unit: currentLoc.getUnit()
        };
        // 로컬스토리지에 저장 -> 위치 객체를 전달
        localStorage.setItem("defaultWeatherLocation", JSON.stringify(location));
        // 업데이트 : 화면 판독기 확인
        updateScreenReaderConfirmation(
            `Save ${currentLoc.getName()} as home location.`
        );

    }

};

const setUnitPref = () => {
    const unitIcon = document.querySelector(".fa-chart-bar");
    addSpinner(unitIcon);
    currentLoc.toggleUnit();
    updateDataAndDisplay(currentLoc);
};

const refreshWeather = () => {
    const refreshIcon = document.querySelector(".fa-sync-alt");
    addSpinner(refreshIcon);
    updateDataAndDisplay(currentLoc);
};

const submitNewLocation = async (event) => {
    event.preventDefault();
    const text = document.getElementById("searchBar__text").value;
    const entryText = cleanText(text);
    if (!entryText.length) return;
    const locationIcon = document.querySelector(".fa-search");
    addSpinner(locationIcon);
    // 좌표함수
    const coordsData = await getCoordsFromApi(entryText, currentLoc.getUnit());
    if (coordsData) {
        if (coordsData.cod === 200) {
            // work with api data
            // success : http 200 : 성공 또는 실제 응답을 나타냄
            const myCoordsObj = {
                lat: coordsData.coord.lat,
                lon: coordsData.coord.lon,
                name: coordsData.sys.country 
                    ? `${coordsData.name}, ${coordsData.sys.country}` 
                    : coordsData.name
            };
            setLocationObject(currentLoc, myCoordsObj);
            updateDataAndDisplay(currentLoc);
        } else {
            displayApiError(coordsData);
        }
    } else {
        displayError("Connection Error", "Connection Error");
    }
};

// 디스플레이에 업데이트를 호출하여 라우터나 컨트롤러와 비슷한 종류
const updateDataAndDisplay = async (locationObj) => {
    const weatherJson = await getWeatherFromCoords(locationObj);
    console.log(weatherJson);
    // if (weatherJson) updateDisplay(weatherJson, locationObj);
};