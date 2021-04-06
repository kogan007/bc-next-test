const globalHeaders = {
    "X-Auth-Token": process.env.TOKEN,
    "X-Auth-Client": process.env.API_CLIENT,
    "Accept": "application/json"
}

export default globalHeaders;