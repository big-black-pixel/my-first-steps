import React from "react";
import axios from "axios";

import Info from "../info";
import { useCart } from "../hooks/useCart"; 

import styles from './Draver.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({onClose,onRemove ,items = [] ,opened}){

  const {cartItems , setCartItems, totalPrice,} = useCart()
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  

  const onClickOrder = async () =>{ 
    try {
      setIsLoading(true)
      const {data} = await axios.post('https://687500d2dd06792b9c9643cc.mockapi.io/orders', {items: cartItems, })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://686cd86b14219674dcc95632.mockapi.io/cart/${item.id}`)
        await delay(1000)
      }
    }
    catch (error) {
      console.log(`Ошибка при создании заказа :(`)
    }
    setIsLoading(false)
  }

  return (
    <div className={ `${styles.overlay}  ${opened ? `${styles.overlayVisible}` : ''}` }>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина{''}
          <img
            onClick={onClose}
            className="cu-p "
            src="/img-foto/x-otmena-activ.svg"
            alt="Close"
          />
        </h2>
  
        {items.length > 0 ? (
          <div className="conteiner d-flex flex-column">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20 ">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
  
                  <div className="mr-20 d-flex">
                    <div>
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="removeBtn "
                      src="/img-foto/x-otmena-activ.svg"
                      alt="Remove"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalPrice / 100 * 5} руб. </b>
                </li>
              </ul>
              <button disabled = {isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="\img-foto\strelca-go-zacaz.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info 
            title={isOrderComplete ? "Заказ оформлен!" :"Корзина пустая" }
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссвок, чтобы сделать заказ." }
            image={isOrderComplete ? "/img-foto/oform-zaccaz.jpg" :"/img-foto/carobca-pusta.svg"}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;