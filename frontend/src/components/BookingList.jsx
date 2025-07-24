import { useState } from 'react';
import api from '../api';

export default function ShowBookings() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const handleFetch = () => {
    api.get(`/bookings/?email=${email}`)
      .then(res => {
        setBookings(res.data);
        setError('');
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Something went wrong');
        setBookings([]);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 flex justify-center">Your Bookings</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md shadow-sm hover:bg-gray-400 transition-colors duration-200"
          onClick={handleFetch}
        >
          Fetch
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {bookings.length > 0 && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Class</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Instructor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Client Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Client Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.fitness_class.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.fitness_class.instructor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.fitness_class.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.fitness_class.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.client_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.client_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
