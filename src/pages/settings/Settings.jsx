import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import apiFetch from '../../services/apiFetch'
import toast from 'react-hot-toast';

const Settings = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        apiFetch('/credentials', {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const user = data?.data || {};

                if (user.admin && user.admin === password) {
                    navigate('/settings/details');
                } else if (user.super && user.super === password) {
                    navigate('/settings/app');
                } else {
                    toast.error('Incorrect Password'); // or toast.error("Incorrect Password")
                }
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                alert('Something went wrong. Please try again.'); // optional
            });
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-primary relative">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
            >
                <FaArrowLeft />
                <span className="font-medium">Back</span>
            </button>

            {/* Form Container */}
            <form
                onSubmit={handleSubmit}
                className="bg-secondary p-20 rounded-full shadow-2xl shadow-gray-500/80 w-[350px] h-[350px] flex flex-col items-center justify-center gap-6"
            >
                <div className="flex flex-col items-center">
                    <FaCog className="text-3xl text-gray-700 animate-spin-slow mb-2" />

                    <h2 className="text-xl font-semibold text-primary text-center">
                        Enter Settings Password
                    </h2>
                </div>

                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn">
                    Enter <FaArrowRight />
                </button>

            </form>
        </div>
    );
};

export default Settings;
