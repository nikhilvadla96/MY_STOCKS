import React, { useContext } from 'react';
import { useHistory, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { MyContext } from '../MyContextProvider';

const ErrorPage = ({ errorType }) => {
  const navigate = useNavigate();
  alert(errorType)
  //const history = useHistory();
  const { setToken , setIsAuthenticated} = useContext(MyContext)

  const handleReLogin = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login')
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Oops! Something went wrong.</h1>
      {errorType !== 'timeout' ? (
        <p style={styles.message}>Your request has timed out. Please try again later. / try re-logging in</p>
      ) : (
        <p style={styles.message}>An error occurred. Please try re-logging in.</p>
      )}
      <button style={styles.button} onClick={handleReLogin}>Re-login</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  message: {
    fontSize: '1.25rem',
    marginBottom: '2rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '0.25rem'
  }
};

export default ErrorPage;
