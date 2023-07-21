export const NATOURS_API = 'https://natours-api-me.onrender.com';

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
