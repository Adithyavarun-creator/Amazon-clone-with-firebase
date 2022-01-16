import axios from "axios";


const instance = axios.create({
    baseURL:'https://us-central1-second-clone-847fb.cloudfunctions.net/api'
    // baseURL : 'http://localhost:5001/second-clone-847fb/us-central1/api'  //the API here
})

// Example Endpoint =  http://localhost:5001/second-clone-847fb/us-central1/api
//above link shows hello world


//https://us-central1-second-clone-847fb.cloudfunctions.net/api
//the above link is from firebase
export default instance