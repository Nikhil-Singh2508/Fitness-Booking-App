import { useState } from 'react';
import api from '../api';
import './BookingForm.css'; // Import styles

export default function BookForm() {
  const [formData, setFormData] = useState({
    fitness_class_name: '',
    client_name: '',
    client_email: ''
  });

  const [errors, setErrors] = useState({
    client_name: false,
    client_email: false
  });

  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const len = email.length;
    return (
      email !== '' &&
      email.indexOf('@') > 0 &&
      (email.charAt(len - 4) === '.' || email.charAt(len - 3) === '.') &&
      email.endsWith('@gmail.com')
    );
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z ]+$/;
    return name !== '' && nameRegex.test(name);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === 'client_name') {
      setErrors({ ...errors, client_name: !validateName(value) });
    }

    if (name === 'client_email') {
      setErrors({ ...errors, client_email: !validateEmail(value) });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isNameValid = validateName(formData.client_name);
    const isEmailValid = validateEmail(formData.client_email);

    if (!isNameValid || !isEmailValid) {
      setErrors({
        client_name: !isNameValid,
        client_email: !isEmailValid
      });
      setMessage('Please correct the highlighted fields.');
      return;
    }

    api.post('/book/', formData)
      .then(res => {
        setMessage('Booking successful!');
        setFormData({ fitness_class_name: '', client_name: '', client_email: '' });
        setErrors({ client_name: false, client_email: false });
      })
      .catch(err => {
        setMessage(err.response?.data?.error || 'Booking failed');
      });
  };

  return (
    <div className='p-5'>
      <h2 className='flex justify-center text-2xl font-bold mb-4 text-gray-700'>Book a Class</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fitness_class_name"
          value={formData.fitness_class_name}
          onChange={handleChange}
          placeholder="Class Name"
          required
        />
        <input
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
          placeholder="Your Name"
          className={errors.client_name ? 'error' : 'success'}
          required
        />
        <input
          name="client_email"
          value={formData.client_email}
          onChange={handleChange}
          placeholder="Your Email"
          className={errors.client_email ? 'error' : 'success'}
          required
        />
        <button
  className="bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md shadow-sm hover:bg-gray-400 transition-colors duration-200"
>
  Book Class
</button>


      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
