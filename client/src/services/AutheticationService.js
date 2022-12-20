/* eslint-disable */
import Api from '@/services/Api'

export default {
    getInstrument (name) {
        return Api().get(`/getInstrument/${name}`);
    },
    createInstrument(credentials) {
        return Api().post(`/createInstrument`, credentials);
    },

    getMusics() {
        return Api().get(`/getMusic`);
    },
    createMusic(credentials) {
        return Api().post(`/createMusic`, credentials);
    },
    editMusic(id, credentials) {
        return Api().post(`/editMusic/${id}`, credentials);
    },
    deleteMusic(id) {
        return Api().post(`/deleteMusic/${id}`);
    }
}
