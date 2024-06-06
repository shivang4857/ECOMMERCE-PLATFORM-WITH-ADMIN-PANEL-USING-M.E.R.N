import NavBar
 from "../features/navbar/NavBar";
import ProductDetails from "../features/product/components/ProductDetails";
function ProductDetailPage() {
    return ( 
        <div>
            <NavBar>
                <ProductDetails>
                    hello
                </ProductDetails>
            </NavBar>
        </div>
     );
}

export default ProductDetailPage;