import axios from "axios";
import { base_url } from "../apiConfig";


const createStripeSession = async (productRequest: any) => {
  return axios.post(`${base_url}/product/v1/checkout`, productRequest);
};

const verifyStripeSession = async (sessionId: string) => {
  return axios.get(`${base_url}/product/v1/checkout/session/${sessionId}`);
};

export {createStripeSession,verifyStripeSession};