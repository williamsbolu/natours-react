import axios from 'axios';
export const NATOURS_API = 'https://natours-api-mw9e.onrender.com';
// export const NATOURS_API = 'http://127.0.0.1:3000';

export function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

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

export async function getUserBookings(token) {
    const res = await axios.get(`${NATOURS_API}/api/v1/bookings/getUserBookings`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}

// export async function getUserData() {
//     const response = await fetch(`${NATOURS_API}/api/v1/users/me`, {
//         credentials: 'include',
//     });

//     if (!response.ok) throw new Error('something went wrong. Try again later.');

//     const userData = await response.json();
//     return userData.data.data;
// }
