import React from 'react';

const notFoundStyle = {
  textAlign: 'center',
  marginTop: '50px',
};

const NotFoundPage = () => (
  <div style={notFoundStyle}>
    <h2>Page Not Found</h2>
    <p>Sorry, the page you're looking for does not exist.</p>
  </div>
);

export default NotFoundPage;
