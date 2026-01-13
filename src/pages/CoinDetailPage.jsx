import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetail } from "../services/fetchCoinDetail";
import store from "../state/store";
import parse from "html-react-parser";
import Loader from "../components/Loader/Loader";

const currencySymbols = { usd: "$", gbp: "£", inr: "₹" };

const CoinDetailPage = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const currency = store((state) => state.currency);
  const symbol = currencySymbols[currency] || "$";

  const {
    data: coin,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coinDetail", coinId],
    queryFn: () => fetchCoinDetail(coinId),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#0d1421] flex items-center justify-center p-6">
        <div className="bg-[#1a2332] border border-gray-700 rounded-2xl p-10 max-w-lg text-center shadow-xl">
          <div className="text-6xl mb-6">⏳</div>
          <h2 className="text-white text-2xl font-bold mb-3">
            Rate Limit Exceeded
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            Too many requests. Please try again in a few minutes.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const marketData = coin?.market_data?.current_price;
  const price = marketData?.[currency] || marketData?.usd;

  return (
    <div className="min-h-screen bg-[#0d1421] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={coin.image?.large}
            alt={coin.name}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-4xl font-bold">{coin.name}</h1>
            <span className="text-gray-400 text-xl uppercase">
              {coin.symbol}
            </span>
            {coin.market_cap_rank && (
              <span className="ml-4 bg-gray-700 px-3 py-1 rounded-full text-sm">
                Rank #{coin.market_cap_rank}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="bg-[#1a2332] rounded-lg p-6 mb-6">
          <h2 className="text-gray-400 text-sm mb-2">Current Price</h2>
          <div className="text-4xl font-bold">
            {symbol}
            {price?.toLocaleString()}
          </div>
          {coin.market_data?.price_change_percentage_24h && (
            <span
              className={`text-lg ${
                coin.market_data.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {coin.market_data.price_change_percentage_24h >= 0 ? "+" : ""}
              {coin.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
            </span>
          )}
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1a2332] rounded-lg p-4">
            <div className="text-gray-400 text-sm">Market Cap</div>
            <div className="text-lg font-medium">
              {symbol}
              {(coin.market_data?.market_cap?.[currency] / 1e9)?.toFixed(2)}B
            </div>
          </div>
          <div className="bg-[#1a2332] rounded-lg p-4">
            <div className="text-gray-400 text-sm">24h Volume</div>
            <div className="text-lg font-medium">
              {symbol}
              {(coin.market_data?.total_volume?.[currency] / 1e9)?.toFixed(2)}B
            </div>
          </div>
          <div className="bg-[#1a2332] rounded-lg p-4">
            <div className="text-gray-400 text-sm">All-Time High</div>
            <div className="text-lg font-medium">
              {symbol}
              {coin.market_data?.ath?.[currency]?.toLocaleString()}
            </div>
          </div>
          <div className="bg-[#1a2332] rounded-lg p-4">
            <div className="text-gray-400 text-sm">Circulating Supply</div>
            <div className="text-lg font-medium">
              {(coin.market_data?.circulating_supply / 1e6)?.toFixed(2)}M
            </div>
          </div>
        </div>

        {/* Categories */}
        {coin.categories?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-400 text-sm mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {coin.categories
                .filter((c) => c)
                .slice(0, 8)
                .map((cat) => (
                  <span
                    key={cat}
                    className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                  >
                    {cat}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Description */}
        {coin.description?.en && (
          <div className="mb-6">
            <h3 className="text-gray-400 text-sm mb-3">About {coin.name}</h3>
            <div
              className="text-gray-300 leading-relaxed bg-[#1a2332] rounded-lg p-4 max-h-48 overflow-y-auto"
              //   dangerouslySetInnerHTML={{
              //     __html:
              //       coin.description.en.slice(0, 800) +
              //       (coin.description.en.length > 800 ? "..." : ""),
              //   }}
            >
              {parse(
                coin.description.en.slice(0, 800) +
                  (coin.description.en.length > 800 ? "..." : "")
              )}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm mb-3">Links</h3>
          <div className="flex flex-wrap gap-3">
            {coin.links?.homepage?.[0] && (
              <a
                href={coin.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a2332] hover:bg-[#252f3f] px-4 py-2 rounded-lg text-sm transition-colors"
              >
                🌐 Website
              </a>
            )}
            {coin.links?.twitter_screen_name && (
              <a
                href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a2332] hover:bg-[#252f3f] px-4 py-2 rounded-lg text-sm transition-colors"
              >
                🐦 Twitter
              </a>
            )}
            {coin.links?.subreddit_url && (
              <a
                href={coin.links.subreddit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a2332] hover:bg-[#252f3f] px-4 py-2 rounded-lg text-sm transition-colors"
              >
                📱 Reddit
              </a>
            )}
            {coin.links?.repos_url?.github?.[0] && (
              <a
                href={coin.links.repos_url.github[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a2332] hover:bg-[#252f3f] px-4 py-2 rounded-lg text-sm transition-colors"
              >
                💻 GitHub
              </a>
            )}
          </div>
        </div>

        {/* Genesis Date */}
        {coin.genesis_date && (
          <div className="text-gray-500 text-sm">
            Genesis Date: {new Date(coin.genesis_date).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinDetailPage;
