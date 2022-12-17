/* eslint-disable */
import Api from '@/services/Api'

export default {
    register (credentials) {
        return Api().post('register', credentials);
    },
    getInstrument (name) {
        return Api().get(`/getInstrument/${name}`);
    },
    setMusic(id, credentials) {
        return Api().post(`/setMusic/${id}`, credentials);
    },
    getMusics() {
        return Api().get(`/getMusic`);
    }
}
