// 현재 위치 생성자
export default class CurrentLocation {
    constructor() {
        this._name = "Current Location";    // 현재 위치 이름
        this._lat = null;   // 위도
        this._lon = null;   // 경도
        this._unit = "imperial";    // 단위
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    getLat() {
        return this._lat;
    }

    setLat(lat) {
        this._lat = lat;
    }

    getLon() {
        return this._lon;
    }

    setLon(lon) {
        this._lon = lon;
    }

    getUnit() {
        return this._unit;
    }

    setUnit(unit) {
        this._unit = unit
    }

    // 단위 바꾸기
    toggleUnit() {
        this._unit = this._unit === "imperial" ? "metric" : "imperial";
    }
}