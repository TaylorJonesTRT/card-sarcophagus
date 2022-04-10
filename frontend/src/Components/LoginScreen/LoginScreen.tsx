/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const LoginScreen = () => {
  useEffect(() => {
    const fetchCookie = async () => {
      const cookies = new Cookies();
      const loginRequest = await axios
        .request({
          method: 'POST',
          url: 'http://localhost:3001/api/auth/login',
          data: {
            username: 'taylor@taylorwjones.com',
            password: 'testingyesyuh',
          },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      return loginRequest;
      // axios
      //   .post('http://localhost:3001/api/auth/login', {
      //     username: 'taylor@taylorwjones.com',
      //     password: 'testingyesyuh',
      //   })
      //   .then((response) => console.log(response))
      //   .catch((error) => console.log(error));
      // const fetchedCookie = await axios
      //   .post('http://localhost:3001/api/auth/login', {
      //     username: 'taylor@taylorwjones.com',
      //     password: 'testingyesyuh',
      //   })
      //   .then((response) => cookies.set('carsar', response.data.accessToken))
      //   .catch((error) => {
      //     console.log(error.response);
      //   });
      // return fetchedCookie;
    };
    fetchCookie();
  }, []);

  return (
    <div className='left-bar'>
      <span>hello</span>
    </div>
  );
};

export default LoginScreen;
