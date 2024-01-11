import { createContext } from 'react'
import axios from '../../axios'
let ApiUrl = `http://${window.location.hostname}:3006`
const userContext = createContext({
    addData: async (data) => {
        let result = await axios.post(ApiUrl + '/addData', {data});
        return result.data;
    },
    getData: async () => {
        let result = await axios.post(ApiUrl + '/getData');
        return result.data;
    },
    getContry: async () => {
        let res = await axios.get('https://countriesnow.space/api/v0.1/countries')
        return res.data?.data?.map((d) => d.country)
    },
    getState: async (country) => {
        try {
            let res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`)
            let state = []
            let id = res.data?.data?.map(async (d) => {
                if (d.name === country) {
                    let id = d.states?.map((st) => { state.push(st.name) })
                    await Promise.all(id)
                }
            })
            await Promise.all(id)
            return state
        } catch (error) {
            return []
        }
    },
    getCity: async (country, state) => {
        let res = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities',{
            "country": country,
            "state": state
        })
        return res.data.data
    }
})
export default userContext;