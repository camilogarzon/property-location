<template>
    <modal v-if="showModal">
        <h3 slot="header">Property Selected</h3>
        <div class="modal-form" slot="body" v-model="infoMarker">
            <div class="form-field">
                <div class="label">Name:</div>
                <div class="form-input">{{ infoMarker.propertyName }}</div>
            </div>
            <div class="form-field">
                <div class="label">Address:</div>
                <div class="form-input">{{ infoMarker.propertyAddress }}</div>
            </div>
            <div class="form-field">
                <div class="label">Market:</div>
                <div class="form-input">{{ infoMarker.marketName }}</div>
            </div>
            <div class="form-actions">
                <button class="btn btn-close" @click="$emit('closeModal')" >CLOSE</button>
            </div>
        </div>
    </modal>
</template>

<script src="./infoModalImp.js"></script>
<style lang="scss"> @import "../scss/components/_infoModal.scss"; </style>