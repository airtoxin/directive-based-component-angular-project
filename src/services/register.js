export class SampleRegisterService {
    constructor($cookies) {
        this._$cookies = $cookies;
    }

    regist(...values) {
        this._$cookies.put("values", values);
    }

    get() {
        return this._$cookies.get("values");
    }

    deregist() {
        this._$cookies.remove("values");
    }
}

export default ["$cookies", SampleRegisterService];
