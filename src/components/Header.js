import { gql, useQuery } from "@apollo/client"
import Link from "next/link";


const CATEGORY_TREE_QUERY = gql`
    query CATEGORY_TREE_QUERY {
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
    }
  
`;
export default function Header() {

    const {data, loading, error} = useQuery(CATEGORY_TREE_QUERY);

    const categories = data?.site?.categoryTree

    console.log(categories)
    return (
        <div>
            <div>
                <Link href="/">
                    HOME
                </Link>
            </div>
            <ul>
            {
                categories && categories.map(category => (
                    <li key={JSON.stringify(category)}>
                        <Link href={category.path}>
                            {category.name}             
                        </Link>
                        {
                                category?.children && (
                                    <ul>
                                        {
                                            category.children.map(child => (
                                                <li key={JSON.stringify(child)}>
                                                    <Link href={child.path}>
                                                        {child.name}             
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        
                    </li>
                ))
            }
            </ul>
        </div>
    )
}