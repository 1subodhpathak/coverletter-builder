import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useStore } from './store/useStore';
import Home from './pages/Home';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Builder = lazy(() => import('./pages/Builder'));
const WelcomeTokensModal = lazy(() => import('./components/common/WelcomeTokensModal'));

function AuthStoreSynchronizer() {
  const { getToken, userId, isLoaded, isSignedIn } = useAuth();
  const setAuth = useStore((state) => state.setAuth);
  const syncWithBackend = useStore((state) => state.syncWithBackend);

  useEffect(() => {
    if (isLoaded) {
      setAuth({ userId, getToken });
      if (isSignedIn) {
        syncWithBackend();
      }
    }
  }, [isLoaded, userId, getToken, isSignedIn, setAuth, syncWithBackend]);

  return null;
}

function App() {
  return (
    <Router>
      <AuthStoreSynchronizer />
      <SignedIn>
        <Suspense fallback={null}>
          <WelcomeTokensModal />
        </Suspense>
      </SignedIn>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/dashboard" 
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#F5EFEB]" />}>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </Suspense>
          } 
        />
        <Route 
          path="/builder" 
          element={
            <Suspense fallback={<div className="min-h-screen bg-[#F5EFEB]" />}>
              <Builder />
            </Suspense>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
