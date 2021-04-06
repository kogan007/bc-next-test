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
            "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJlYXQiOjE2MTc5MDQwODgsInN1Yl90eXBlIjowLCJ0b2tlbl90eXBlIjoxLCJjb3JzIjpbImh0dHBzOi8vZGV2ZWxvcGVyLmJpZ2NvbW1lcmNlLmNvbSJdLCJjaWQiOjEsImlhdCI6MTYxNzczMTI4OCwic3ViIjoiYmNhcHAubGlua2VyZCIsInNpZCI6MTAwMTIxMDc3OSwiaXNzIjoiQkMifQ.q17yxVWSR1ROJIb-wReUZfpa3SHo1CbkjqhzEdrF3z_B8zGWNxvwDPbbuGJe-KlVpouFJz-qgkRJSfE9dOh_Nw`,
            "Content-Type": "application/json"
        },
        data: data

    })
}

export default getSingleProduct;