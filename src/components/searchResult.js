import React from 'react';
import { getProductByQuery } from '../fetcher';
import { useSearchParams } from 'react-router-dom';
import CategoryProduct from './categoryProduct';

const SearchResults = () => {
    const [products, setProducts] = React.useState({
        errorMessage: "",
        data: [],
    });

    const [searchParams] = useSearchParams();
    let query = searchParams.get('s');

    React.useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProductByQuery(query);
            setProducts(responseObject);
        }
        fetchData();
    }, [query]);

    const renderProducts = () => {
        if(products.data.length > 0) {
            return products.data.map((p) => (
                <CategoryProduct key={p.id} {...p}>
                    {p.title}
                </CategoryProduct>
            ));
        }else{
            return <div>No results found</div>
        }
    };

    return (
        <div>
            {products.errorMessage && <div>Error: {products.errorMessage} </div>}
            {renderProducts()}
        </div>
    )
}

export default SearchResults;