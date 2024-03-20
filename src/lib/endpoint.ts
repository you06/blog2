import axios from 'axios'

const ENDPOINT_ROOT: string = 'https://ap-northeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-dgUIdIWT/endpoint/v1/'
const USERNAME: string = 'K13PSIV0'
const PASSWORD: string = 'c3872e69-297c-451f-bb27-184dff738f28'

let request = async (path: string, params?: {[key: string]: string}) => {
    const url = ENDPOINT_ROOT + path;
    try {
        const response = await axios.get(url, {
            method: 'GET',
            auth: {
                username: USERNAME,
                password: PASSWORD
            },
            params,
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}

export { request }
