import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  { User } from "firebase/auth";
import auth from '../firebase';

const withAuthentication = (WrappedComponent: React.FC) => {
    const WithAuthentication: React.FC = () => {
        const [user, setUser] = useState<User | null>(null);
        const navigate = useNavigate();

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                    setUser(authUser);
                } else {
                    navigate('/login'); // Redirect to home if not logged in
                }
            });
      
            return () => unsubscribe();
        }, [navigate]);
      
          return user ? <WrappedComponent /> : null;
    }

    return WithAuthentication;
}

export default withAuthentication;