import { defineStore } from "pinia";
import axios from "axios";

export default defineStore ("auth", () => {
    async function login(credentials) {
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
            withCredentials: true,
        });
        await axios.post("http://127.0.0.1:8000/login", credentials, {
            withCredentials: true,
            headers: {
                Accept: "application/json",
                "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
            },
        });
    }
})
