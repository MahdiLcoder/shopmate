import "./CartCard.css";
import { useCart } from "../Context/CartContex";
export const CartCard = ({product}) => {
  const {name, price, image} = product;
  const {REMOVE_FROM_CART} = useCart();
  return (
      <div className="cartCard">
        <img src={image} alt={name} />
        <p className="productName">{name}</p>
        <p className="productPrice">${price}</p>
        <button onClick={() => REMOVE_FROM_CART(product.id)}>Remove</button>
      </div>
  )
}
