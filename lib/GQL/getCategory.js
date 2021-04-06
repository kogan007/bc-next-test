import axios from "axios";




const getCategory = async (slug) => {



    const data = JSON.stringify({
        query: `query getCategory ($path: String!) {
            site {
                route(path: $path) {
                  node {
                    ... on Category{
                      name  
                      description
                    }
                  }
                }
              }
        }`,
        variables: {
            path: slug
        }
    })
    return axios({
        method: "post",
        url: process.env.GQL_URL,
        headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GQL_TOKEN}`,
            "Content-Type": "application/json"
        },
        data: data

    })
}

export default getCategory;