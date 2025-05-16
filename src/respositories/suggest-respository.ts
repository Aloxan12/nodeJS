import axios from 'axios';

const YANDEX_SUGGEST_API = 'https://suggest-maps.yandex.ru/v1/suggest';
const API_KEY = process.env.YANDEX_SUGGEST_API_KEY || '';

export const suggestRepository = {
    async getAddressByQuery(search: string,city?:string, limit: string = '10', offset: string = '0'){
        const parsedLimit = Number(limit) || 5;
        const parsedOffset = Number(offset) || 0;

        if (!search) {
            throw new Error('Search query is required');
        }

        const queryParams = new URLSearchParams({
            apikey: API_KEY as string,
            text: search,
            lang: 'ru_RU',
            results: String(parsedLimit),
        });

        // При наличии города — добавляем фильтр
        if (city) {
            queryParams.append('bound', JSON.stringify({
                from: city,
                to: city,
            }));
        }

        try {
            const { data } = await axios.get(`${YANDEX_SUGGEST_API}?${queryParams.toString()}`);

            const suggestions = data.results || [];

            return {
                count: suggestions.length,
                results: suggestions.slice(parsedOffset, parsedOffset + parsedLimit).map((item: any) => ({
                    title: item.title.text,
                    subtitle: item.subtitle?.text || '',
                    position: item.position,
                    fullItem: item
                })),
            };
        } catch (error: any) {
            console.error('Yandex suggest fetch error:', error?.response?.data || error.message);
            throw new Error('Failed to fetch suggestions');
        }
    },
}