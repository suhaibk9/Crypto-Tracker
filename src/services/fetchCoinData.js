import axiosInstance from "../helpers/axiosInstance";
import { COIN_GECKO_OBJ } from "../helpers/api";
export const fetchCoinData = async (
  page = 1,
  currency = "usd",
  perPage = 100,
  order = "market_cap_desc"
) => {
  try {
    const res = await axiosInstance.get(
      `${COIN_GECKO_OBJ.markets}?vs_currency=${currency}&page=${page}&per_page=${perPage}&order=${order}`
    );
    console.log("Response", res);
    return res;
  } catch (err) {
    const errorPayload = {
      code: err.code,
      status: err.response?.status ?? null,
      message: "Rate limit exceeded. Please try again in a few minutes.",
    };
    throw errorPayload;
  }
};
//?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h',
//order -market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc
