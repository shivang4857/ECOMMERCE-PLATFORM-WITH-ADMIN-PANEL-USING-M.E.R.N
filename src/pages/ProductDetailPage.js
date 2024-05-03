import NavBar
 from "../features/counter/navbar/NavBar";
import ProductDetails from "../features/counter/product list/components/ProductDetails";
function ProductDetailPage() {
    return ( 
        <div>
            <NavBar>
                <ProductDetails></ProductDetails>
            </NavBar>
        </div>
     );
}

export default ProductDetailPage;