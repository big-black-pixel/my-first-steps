import React from 'react'
import AppContext from '../context';

const Info = ({title,image , description}) => {
    const {setCartOpened} = React.useContext(AppContext)
  return (
    <div className="cartEmpty d-flex align-conter  justify-center flex-column flex">
        <img
            className="md -20 "
            width="120px"
            src={image}
            alt="==="
        />
        <h2>{title}</h2>
        <p className="opacity-6">{description}</p>
        <button onClick={() => setCartOpened(false)} className="greenButton">
            <img src="/img-foto/strelca-nazad.png" alt="Arrow" /> Вернуться назад
        </button>
    </div>
  )
}

export default Info;
