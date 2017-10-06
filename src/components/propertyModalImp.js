import Modal from './shared/modal.vue'

export default {
    props:{
        form: {type:Object, required:true},
        currentProperty: {type:Object, required:true},
        validator: {type:Object, required:true},
        markets: {type:Array, required:true},
        countries: {type:Array, required:true}
    },
    components: { Modal }
}