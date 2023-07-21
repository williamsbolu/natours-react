import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import TourView from '../components/tour/TourView';
import useHttp from '../hooks/use-http';
import { getSingleTour } from '../lib/api';

const TourDetail = () => {
    const params = useParams();
    const { slug } = params;

    const { sendRequest, status, data: tour, error } = useHttp(getSingleTour, true);

    useEffect(() => {
        if (!slug) return;
        sendRequest(slug);
    }, [sendRequest, slug]);

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

    return (
        <TourView
            key={tour.data.id}
            id={tour.data.id}
            imgCover={tour.data.imageCover}
            name={tour.data.name}
            difficulty={tour.data.difficulty}
            duration={tour.data.duration}
            location={tour.data.startLocation.description}
            summary={tour.data.summary}
            description={tour.data.description}
            locations={tour.data.locations}
            startDate={tour.data.startDates[0]}
            guides={tour.data.guides}
            stops={tour.data.locations.length}
            maxGroupSize={tour.data.maxGroupSize}
            price={tour.data.price}
            ratingsAverage={tour.data.ratingsAverage}
            ratingsQuantity={tour.data.ratingsQuantity}
            images={tour.data.images}
            reviews={tour.data.reviews}
            slug={tour.data.slug}
        />
    );
};

export default TourDetail;
