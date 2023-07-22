export const NATOURS_API = 'https://natours-api-mw9e.onrender.com';
// export const NATOURS_API = 'http://127.0.0.1:3000';

export async function getAllTours() {
    const response = await fetch(`${NATOURS_API}/api/v1/tours`);

    if (!response.ok) throw new Error('Could not get data');

    const toursData = await response.json();

    return toursData.data;
}

export async function getSingleTour(tourSlug) {
    const response = await fetch(`${NATOURS_API}/api/v1/tours/tour/${tourSlug}`);

    if (!response.ok) throw new Error('Could not get data');

    const toursData = await response.json();

    // console.log(toursData);

    return toursData.data;
}
