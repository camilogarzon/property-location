<template>
    <div class="data-table">
        <table class="grid">
            <tr class="row">
                <th>ID</th>
                <th><a class="link-name" @click="$emit('sortProperties')">Name</a></th>
                <th>Address</th>
                <th>Market</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Actions</th>
            </tr>
            <tr v-for="p in properties" class="row">
                <td>{{ p.id }}</td>
                <td><a class="link-name" @click="$emit('editProperty', p)">{{ p.name }}</a></td>
                <td>{{ p.address1 }}</td>
                <td>{{ p.marketName }}</td>
                <td>{{ p.latitude }}</td>
                <td>{{ p.longitude }}</td>
                <td>
                    <button class="btn btn-edit" @click="$emit('editProperty', p)">EDIT</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script src="./propertyTableImp.js"></script>
<style lang="scss"> @import "../scss/components/_propertyTable.scss"; </style>