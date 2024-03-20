import { request } from '$lib/endpoint'

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    const background_resp = await request('background')
	return {
        background: background_resp.rows[0]
	};
}
