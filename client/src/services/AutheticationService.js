/* eslint-disable */
import Api from '@/services/Api'

export default {
    register (credentials) {
        return Api().post('register', credentials);
    },
    getInstrument (name) {
        return Api().get(`/getInstrument/${name}`);
    },
    getInstruments(){
        return Api().get(`/getInstruments`);
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
    deleteMusic(id) {
        return Api().post(`/deleteMusic/${id}`);
    },
    receive(credentials) {
        return Api().post(`/receive`, credentials);
    }
}
