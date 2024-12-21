import "./ProductCard.css";
import { useCart } from "../Context/CartContex";

export const ProductCard = ({ product }) => {
  const { name, price, image, id } = product;
  const { ADD_TO_CART, REMOVE_FROM_CART, cartList } = useCart();

  const handleAddToCart = () => {
    ADD_TO_CART(product);
  }

  const isProductInCart = cartList.some(item => item.id === id);

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        {
          isProductInCart ? (
            <button style={{ background: "#ac0d14", color: "#FFFFFF" }} onClick={() => REMOVE_FROM_CART(id)}>
              Remove
            </button>
          ) : (
            <button onClick={handleAddToCart}>Add To Cart</button>
          )
        }
      </div>
    </div>
  );
}
