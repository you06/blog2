import { request } from '$lib/endpoint'

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    const background_resp = await request('background')
	return {
		posts: [
            {id: 'post-1'},
            {id: 'post-2'},
            {id: 'post-3'},
            {id: 'post-4'},
            {id: 'post-5'},
            {id: 'post-6'},
            {id: 'post-7'},
        ],
        background: background_resp.rows[0]
	};
}
