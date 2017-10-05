<template>
    <modal v-if="form.show">
        <h3 slot="header">{{ form.title }}</h3>
        <div class="modal-form" slot="body">
            <form method="POST" @submit="$emit('onSubmitForm', $event)">
                <div class="form-field">
                    <div class="label">Name:</div>
                    <div class="form-input" v-bind:class="{ 'field-error': validator.currentProperty.name.$error }">
                        <input v-model.trim="currentProperty.name">
                        <span v-if="validator.currentProperty.$error && !validator.currentProperty.name.required">Name is required.</span>
                    </div>
                </div>

                <div class="form-field">
                    <div class="label">Address:</div>
                    <div class="form-input" v-bind:class="{ 'field-error': validator.currentProperty.address1.$error }">
                        <input type="text" v-model.trim="currentProperty.address1">
                        <span v-if="validator.currentProperty.$error && !validator.currentProperty.address1.required">Address is required.</span>
                    </div>
                </div>
                <div class="form-field">
                    <div class="label">Market:</div>
                    <div class="form-input" v-bind:class="{ 'field-error': validator.currentProperty.marketId.$error }">
                        <select v-model="currentProperty.marketId">
                            <option v-for="market in markets" :value="market.id">{{ market.name }}</option>
                        </select>
                        <span v-if="validator.currentProperty.$error && !validator.currentProperty.marketId.isInt">Market is required.</span>
                    </div>
                </div>
                <div class="form-field">
                    <div class="label">Country:</div>
                    <div class="form-input">
                        <select v-model="currentProperty.countryId">
                            <option v-for="country in countries" :value="country.id">{{ country.shortName }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-field">
                    <div class="label">Latitude:</div>
                    <div class="form-input" v-bind:class="{ 'field-error': validator.currentProperty.latitude.$error }">
                        <input type="text" v-model.trim="currentProperty.latitude">
                        <span v-if="validator.currentProperty.$error && !validator.currentProperty.latitude.isFloat">Latitude is required.</span>
                    </div>
                </div>
                <div class="form-field">
                    <div class="label">Longitude:</div>
                    <div class="form-input" v-bind:class="{ 'field-error': validator.currentProperty.longitude.$error }">
                        <input type="text" v-model.trim="currentProperty.longitude">
                        <span v-if="validator.currentProperty.$error && !validator.currentProperty.longitude.isFloat">Longitude is required.</span>
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn btn-save" v-on:mouseover="validator.currentProperty.$touch">SAVE</button>
                    <button class="btn btn-cancel" v-on:mouseover="validator.currentProperty.$reset"
                            @click="$emit('closeModal')">CANCEL
                    </button>
                </div>
            </form>
        </div>
    </modal>
</template>

<script>
    import Modal from './modal.vue'

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
</script>
