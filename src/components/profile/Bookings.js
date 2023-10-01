import { useEffect, useContext, useCallback, useState } from 'react';

import BookingsItem from './BookingsItem';
import AuthContext from '../../store/auth-context';
import axios from 'axios';
import styles from './Bookings.module.css';
import LoginSpinnerDark from '../UI/LoginSpinnerDark';
import { NATOURS_API } from '../../lib/api';

const Bookings = () => {
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsloading] = useState(false);
    const [bookingsData, setBookingsData] = useState(null);
    const [error, setError] = useState(null);

    const getUserBookings = useCallback(async () => {
        setIsloading(true);
        try {
            const res = await axios.get(
                `${NATOURS_API}/api/v1/bookings/getUserBookings`,
                {
                    headers: {
                        Authorization: `Bearer ${authCtx.token}`,
                    },
                }
            );

            setBookingsData(res.data);
        } catch (err) {
            setError(err.response.data.message);
        }
        setIsloading(false);
    }, [authCtx.token]);

    useEffect(() => {
        getUserBookings();
    }, [getUserBookings]);

    if (isLoading) {
        return (
            <div className="centered">
                <LoginSpinnerDark />
            </div>
        );
    }

    if (error || !bookingsData) {
        return (
            <div className="centered">
                <p>{error || 'Could not connect to the server. Try again later.'}</p>
            </div>
        );
    }

    if (bookingsData.data.length === 0) {
        return (
            <div className="centered">
                <p>You have no bookings. Visit our tours page to book for a tour!</p>
            </div>
        );
    }

    return (
        <div className={styles['bookings__container']}>
            <h2 className="heading-secondary ma-bt-md">
                My Bookings ({bookingsData.results})
            </h2>

            <div className={styles['bookings__item--list']}>
                {bookingsData.data.map((tour) => (
                    <BookingsItem
                        key={tour.id}
                        id={tour.id}
                        imgCover={tour.imageCover}
                        name={tour.name}
                        difficulty={tour.difficulty}
                        duration={tour.duration}
                        location={tour.startLocation.description}
                        summary={tour.summary}
                        startDate={tour.startDates[0]}
                        stops={tour.locations.length}
                        maxGroupSize={tour.maxGroupSize}
                        price={tour.price}
                        ratingsAverage={tour.ratingsAverage}
                        ratingsQuantity={tour.ratingsQuantity}
                        slug={tour.slug}
                    />
                ))}
            </div>
        </div>
    );
};

export default Bookings;
