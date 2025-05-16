import axios from 'axios';

const YANDEX_GEOCODER_API = 'https://geocode-maps.yandex.ru/1.x/';
const API_KEY = process.env.YANDEX_SUGGEST_API_KEY || '';

export const suggestRepository = {
    async getAddressByQuery(search: string, city?: string, limit: number = 10, offset: number = 0) {
        if (!search) {
            throw new Error('Search query is required');
        }

        let geocode = search;
        if (city) {
            // Чтобы сузить поиск по городу, добавляем город в начало или конец запроса
            geocode = `${city}, ${search}`;
        }

        const params = new URLSearchParams({
            apikey: API_KEY,
            geocode,          // адрес или строка для геокодирования
            format: 'json',   // формат ответа
            results: String(limit + offset), // количество результатов (с запасом на offset)
            lang: 'ru_RU',    // язык ответа
        });

        try {
            const { data } = await axios.get(`${YANDEX_GEOCODER_API}?${params.toString()}`);

            const geoObjects = data.response.GeoObjectCollection.featureMember || [];

            // Применяем сдвиг offset и лимит
            const slicedObjects = geoObjects.slice(offset, offset + limit);

            const results = slicedObjects.map((obj: any) => {
                const geoObject = obj.GeoObject;
                return {
                    title: geoObject.name, // название объекта (улица, дом и т.п.)
                    address: geoObject.description, // более детальное описание (город, район)
                    position: geoObject.Point.pos.split(' ').map(Number), // [долгота, широта]
                    fullItem: geoObject,
                };
            });

            return {
                count: geoObjects.length,
                results,
            };
        } catch (error: any) {
            console.error('Yandex geocoder fetch error:', error?.response?.data || error.message);
            throw new Error('Failed to fetch geocoding results');
        }
    },
};