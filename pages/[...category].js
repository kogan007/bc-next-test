import getAllCategories from "../lib/GQL/getAllCategories";
import getCategory from "../lib/GQL/getCategory";
import Header from "../src/components/Header";

export default function CategoryPage({category}) {

    return (
        <div>
            <Header />
            {category?.name}
            <div dangerouslySetInnerHTML={{__html: category?.description}}>

            </div>
        </div>
    )
}

export async function getStaticPaths() {

    const res = await getAllCategories();
    
    const categories = res.data.data.site.categoryTree;

    
    const paths = categories.map((category) => ({
        params: { category: [category.path]} 
    }))

    
    
    return {
        paths,
        fallback: true
        
    }

    
  }


  export async function getStaticProps({ params }) {

    const result = await getCategory(`/${params.category[0]}/`);

    const category = result.data.data.site.route.node
    

    return {
        props: {
            category
        }
    }

    
  }