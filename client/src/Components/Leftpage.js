
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leftpage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
    };

    fetchUser();
  }, []);

  return (
        <div className="descriptionlist">
          {user && (
            <div className="list-group-item">
              <p><strong>Tài khoản:</strong> {user.Username}</p>
              <p><strong>Họ:</strong> {user.FirstName}</p>
              <p><strong>Tên:</strong> {user.LastName}</p>
              <p><strong>Email:</strong> {user.Email}</p>
              <p><strong>SĐT:</strong> {user.NumberPhone}</p>
            </div>
          )}
        </div>
  );
};

export default Leftpage;