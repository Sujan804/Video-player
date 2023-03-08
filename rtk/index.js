const store = require('./app/store');
const { fetchvideos} = require('./features/video/VideoSlice')
store.subscribe(()=>{
    console.log("Manual Console to see Related videos:")
    console.log("Videos" ,store.getState().video.videos)
    console.log("Related Videos" ,store.getState().video.relatedVideos)

})
store.dispatch(fetchvideos())
