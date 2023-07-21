import classes from './TourList.module.css';
import TourItem from './TourItem';

const TourList = (props) => {
    return (
        <section className={classes['card-container']}>
            {props.tours.map((tour) => (
                <TourItem
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
        </section>
    );
};

export default TourList;
