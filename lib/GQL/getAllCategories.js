import axios from "axios";




const getAllCategories = async () => {



    const data = JSON.stringify({
        query: `query CATEGORY_TREE_QUERY {
            site {
            categoryTree {
                name
                path
                children{
                name
                path
                }
            }
            }
        }`,
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

export default getAllCategories;