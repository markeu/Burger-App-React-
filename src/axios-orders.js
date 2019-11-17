import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-project-eb398.firebaseio.com/'
});

export default instance;