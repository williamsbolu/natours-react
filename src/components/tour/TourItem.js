import { Link } from 'react-router-dom';
import classes from './TourItem.module.css';

import icons from '../../assets/icons.svg';
import { NATOURS_API } from '../../lib/api';

const TourItem = (props) => {
    const formattedDate = new Date(props.startDate).toDateString();

    return (
        <div className={classes.card}>
            <div className={classes['card__header']}>
                <div className={classes['card__picture']}>
                    <div className={classes['card__picture-overlay']}>&nbsp;</div>
                    <img
                        src={`${NATOURS_API}/img/tours/${props.imgCover}`}
                        alt={props.name}
                        className={classes['card__picture-img']}
                    />
                </div>
                <h3 className="heading-tertirary">
                    <span>{props.name}</span>
                </h3>
            </div>

            <div className={classes['card__details']}>
                <h4 className={classes['card__sub-heading']}>
                    {props.difficulty} {props.duration}-day tour
                </h4>
                <p className={classes['card__text']}>{props.summary}</p>
                <div className={classes['card__data']}>
                    <svg className={classes['card__icon']}>
                        <use xlinkHref={`${icons}#icon-map-pin`} />
                    </svg>
                    <span>{props.location}</span>
                </div>
                <div className={classes['card__data']}>
                    <svg className={classes['card__icon']}>
                        <use xlinkHref={`${icons}#icon-calendar`} />
                    </svg>
                    <span>{formattedDate}</span>
                </div>
                <div className={classes['card__data']}>
                    <svg className={classes['card__icon']}>
                        <use xlinkHref={`${icons}#icon-flag`} />
                    </svg>
                    <span>{props.stops} stops</span>
                </div>
                <div className={classes['card__data']}>
                    <svg className={classes['card__icon']}>
                        <use xlinkHref={`${icons}#icon-user`} />
                    </svg>
                    <span>{props.maxGroupSize} people</span>
                </div>
            </div>

            <div className={classes['card__footer']}>
                <p>
                    <span className={classes['card__footer-value']}>${props.price}</span>
                    <span className={classes['card__footer-text']}>per person</span>
                </p>
                <p className={classes['card__ratings']}>
                    <span className={classes['card__footer-value']}>
                        {props.ratingsAverage}
                    </span>
                    <span className={classes['card__footer-text']}>
                        rating ({props.ratingsQuantity})
                    </span>
                </p>
                <Link to={`/tour/${props.slug}`} className={classes['btn-item']}>
                    Details
                </Link>
            </div>
        </div>
    );
};

export default TourItem;
