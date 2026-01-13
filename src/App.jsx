import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Loader from "./components/Loader/Loader";
import CustomErrorBoundary from "./components/ErrorFallback/ErrorFallback";

const CoinDetailPage = lazy(() => import("./pages/CoinDetailPage"));

function App() {
  return (
    <CustomErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="coin/:coinId"
            element={
              <Suspense fallback={<Loader />}>
                <CoinDetailPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </CustomErrorBoundary>
  );
}

export default App;
