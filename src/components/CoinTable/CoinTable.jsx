import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinData } from "../../services/fetchCoinData";
import store from "../../state/store";

const currencySymbols = { usd: "$", gbp: "£", inr: "₹" };

const formatMarketCap = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  return num?.toLocaleString();
};

const CoinTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const currency = store((state) => state.currency);
  const symbol = currencySymbols[currency] || "$";

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["coins", page, currency],
    queryFn: () => fetchCoinData(page, currency),
    cacheTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.data,
    keepPreviousData: true,
  });

  if (isError) {
    return (
      <div className="w-full bg-[#0d1421] min-h-screen flex items-center justify-center p-6">
        <div className="bg-[#1a2332] border border-gray-700 rounded-2xl p-10 max-w-lg text-center shadow-xl">
          <div className="text-6xl mb-6">⏳</div>
          <h2 className="text-white text-2xl font-bold mb-3">
            Rate Limit Exceeded
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            Too many requests. Please try again in a few minutes.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0d1421] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Table Container */}
        <div className="overflow-hidden rounded-lg border border-gray-800">
          {/* Header */}
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a2332] text-gray-400 text-sm uppercase">
                <th className="text-left py-4 px-6 font-medium">#</th>
                <th className="text-left py-4 px-6 font-medium">Name</th>
                <th className="text-right py-4 px-6 font-medium">Price</th>
                <th className="text-right py-4 px-6 font-medium">24h %</th>
                <th className="text-right py-4 px-6 font-medium hidden md:table-cell">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching
                ? [...Array(10)].map((_, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-800 animate-pulse"
                    >
                      <td className="py-4 px-6">
                        <div className="h-4 w-6 bg-gray-700 rounded"></div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                          <div className="h-4 w-24 bg-gray-700 rounded"></div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="h-4 w-20 bg-gray-700 rounded ml-auto"></div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="h-4 w-16 bg-gray-700 rounded ml-auto"></div>
                      </td>
                      <td className="py-4 px-6 text-right hidden md:table-cell">
                        <div className="h-4 w-24 bg-gray-700 rounded ml-auto"></div>
                      </td>
                    </tr>
                  ))
                : data?.map((coin) => (
                    <tr
                      key={coin.id}
                      onClick={() => navigate(`/coin/${coin.id}`)}
                      className="border-t border-gray-800 hover:bg-[#1a2332] transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6 text-gray-500">
                        {coin.market_cap_rank}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-8 h-8 rounded-full"
                            loading="lazy"
                          />
                          <div>
                            <span className="text-white font-medium">
                              {coin.name}
                            </span>
                            <span className="text-gray-500 ml-2 text-sm uppercase">
                              {coin.symbol}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right text-white font-medium">
                        {symbol}
                        {coin.current_price?.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span
                          className={
                            coin.price_change_percentage_24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-gray-300 hidden md:table-cell">
                        {symbol}
                        {formatMarketCap(coin.market_cap)}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-5 py-2.5 bg-[#1a2332] text-white rounded-lg border border-gray-700 hover:bg-[#252f3f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>
          <span className="text-gray-400 font-medium">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2.5 bg-[#1a2332] text-white rounded-lg border border-gray-700 hover:bg-[#252f3f] transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinTable;
