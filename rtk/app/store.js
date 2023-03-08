const {configureStore} = require('@reduxjs/toolkit');
const videoReducer = require('../features/video/VideoSlice');

const {createLogger} = require('redux-logger');

const logger = createLogger();


const store = configureStore({
    reducer: {
        video: videoReducer,
       
    },
    middleware: (getDefaultMiddlewares)=>{
       return getDefaultMiddlewares().concat(logger)
    }
})

module.exports = store;