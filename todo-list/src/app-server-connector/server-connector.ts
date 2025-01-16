import axios from 'axios';
import { environment } from '../environment';

export const instance = axios.create({
    baseURL: environment["BACKEND_URL"],
    timeout: 2000,
});