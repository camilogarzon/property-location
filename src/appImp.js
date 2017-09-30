import api from './api/index.js';
import { required, numeric } from 'vuelidate/lib/validators'

export default {
    name: 'app',
    data () {
        return {
            currentProperty:{},
            form:{ show:false, title:'' },
            properties: [],
            markets: [],
            countries: [],
            lastId: 1,
            center: { lat: 40.7430775, lng: -73.9840752 },
            reportedCenter: { lat: 40.7430775, lng: -73.9840752 },
            mapBounds: {},
            clustering: true,
            scrollwheel: true,
            zoom: 12,
            gridSize: 50,
            mapType: 'terrain',
            markers: [],
            mapStyle: 'normal',
            infoMarker: {propertyName : '', propertyAddress : '', marketName : ''},
            infoWindowPos: { lat: 0, lng: 0 },
            infoWinOpen: false,
            currentInfoWindowId: null,
            infoOptions: {
                pixelOffset: {
                    width: 0,
                    height: -35
                }
            },
            showModal: false,
            toggleSort: true
        }
    },
    validations: {
        currentProperty: {
            name: { required },
            address1: { required },
            latitude: { required,
                isFloat (value) {
                    return !isNaN(parseFloat(value));
                }
            },
            longitude: { required,
                isFloat (value) {
                    return !isNaN(parseFloat(value));
                }
            },
            marketId: { required,
                isInt (value) {
                    return !isNaN(parseInt(value));
                }
            }
        }
    },
    mounted: function () {
        let self = this;
        api.getCountries()
            .then(function (countries) {
                self.countries = countries;
            });

        this.loadData();
    },

    computed: {
        activeMarkers() {
            return this.markers;
        }
    },

    methods: {
        newProperty: function() {
            return {
                id: 0,
                name: '',
                desks: null,
                Sf: null,
                address1: '',
                address2: '',
                city: '',
                state: '',
                postalCode: null,
                latitude: 0.0,
                longitude: 0.0,
                countryId: null,
                regionalCategory: null,
                marketId: null,
                submarketId: null,
                locationId: null
            };
        },
        copyProperty: function(property) {
            var copy = this.newProperty();
            for (var attr in property) {
                if (property.hasOwnProperty(attr)) copy[attr] = property[attr];
            }
            return copy;
        },
        loadData: function(){
            let self = this;
            api.getPropertiesWithMarkets()
                .then(function (properties) {
                    self.properties = properties;
                    self.properties.sort(self.sortDesc);
                    self.markers = [];
                    properties.forEach(function(property){
                        self.mapAddMarker(property);
                    });
                    self.markets = api.markets;
                });
        },
        mapAddMarker(property) {
            this.lastId++;
            const content = {propertyName : property.name, propertyAddress : property.address1, marketName : property.marketName};
            this.markers.push({
                id: this.lastId,
                position: {
                    lat: parseFloat(property.latitude),
                    lng: parseFloat(property.longitude)
                },
                opacity: 1,
                draggable: false,
                enabled: true,
                content: content,
                property: property
            });
            return this.markers[this.markers.length - 1];
        },
        mapRightClick(mouseArgs) {
            let p = this.newProperty();
            p.latitude = mouseArgs.latLng.lat();
            p.longitude = mouseArgs.latLng.lng();
            this.mapAddMarker(p);
            this.modalEditProperty(p, 'New Property');
        },
        toggleInfoWindow: function(marker) {
            this.infoWindowPos = marker.position;
            this.infoMarker = marker.content;
            this.showModal = true;

            if (this.currentInfoWindowId == marker.id) {
                this.infoWinOpen = !this.infoWinOpen;
            } else {
                this.infoWinOpen = true;
                this.currentInfoWindowId = marker.id;
            }
        },
        modalEditProperty: function(property, title = '') {
            this.currentProperty = this.copyProperty(property);
            this.form.show = true;
            this.form.title = (title == '') ? 'Edit Property' : title;
        },
        onSubmitForm: function(event, validator) {
            event.preventDefault();
            if(validator.currentProperty.$invalid) {
                return false;
            }

            let data = this.currentProperty;
            delete data.marketName;

            if(data.id > 0) {
                api.putProperty(data);
            } else {
                api.postProperty(data);
            }
            this.loadData();
            this.closeModal();
            return false;
        },
        closeInfoWindow: function() {
            this.infoWinOpen = false;
        },
        closeModal: function(event, i) {
            let markers = this.markers;
            for(let j in markers) {
                let marker = markers[j];
                if (marker.property.id == 0) {
                    markers.pop(j);
                }
            }

            if(event !== undefined) event.preventDefault();
            this.showModal = false;
            this.form.show = false;
            this.closeInfoWindow();
            return false;
        },
        update(field, event) {
            if (field === 'reportedCenter') {
                this.reportedCenter = {
                    lat: event.lat(),
                    lng: event.lng(),
                };
            } else if (field === 'bounds') {
                this.mapBounds = event;
            } else {
                this.$set(this, field, event);
            }
        },
        sortDesc: function(a,b) {
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return -1;
            return 0;
        },
        sortAsc: function(a,b) {
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return 1;
            return 0;
        },
        sortProperties: function(){
            let ps = this.properties;
            if (this.toggleSort){
                ps.sort(this.sortAsc);
            } else {
                ps.sort(this.sortDesc);
            }
            this.toggleSort = !this.toggleSort;
        }

    }
}