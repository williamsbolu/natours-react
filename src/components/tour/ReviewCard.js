import styles from './ReviewCard.module.css';

import icons from '../../assets/icons.svg';
import { NATOURS_API } from '../../lib/api';

const ReviewRating = (props) => {
    return (
        <svg
            className={`${styles['reviews__star']} ${
                styles[
                    `reviews__star--${props.rating >= props.star ? 'active' : 'inactive'}`
                ]
            }`}
        >
            <use xlinkHref={`${icons}#icon-star`} />
        </svg>
    );
};

const ReviewCard = (props) => {
    const star = [1, 2, 3, 4, 5];

    return (
        <div className={styles['reviews__card']}>
            <div className={styles['reviews__avatar']}>
                <img
                    src={`${NATOURS_API}/img/users/${props.userPhoto}`}
                    alt={props.user}
                    className={styles['reviews__avatar-img']}
                />
                <h6 className={styles['reviews__user']}>{props.user}</h6>
            </div>
            <p className={styles['reviews__text']}>{props.review}</p>
            <div className={styles['reviews__rating']}>
                {star.map((curStar) => (
                    <ReviewRating
                        key={Math.random() * 20}
                        star={curStar}
                        rating={props.rating}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReviewCard;
