import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.API_URL_MAIN,
    headers: { "Content-Type": "application/json" }
});

export const admin_api = axios.create({
    baseURL: import.meta.env.API_URL_ADMIN,
    headers: { "Content-Type": "application/json" }
})


