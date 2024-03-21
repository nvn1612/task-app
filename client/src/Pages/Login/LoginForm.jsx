import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; 
import axios from 'axios';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('/api/login', {
        username: username,
        password: password
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); 
        navigate('/pageDeclareWork');
      } else {
        alert("Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      alert("Email hoặc mật khẩu không đúng");
    }
  };
  return (
    <div className="containerlogin">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Tài khoản</label>
            <input
              type="text"
              placeholder="Tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng nhập</button>
          <div className="register-forgot-link">
            <a href="#">Bạn chưa có tài khoản?</a>
            <a href="#">Đặt lại mật khẩu</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;