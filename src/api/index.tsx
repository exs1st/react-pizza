import axios, { AxiosInstance } from "axios";

class PizzaService {
    url: string;
    instanse: AxiosInstance;
    constructor() {
        this.url =
            process.env.NODE_ENV !== "production"
                ? "http://localhost:4000"
                : "/db";
        this.instanse = axios.create({ baseURL: this.url });
    }

    getPizza = async () => {
        const response = await this.instanse.get("/pizzas");
        return response.data;
    };

    getOnePizza = async (id: number) => {
        const response = await this.instanse.get(`/pizzas/${id}`);
        return response.data;
    };
}

export default new PizzaService();
