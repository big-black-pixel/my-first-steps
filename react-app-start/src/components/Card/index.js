import styles from './Card.module.scss';
import React from 'react';
import AppContext from '../../context';
import ContentLoader from "react-content-loader"

function Card({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const {isItemAdded} = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, imageUrl, title, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={0}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="235" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
        ) : (
        <>
          {onFavorite && (<div className={styles.favorite} onClick={onClickFavorite}>
            <img
              src={isFavorite ? "/img-foto/sirdechco-activ.svg" : "/img-foto/sirdechco.svg"}
              alt="Unliked"
            />
          </div>)}

          <img width={133} height={112} src={imageUrl} alt="" />

          <h5>{title}</h5>

          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>

            {onPlus && (<img
              className={styles.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? "./img-foto/galachca-activ.svg" : "./img-foto/Plusic-galachca-activ.svg"}
              alt="Plus"
            />)}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;