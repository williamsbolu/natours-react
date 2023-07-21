import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const Home = React.lazy(() => import('./pages/Home'));
const TourDetail = React.lazy(() => import('./pages/TourDetail'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));

function App() {
    return (
        <ScrollToTop>
            <Layout>
                <Suspense
                    fallback={
                        <div className="centered">
                            <LoadingSpinner />
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tour/:slug" element={<TourDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Routes>
                </Suspense>
            </Layout>
        </ScrollToTop>
    );
}

export default App;
