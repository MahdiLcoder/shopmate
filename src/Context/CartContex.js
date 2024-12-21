import { useContext, useReducer, useEffect } from "react";
import { createContext } from "react";
import { cartReducer } from "../Reducer/CartReducer";

const initialState = {
    cartList: JSON.parse(localStorage.getItem("cartList")) || [],
    total: 0,
};

export const CartContext = createContext(initialState);

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Synchronize cartList with localStorage
    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(state.cartList));
    }, [state.cartList]);

    // Dynamically calculate total
    const calculateTotal = () => {
        return state.cartList.reduce((acc, item) => acc + item.price, 0);
    };

    const ADD_TO_CART = (product) => {
        const updatedCartList = [...state.cartList, product];
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedCartList
            }
        });
    };

    const REMOVE_FROM_CART = (id) => {
        const updatedCartList = state.cartList.filter(item => item.id !== id);
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedCartList
            }
        });
    };

    const value = {
        total: calculateTotal(),
        cartList: state.cartList,
        ADD_TO_CART,
        REMOVE_FROM_CART,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};
