import React from 'react';
import {Link} from 'react-router-dom';
                            
import { useCart } from './hooks/useCart'; 


function Header(props){
  const {totalPrice,} = useCart()

    return(
        <header className="d-flex justify-between align-center p-40">
          <Link to = "../home">
            <div className="d-flex align-center">
              <img width={40} height={40} src="/img-foto/image 4.png" alt="Logotype" />
              <div>
                <h3 className="text-uppercase">React Sneakers</h3>
                <p className="opacity-5">Магазин лучших кроссовок</p>
              </div>
            </div>
          </Link>
          <ul className="d-flex">
            <li onClick={props.onClickCart} className="mr-30 cu-p">
              <img width={18} height={18} src="/img-foto/corzina-2.svg" alt="Корзина" />
              <span>{totalPrice} руб.</span>
            </li>
            <li className="mr-20 cu-p">
              <Link to="../favorites">
                <img width={18} height={18} src="/img-foto/sirdechco-zacladci.svg" alt= "Закладки"/>
              </Link>
            </li>
            <li>
              <Link to="../orders">
                <img width={18} height={18} src="/img-foto/iconca-ch.svg" alt= "Пользоватеь"/>
              </Link>
            </li>
          </ul>
        </header>
    )
}
export default Header;