import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/inputField/inputField';
import Button from '../../components/Button/button';
import logo from "../../assets/images/logo.png";
import { loginAdmin } from '../../redux/slices/adminSlice/adminSlice';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Login = () => {
  const [role, setRole] = useState('Admin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [popupMessage, setPopupMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (error) {
      setPopupMessage(error);
      if (error === 'Invalid credentials') {
        setFormData({ email: '', password: '' });
      }
    }
  }, [error]);

  const toggleRole = () => {
    setRole(role === 'Admin' ? 'Store Owner' : 'Admin');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      console.log('Dispatching loginAdmin with:', formData);
      const result = await dispatch(loginAdmin(formData));
      console.log('Dispatch result:', result);
      if (loginAdmin.fulfilled.match(result)) {
        console.log('Login successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.error('Error payload:', result.payload);
        setPopupMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setPopupMessage('An unexpected error occurred.');
    }
  };

  const handlePopupClose = () => setPopupMessage(null);

  return (
    <div className="bg-login-bg min-h-screen flex">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
          <img src={logo} alt="Logo" className="w-1/3 mb-4" />
          <h1 className="text-3xl font-bold text-highlight">TEXINITY TECHNOLOGIES</h1>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 lg:p-12">
          <h2 className="text-2xl text-highlight mb-6">Welcome Back!</h2>
          <form className="w-full max-w-sm" onSubmit={handleSignIn}>
            <InputField
              label="Email"
              type="email"
              id="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="mt-6">
              <Button text='Login' />
            </div>
          </form>
        </div>
      </div>
      {popupMessage && (
        <Popup open={true} onClose={handlePopupClose} closeOnDocumentClick>
          <div className="w-full p-6 text-center">
            <p className="text-primary mb-4">{popupMessage}</p>
            <Button
              text="OK"
              onClick={handlePopupClose}
            />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Login;
