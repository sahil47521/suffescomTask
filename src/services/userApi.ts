import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async (page: number) => {
    const res = await axios.get(`${BASE_URL}/users?_page=${page}&_limit=5`);
    return res.data;
}