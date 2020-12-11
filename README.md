# togetherfrontend

> SJTU BPM Course Project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Switch Backend to Cloud Server
Change `target` in `config/index.js` :
```
target: 'http://localhost:8443',
```

And change `axios.defaults.baseURL` in `main.js` :
```
axios.defaults.baseURL = 'http://localhost:8443/api'
```
