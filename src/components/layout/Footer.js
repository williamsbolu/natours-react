import styles from './Footer.module.css';
import logoGreen from '../../assets/logo-green.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <img src={logoGreen} alt="natours logo" />
            </div>
            <ul>
                <li>
                    <Link to="">About us</Link>
                </li>
                <li>
                    <Link to="">Download apps</Link>
                </li>
                <li>
                    <Link to="">Become a guide</Link>
                </li>
                <li>
                    <Link to="">Careers</Link>
                </li>
                <li>
                    <Link to="">Contact</Link>
                </li>
            </ul>
            <p>© by Jonas Schmedtmann and Williams. All rights resered.</p>
        </footer>
    );
};

export default Footer;
