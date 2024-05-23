import axios from 'axios';

export default axios.create({
    baseURL: 'https://beb8-109-185-76-100.ngrok-free.app',
    headers: { "ngrok-skip-browser-warning": "true" }
});
