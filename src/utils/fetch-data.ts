import axios from 'axios'
import type { Artwork } from '../types/artwork-data';


interface ApiResponse {
    pagination: any[];
    data: Artwork[];
}

const fetchData = async (): Promise<{ artworks: Map<number, Artwork>, pagination: any[] }> => {
    const artworks = new Map<number, any>()
    const params = new URLSearchParams(location.search)
    const pageNo = params.get("page")

    const pagination: any[] = []
    try {
        const { data } =
            await axios.get<ApiResponse>(`https://api.artic.edu/api/v1/artworks?page=${pageNo || 1}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`)

        for (const dt of data.data) {
            artworks.set(dt.id, { ...dt, selected: false })
        }
        pagination.push(data.pagination)
    } catch (error) {
        console.log('Error: ', error);
    }
    return { artworks, pagination };
};

export default fetchData