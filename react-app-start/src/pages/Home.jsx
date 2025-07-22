import React from "react";
import Card from "../components/Card";

function Home({
items = [] ,
searchValue = '' ,
onChangeSearchInput ,
onAddToFavorites ,
onAddToCart ,
setSearchValue,
isLoading,

}){

  const renderItems = () => {
    const filtredItems =  items.filter((item) => 
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (isLoading ? [...Array(10)] : filtredItems).map((item) => (
      <Card
      onFavorite = {onAddToFavorites}
      onPlus = {onAddToCart}                 
      loading = { isLoading}
      {...item}
    />
    ))
  }


  return(
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : `Все кроссовки`}</h1>
            <div className="search-block d-flex">
                <img src="\img-foto\poiscovic-crosovoc.svg" alt="Search" />
                {searchValue && (
                    <img onClick={() => setSearchValue('')} 
                    className="clear cu-p " 
                    src="/img-foto/x-otmena-activ.svg" 
                    alt="Clear"/>
                )}
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..." />
            </div>
      </div>
      
      <div className="sneakers d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  )
}
export default Home;