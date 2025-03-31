import "./ProductDetail.scss";
import handleAddToCart from "../utils/handleAddTocart.tsx";
import useGetProductById from "../utils/useGetProductById.tsx";

const ProductDetail: React.FC = () => {
  const { loading, product, error } = useGetProductById();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-detail-content">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button
          className={"add-product-button"}
          onClick={() => handleAddToCart(product.id, product.price)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
