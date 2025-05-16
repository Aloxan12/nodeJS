import axios from 'axios';
import crypto from 'crypto';

function generateIdFromAddress(name: string, description: string, pos: string): string {
    const input = `${name}||${description}||${pos}`;
    return crypto.createHash('md5').update(input).digest('hex');
}

const YANDEX_GEOCODER_API = 'https://geocode-maps.yandex.ru/1.x/';
const API_KEY = process.env.YANDEX_SUGGEST_API_KEY || '';

const cache = new Map<string, any>();

export const suggestRepository = {
    async getAddressByQuery(search: string, city?: string, limit: number = 10, offset: number = 0) {
        if (!search) {
            throw new Error('Search query is required');
        }

        let geocode = city ? `${city}, ${search}` : search;
        const cacheKey = `${geocode}:${limit}:${offset}`;

        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
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
                    id: generateIdFromAddress(geoObject.name, geoObject.description, geoObject.Point.pos),
                    title: geoObject.name, // название объекта (улица, дом и т.п.)
                    address: geoObject.description, // более детальное описание (город, район)
                    position: geoObject.Point.pos.split(' ').map(Number), // [долгота, широта]
                    fullItem: geoObject,
                };
            });

            cache.set(cacheKey, {
                count: geoObjects.length,
                results,
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