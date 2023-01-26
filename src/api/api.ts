import axios from "axios";
import { QuestionData } from "../types/question-data.type";
import { DATA_ENDPOINT } from "./consts";

export class ApiService {
    async getQuestion(): Promise<QuestionData | undefined> {
        try {
            const response = await axios.get(DATA_ENDPOINT);
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

export const apiService = new ApiService()