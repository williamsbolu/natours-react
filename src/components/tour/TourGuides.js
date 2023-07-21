import styles from './TourGuides.module.css';

import { NATOURS_API } from '../../lib/api';

const TourGuides = (props) => {
    return (
        <div className={styles['overview-box__detail']}>
            <img
                src={`${NATOURS_API}/img/users/${props.photo}`}
                alt={props.name}
                className={styles['overview-box__img']}
            />
            <span className={styles['overview-box__label']}>
                {props.role === 'lead-guide' ? 'Lead guide' : 'Tour Guide'}
            </span>
            <span className={styles['overview-box__text']}>{props.name}</span>
        </div>
    );
};

export default TourGuides;
