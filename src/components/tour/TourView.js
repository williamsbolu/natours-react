import mapboxgl from 'mapbox-gl';
import { Fragment, useEffect } from 'react';
import styles from './TourView.module.css';

import { NATOURS_API } from '../../lib/api';
import icons from '../../assets/icons.svg';
import logoWhite from '../../assets/logo-white.png';
import TourGuides from './TourGuides';
import ReviewCard from './ReviewCard';

const TourView = (props) => {
    const formattedDate = new Date(props.startDate).toDateString();
    const tourDescriptions = props.description.split('\n');

    useEffect(() => {
        mapboxgl.accessToken =
            'pk.eyJ1Ijoid2lsbHRlYyIsImEiOiJjbGljdWZhOTUwMG8wM2VxajBzdDRpcXAwIn0.thm3x1MzEIvxg3q4Ct_q4w';

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/willtec/clidhpmh4002w01pgfkqwgi5j',
            scrollZoom: false,
            // center: [-118.146555, 34.134616],
            // zoom: 10,
            // interactive: false,
        });

        // we get access to the mapbox object because we include the mapbox library at the begining of our page(in the head"script")
        const bounds = new mapboxgl.LngLatBounds();

        props.locations.forEach((loc) => {
            // Create marker
            const el = document.createElement('div');
            el.className = 'marker';

            // Add arker
            new mapboxgl.Marker({
                element: el,
                anchor: 'bottom',
            })
                .setLngLat(loc.coordinates)
                .addTo(map);

            // Add popup
            new mapboxgl.Popup({
                offset: 30,
                focusAfterOpen: false,
            })
                .setLngLat(loc.coordinates)
                .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
                .addTo(map);

            // Extend map bounds to include the current location
            bounds.extend(loc.coordinates);
        });

        map.fitBounds(bounds, {
            padding: {
                top: 200,
                bottom: 150,
                left: 100,
                right: 100,
            },
        });

        return () => map.remove();
    }, [props.locations]);

    return (
        <Fragment>
            <section className={styles['section-header']}>
                <div className={styles['header__hero']}>
                    <div className={styles['header__hero-overlay']}>&nbsp;</div>
                    <img
                        className={styles['header__hero-img']}
                        src={`${NATOURS_API}/img/tours/${props.imgCover}`}
                        alt={props.name}
                    />
                </div>
                <div className={styles['heading-box']}>
                    <h1 className="heading-primary">
                        <span>{props.name}</span>
                    </h1>
                    <div className={styles['heading-box__group']}>
                        <div className={styles['heading-box__detail']}>
                            <svg className={styles['heading-box__icon']}>
                                <use xlinkHref={`${icons}#icon-clock`} />
                            </svg>
                            <span className={styles['heading-box__text']}>
                                {props.duration} days
                            </span>
                        </div>
                        <div className={styles['heading-box__detail']}>
                            <svg className={styles['heading-box__icon']}>
                                <use xlinkHref={`${icons}#icon-map-pin`} />
                            </svg>
                            <span className={styles['heading-box__text']}>
                                {props.location}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles['section-description']}>
                <div className={styles['overview-box']}>
                    <div>
                        <div className={styles['overview-box__group']}>
                            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                            <div className={styles['overview-box__detail']}>
                                <svg className={styles['overview-box__icon']}>
                                    <use xlinkHref="img/icons.svg#icon-calendar" />
                                    <use xlinkHref={`${icons}#icon-calendar`} />
                                </svg>
                                <span className={styles['overview-box__label']}>
                                    Next date
                                </span>
                                <span className={styles['overview-box__text']}>
                                    {formattedDate}
                                </span>
                            </div>
                            <div className={styles['overview-box__detail']}>
                                <svg className={styles['overview-box__icon']}>
                                    <use xlinkHref={`${icons}#icon-trending-up`} />
                                </svg>
                                <span className={styles['overview-box__label']}>
                                    Difficulty
                                </span>
                                <span className={styles['overview-box__text']}>
                                    {props.difficulty}
                                </span>
                            </div>
                            <div className={styles['overview-box__detail']}>
                                <svg className={styles['overview-box__icon']}>
                                    <use xlinkHref={`${icons}#icon-user`} />
                                </svg>
                                <span className={styles['overview-box__label']}>
                                    Participants
                                </span>
                                <span className={styles['overview-box__text']}>
                                    {props.maxGroupSize} people
                                </span>
                            </div>
                            <div className={styles['overview-box__detail']}>
                                <svg className={styles['overview-box__icon']}>
                                    <use xlinkHref={`${icons}#icon-star`} />
                                </svg>
                                <span className={styles['overview-box__label']}>
                                    Rating
                                </span>
                                <span className={styles['overview-box__text']}>
                                    {props.ratingsAverage} / 5
                                </span>
                            </div>
                        </div>

                        <div className={styles['overview-box__group']}>
                            <h2 className="heading-secondary ma-bt-lg">
                                Your tour guides
                            </h2>

                            {props.guides.map((guide) => (
                                <TourGuides
                                    key={guide._id}
                                    role={guide.role}
                                    photo={guide.photo}
                                    name={guide.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles['description-box']}>
                    <h2 className="heading-secondary ma-bt-lg">
                        About the {props.name} tour
                    </h2>

                    <p className={styles['description__text']}>{tourDescriptions[0]}</p>
                    <p className={styles['description__text']}>{tourDescriptions[1]}</p>
                </div>
            </section>

            <section className={styles['section-pictures']}>
                <div className={styles['picture-box']}>
                    <img
                        className={`${styles['picture-box__img']} ${styles['picture-box__img--1']}`}
                        src={`${NATOURS_API}/img/tours/${props.images[0]}`}
                        alt={`${props.name} Tour 1`}
                    />
                </div>
                <div className={styles['picture-box']}>
                    <img
                        className={`${styles['picture-box__img']} ${styles['picture-box__img--2']}`}
                        src={`${NATOURS_API}/img/tours/${props.images[1]}`}
                        alt={`${props.name} Tour 2`}
                    />
                </div>
                <div className={styles['picture-box']}>
                    <img
                        className={`${styles['picture-box__img']} ${styles['picture-box__img--3']}`}
                        src={`${NATOURS_API}/img/tours/${props.images[2]}`}
                        alt={`${props.name} Tour 3`}
                    />
                </div>
            </section>

            <section className="section-map">
                <div id="map"></div>
            </section>

            <section className={styles['section-reviews']}>
                <div className={styles['reviews']}>
                    {props.reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review.review}
                            rating={review.rating}
                            user={review.user.name}
                            userPhoto={review.user.photo}
                        />
                    ))}
                </div>
            </section>

            <section className={styles['section-cta']}>
                <div className={styles['cta']}>
                    <div className={`${styles['cta__img']} ${styles['cta__img--logo']}`}>
                        <img src={logoWhite} alt="Natours logo" className="" />
                    </div>
                    <img
                        src={`${NATOURS_API}/img/tours/${props.images[1]}`}
                        alt="Tour img"
                        className={`${styles['cta__img']} ${styles['cta__img--1']}`}
                    />
                    <img
                        src={`${NATOURS_API}/img/tours/${props.images[2]}`}
                        alt="Tour immg"
                        className={`${styles['cta__img']} ${styles['cta__img--2']}`}
                    />

                    <div className={styles['cta__content']}>
                        <h2 className="heading-secondary">What are you waiting for?</h2>
                        <p className={styles['cta__text']}>
                            {props.duration} days. 1 adventure. Infinite memories. Make it
                            yours today!
                        </p>
                        <button className="btn btn--green">Book tour now!</button>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default TourView;
