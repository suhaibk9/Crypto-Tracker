import axiosInstance from "../helpers/axiosInstance";
import { COIN_GECKO_OBJ } from "../helpers/api";

export const fetchCoinDetail = async (coinId) => {
  try {
    const res = await axiosInstance.get(
      `${COIN_GECKO_OBJ.coinDetail}/${coinId}`
    );
    return res.data;
  } catch (err) {
    const errorPayload = {
      code: err.code,
      status: err.response?.status ?? null,
      message: "Rate limit exceeded. Please try again in a few minutes.",
    };
    throw errorPayload;
  }
};
