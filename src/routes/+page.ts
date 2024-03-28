import { request } from '$lib/endpoint'

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    const background_resp = await request('background')
	return {
        background1: background_resp.rows[0],
        background2: background_resp.rows[0],
	}
}
