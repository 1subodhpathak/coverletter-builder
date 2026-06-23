import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useStore } from './store/useStore';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Builder = lazy(() => import('./pages/Builder'));

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
      <Suspense fallback={<div className="min-h-screen bg-[#F5EFEB]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } 
          />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
