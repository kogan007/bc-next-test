import axios from "axios";




const getSingleProduct = async (slug) => {



    const data = JSON.stringify({
        query: `query GET_SINGLE_PRODUCT ($path: String!) {
            site {
                route(path: $path) {
                  node {
                    ... on Product{
                      name
                      images{
                          edges{
                              node{
                                  url(width: 100)
                              }
                          }
                      }
                      
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

export default getSingleProduct;