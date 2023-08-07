import { useEffect } from 'react';

import useHttp from '../hooks/use-http';
import TourList from '../components/tour/TourList';
import LoadingSpinner from '../components/UI/LoginSpinnerDark';
import { getAllTours } from '../lib/api';

const Home = () => {
    const { sendRequest, status, data: tours, error } = useHttp(getAllTours, true);

    useEffect(() => {
        // effect for sending the request to the database
        sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="centered">
                <p>{error}</p>
            </div>
        );
    }

    return <TourList tours={tours.data} />;
};

export default Home;
