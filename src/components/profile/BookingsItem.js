import { Link } from 'react-router-dom';
import styles from './BookingsItem.module.css';

import { NATOURS_API } from '../../lib/api';
import icons from '../../assets/icons.svg';

const BookingsItem = (props) => {
    const formattedDate = new Date(props.startDate).toDateString();

    return (
        <div className={styles.card}>
            <div className={styles['card__header']}>
                <div className={styles['card__picture']}>
                    <div className={styles['card__picture-overlay']}>&nbsp;</div>
                    <img
                        src={`${NATOURS_API}/img/tours/${props.imgCover}`}
                        alt={props.name}
                        className={styles['card__picture-img']}
                    />
                </div>
                <h3 className="heading-tertirary">
                    <span>{props.name}</span>
                </h3>
            </div>

            <div className={styles['card__details']}>
                <h4 className={styles['card__sub-heading']}>
                    {props.difficulty} {props.duration}-day tour
                </h4>
                <p className={styles['card__text']}>{props.summary}</p>
                <div className={styles['card__data']}>
                    <svg className={styles['card__icon']}>
                        <use xlinkHref={`${icons}#icon-map-pin`} />
                    </svg>
                    <span>{props.location}</span>
                </div>
                <div className={styles['card__data']}>
                    <svg className={styles['card__icon']}>
                        <use xlinkHref={`${icons}#icon-calendar`} />
                    </svg>
                    <span>{formattedDate}</span>
                </div>
                <div className={styles['card__data']}>
                    <svg className={styles['card__icon']}>
                        <use xlinkHref={`${icons}#icon-flag`} />
                    </svg>
                    <span>{props.stops} stops</span>
                </div>
                <div className={styles['card__data']}>
                    <svg className={styles['card__icon']}>
                        <use xlinkHref={`${icons}#icon-user`} />
                    </svg>
                    <span>{props.maxGroupSize} people</span>
                </div>
            </div>

            <div className={styles['card__footer']}>
                <Link to={`/tour/${props.slug}`} className={styles['btn-item']}>
                    Details
                </Link>
            </div>
        </div>
    );
};

export default BookingsItem;
