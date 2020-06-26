import axios, { AxiosInstance } from "axios";

class PizzaService {
    url: string;
    instanse: AxiosInstance;
    constructor() {
        this.url = "http://localhost:4000";
        this.instanse = axios.create({ baseURL: this.url });
    }

    getPizza = async () => {
        const response = await this.instanse.get("/pizzas");
        return response.data;
    };
}

export default new PizzaService();
