<template>
    <div id="app">

        <info-modal
                :infoMarker="infoMarker"
                :showModal="showModal"
                @closeModal="closeModal($event,infoMarker.id)" >
        </info-modal>

        <property-modal
                :currentProperty="currentProperty"
                :form="form"
                :validator="$v"
                :markets="markets"
                :countries="countries"
                @onSubmitForm="onSubmitForm($event, $v)"
                @closeModal="closeModal($event,currentProperty.id)" >
        </property-modal>

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

        <property-table
                :properties="properties"
                @sortProperties="sortProperties"
                @editProperty="modalEditProperty($event)">
        </property-table>

    </div>

</template>

<script src="./appImp.js"></script>
<style lang="scss"> @import "./scss/_app.scss"; </style>