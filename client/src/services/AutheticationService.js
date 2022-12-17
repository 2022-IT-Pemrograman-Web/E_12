/* eslint-disable */
import Api from '@/services/Api'

export default {
    register (credentials) {
        return Api().post('register', credentials);
    },
    getInstrument (name) {
        return Api().get(`/getInstrument/${name}`);
    },
    getMusics() {
        return Api().get(`/getMusics`);
    },
    createMusic(credentials) {
        return Api().post(`/createMusic`, credentials);
    },
    editMusic(id, credentials) {
        return Api().post(`/editMusic/${id}`, credentials);
    },
}
