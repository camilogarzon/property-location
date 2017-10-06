# Property Location

Simple javascript application that handles property locations.

## Installation

### JSON Server

This application use [`json-server`](https://github.com/typicode/json-server) to get a full fake REST API. Clone and install [this repo](https://github.com/camilogarzon/json-server-heroku) to use the same json-server used by this app, deployed to Heroku.

#### Instructions
1 . Go to json-server folder
```sh
$ cd /path/to/json-server-heroku
```
2 . Install dependencies 
```sh
$ npm install
```
3 . Start the server
```sh
$ npm run start
```
4 . Server is running at [`http://localhost:3000/`](http://localhost:3000/)

#### Configuration

Change [`db.json`](https://github.com/camilogarzon/json-server-heroku/blob/master/db.json) to **your own content** according to the [`json-server example`](https://github.com/typicode/json-server#example), then restart the server.

### Javascript Application

This application use [Vue.js](https://vuejs.org/v2/guide/). Clone this repo to anywhere on your computer.


#### Instructions
1 . Go to project folder
```sh
$ cd /path/to/property-location
```
2 . Install dependencies 
```sh
$ npm install
```
3 . Start the server under dev mode
```sh
$ npm run dev
```
4 . Project is running at [`http://localhost:8080/`](http://localhost:8080/)

#### Configuration

Update the file [`src/config.js`](https://github.com/camilogarzon/property-location/blob/master/src/config.js) with your environment values:

```javascript
export default {
    apiUrl : 'http://localhost:3000',
    googleMapsKey: 'YOUR-API-KEY'
}
```

## Demo
Here is a demo hosted in GitHub Pages: https://camilogarzon.github.io/property-location/


#### Notes

This application is hosted in GitHub Pages, for this reason the build folder `dist` and the config file `config.js` were included in this repo.

