<template>
    <div id="app">

        <script type="text/x-template" id="modal-template">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">
                            <div class="modal-header">
                                <slot name="header"></slot>
                            </div>
                            <div class="modal-body">
                                <slot name="body"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </script>

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
                    <button class="btn btn-close" @click="closeModal($event, infoMarker.id)">CLOSE</button>
                </div>
            </div>
        </modal>

        <modal v-if="form.show">
            <h3 slot="header">{{ form.title }}</h3>
            <div class="modal-form" slot="body">
                <form method="POST" @submit="onSubmitForm($event, $v)">
                    <div class="form-field">
                        <div class="label">Name:</div>
                        <div class="form-input" v-bind:class="{ 'field-error': $v.currentProperty.name.$error }">
                            <input v-model.trim="currentProperty.name">
                            <span v-if="$v.currentProperty.$error && !$v.currentProperty.name.required">Name is required.</span>
                        </div>
                    </div>

                    <div class="form-field">
                        <div class="label">Address:</div>
                        <div class="form-input" v-bind:class="{ 'field-error': $v.currentProperty.address1.$error }">
                            <input type="text" v-model.trim="currentProperty.address1">
                            <span v-if="$v.currentProperty.$error && !$v.currentProperty.address1.required">Address is required.</span>
                        </div>
                    </div>
                    <div class="form-field">
                        <div class="label">Market:</div>
                        <div class="form-input" v-bind:class="{ 'field-error': $v.currentProperty.marketId.$error }">
                            <select v-model="currentProperty.marketId">
                                <option v-for="market in markets" :value="market.id">{{ market.name }}</option>
                            </select>
                            <span v-if="$v.currentProperty.$error && !$v.currentProperty.marketId.isInt">Market is required.</span>
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
                        <div class="form-input" v-bind:class="{ 'field-error': $v.currentProperty.latitude.$error }">
                            <input type="text" v-model.trim="currentProperty.latitude">
                            <span v-if="$v.currentProperty.$error && !$v.currentProperty.latitude.isFloat">Latitude is required.</span>
                        </div>
                    </div>
                    <div class="form-field">
                        <div class="label">Longitude:</div>
                        <div class="form-input" v-bind:class="{ 'field-error': $v.currentProperty.longitude.$error }">
                            <input type="text" v-model.trim="currentProperty.longitude">
                            <span v-if="$v.currentProperty.$error && !$v.currentProperty.longitude.isFloat">Longitude is required.</span>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-save" v-on:mouseover="$v.currentProperty.$touch">SAVE</button>
                        <button class="btn btn-cancel" v-on:mouseover="$v.currentProperty.$reset"
                                @click="closeModal($event, currentProperty.id)">CANCEL
                        </button>
                    </div>
                </form>
            </div>
        </modal>

        <div class="app-panel">

            <div class="panel-left">

                <div><h1>Property Locations</h1></div>
                <div>
                    <p>To <b>add</b> a property, do right click on the <b>map</b>.</p>
                    <p>To <b>edit</b> a property, do right click on the <span style="color:#f75c52;">red marker</span> .</p>
                </div>
            </div>
            <div class="panel-right">
                <gmap-map class="map-panel"
                          :options="{ scrollwheel: scrollwheel}" :center="center" :zoom="zoom" :map-type-id="mapType"
                          @rightclick="mapRightClick"
                          @zoom_changed="update('zoom', $event)"
                          @center_changed="update('reportedCenter', $event)"
                          @maptypeid_changed="update('mapType', $event)"
                          @bounds_changed="update('bounds', $event)">
                    <gmap-info-window :opened="infoWinOpen" :options="infoOptions" :position="infoWindowPos"
                                      @closeclick="closeInfoWindow()">
                        <div style="text-align: left">
                            <p><b>Name:</b> {{ infoMarker.propertyName }}</p>
                        </div>
                    </gmap-info-window>
                    <gmap-cluster :grid-size="gridSize" v-if="clustering">
                        <gmap-marker :key="m.id" :clickable="true" :position="m.position" :opacity="m.opacity"
                                     :draggable="m.draggable"
                                     v-if="m.enabled" v-for="m in activeMarkers"
                                     @click="toggleInfoWindow(m)" @rightclick="modalEditProperty(m.property)">
                        </gmap-marker>
                    </gmap-cluster>
                </gmap-map>
            </div>

        </div>

        <div class="data-table">
            <table class="table">
                <tr class="row">
                    <th>ID</th>
                    <th><a class="link-name" @click="sortProperties">Name</a></th>
                    <th>Address</th>
                    <th>Market</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="p in properties" class="row">
                    <td>{{ p.id }}</td>
                    <td><a class="link-name" @click="modalEditProperty(p)">{{ p.name }}</a></td>
                    <td>{{ p.address1 }}</td>
                    <td>{{ p.marketName }}</td>
                    <td>{{ p.latitude }}</td>
                    <td>{{ p.longitude }}</td>
                    <td>
                        <button class="btn btn-edit" @click="modalEditProperty(p)">EDIT</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script src="./appImp.js"></script>
<style> @import "./assets/css/main.css"; </style>