import axios from 'axios';
// export const NATOURS_API = 'https://natours-api-mw9e.onrender.com';
export const NATOURS_API = 'http://127.0.0.1:3000';

export async function getAllTours() {
    const res = await axios({
        method: 'GET',
        url: `${NATOURS_API}/api/v1/tours`,
    });

    return res.data.data;
}

export async function getSingleTour(tourSlug) {
    const res = await axios({
        method: 'GET',
        url: `${NATOURS_API}/api/v1/tours/tour/${tourSlug}`,
    });

    return res.data.data;
}

export async function getUserData() {
    const response = await fetch(`${NATOURS_API}/api/v1/users/me`, {
        credentials: 'include',
    });

    if (!response.ok) throw new Error('something went wrong');

    const data = await response.json();
    console.log(data);
    console.log('sending...');
    return data;
}
