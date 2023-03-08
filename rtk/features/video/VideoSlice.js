const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');
// const fetch = require("node-fetch");
const axios = require('axios')
const initialState = {
    loading: false,
    videos: [],
    relatedVideos: [],
    error: ""
}

const fetchVideos = createAsyncThunk("post/fetchVideos", async ()=>{
    const response = await axios.get("http://localhost:9000/videos")

    const tags = response.data.tags
    let url = "http://localhost:9000/videos?"
    let tagsSize = tags.length
    for(let i=0;i<tagsSize-1;i++){
        url += `tags_like=${tags[i]}&`
    }
    url += `tags_like=${tags[tagsSize-1]}`

    //Fetching Related Videos
    const relatedRes = await axios.get(url)
    const newRelatedVideos = relatedRes.data;

    //Sorting Related Videos
  
    newRelatedVideos.sort((a,b)=>(a.views>=b.views? -1: 1))
   

    return {
        video: response.data,
        relatedVideos: newRelatedVideos
    }
})

const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(fetchVideos.pending, (state, action)=>{
            state.loading = true,
            state.error = ""
        })
        builder.addCase(fetchVideos.fulfilled, (state, action)=>{
            state.loading = false,
            state.error = "",
            state.videos = action.payload.video
            state.relatedVideos = action.payload.relatedVideos
        })
        builder.addCase(fetchVideos.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.error.message
            state.videos = []
        })
    }
})
module.exports = videoSlice.reducer;
module.exports.fetchvideos = fetchVideos;