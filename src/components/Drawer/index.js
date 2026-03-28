import React from "react";
import Info from "../info";
import { useCart } from "../hooks/useCart"; 
import { supabase } from "../../supabase";

import styles from './Draver.module.scss'

function Drawer({onClose, onRemove, items = [], opened}){

  const {cartItems, setCartItems, totalPrice} = useCart()
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const onClickOrder = async () =>{ 
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('orders')
        .insert([{ items: cartItems }])
        .select();

      if (error) {
        console.error("Ошибка Supabase:", error);
        throw new Error('Не удалось сохранить заказ');
      }

      setOrderId(data[0].id);
      setIsOrderComplete(true);
      setCartItems([]);

      const cartIds = cartItems.map(item => item.id);
      await supabase.from('cart').delete().in('id', cartIds);

    } catch (error) {
      alert(`Ошибка при создании заказа :(`);
      console.error(error);
    }
    setIsLoading(false);
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
                  <b>{Math.round(totalPrice / 100 * 5)} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img-foto/strelca-go-zacaz.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info 
            title={isOrderComplete ? "Заказ оформлен!" :"Корзина пустая" }
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." }
            image={isOrderComplete ? "/img-foto/oform-zaccaz.jpg" :"/img-foto/carobca-pusta.svg"}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;