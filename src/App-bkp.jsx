import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';

// Placeholder components for other pages
const About = () => <div className="text-white pt-32 text-center">About Page Coming Soon</div>;
const Events = () => <div className="text-white pt-32 text-center">Events Page Coming Soon</div>;
const Contact = () => <div className="text-white pt-32 text-center">Contact Page Coming Soon</div>;
const Members = () => <div className="text-white pt-32 text-center">Members Page Coming Soon</div>;

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="events" element={<Events />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="members" element={<Members />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
