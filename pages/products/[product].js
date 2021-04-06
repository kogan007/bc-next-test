import getProducts from "../../lib/getProducts";
import getSingleProduct from "../../lib/GQL/getSingleProduct";
import Header from "../../src/components/Header";

export default function ProductPage({product}) {

    return (
        <div>
            <Header/>
            {product?.name}

            {
                product?.images &&
                (
                    <img src={product?.images?.edges[0].node?.url} />
                )
            }
        </div>
    )
}

export async function getStaticPaths() {

    const res = await getProducts();
    
    const products = res.data.data;

    const paths = products.map((product) => ({
        params: { product: product.custom_url.url}
    }))
    
    

    return {
      paths,
      fallback: true
    };
  }


  export async function getStaticProps({ params }) {

    const result = await getSingleProduct(`/${params.product}/`);

    const product = result.data.data.site.route.node
    

    return {
        props: {
            product
        }
    }

    
  }