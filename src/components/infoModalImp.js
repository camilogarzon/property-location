import Modal from './shared/modal.vue'

export default {
    props:{
        showModal: {type:Boolean, required:true},
        infoMarker: {type:Object, required:true}
    },
    components: { Modal }
}