import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/ui/LoadingScreen';


// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const DestinationPage = lazy(() => import('./pages/DestinationPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const PackageDetailPage = lazy(() => import('./pages/PackageDetailPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
           <Route path="/blog" element={<BlogPage />} />
          <Route path="/destinations/:id" element={<DestinationPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/package/:id" element={<PackageDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/account/*" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;