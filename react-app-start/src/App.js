import React from "react";
import {Routes , Route } from 'react-router-dom';
import axios from 'axios' 
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

   
    React.useEffect(()=>{
     async function fetchData(){
        try {
          const [caetResponse, favoritesResponse, itemsResponse,] = await Promise.all([
            axios.get('https://686cd86b14219674dcc95632.mockapi.io/cart'),
            axios.get('https://687500d2dd06792b9c9643cc.mockapi.io/favorites1'),
            axios.get('https://686cd86b14219674dcc95632.mockapi.io/items')
          ])

          setIsLoading(false)
  
          setCartItems(caetResponse.data)
          setFavorites(favoritesResponse.data)
          setItems(itemsResponse.data)
        } catch (error) {
          alert("Ошибка при запросе данных ")
          console.error(error)
        }
      }
      fetchData()
    },[])

    const onAddToCart = async (obj) => {
      try {
        const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
        if(findItem){
          setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
          await axios.delete(`https://686cd86b14219674dcc95632.mockapi.io/cart/${findItem.id}`)
        }else{
          setCartItems(prev => [...prev, obj])
          const {data} = await axios.post('https://686cd86b14219674dcc95632.mockapi.io/cart', obj)
          setCartItems(prev => prev.map(item => {
            if (item.parentId === data.parentId) {
              return{...item, id: data.id}
            }
            return item                              
          }))
        }
      } catch (error) {
        alert('Не получилось добавить в корзину ')
        console.error(error)
      }
      
    };

    const onRemoveItem = (id) => {
      try {
        axios.delete(`https://686cd86b14219674dcc95632.mockapi.io/cart/${id}`)
        setCartItems(prev => prev.filter((item) => Number(item.id) !== Number(id)))
      } catch (error) {
        alert('Не получилось удолить из корзины')
        console.error(error)
      }
    }

    const onAddToFavorites = async (obj) => {
      try {
        if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
          axios.delete(`https://687500d2dd06792b9c9643cc.mockapi.io/favorites1/${obj.id}`)
          setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        }else{
        const {data} = await axios.post('https://687500d2dd06792b9c9643cc.mockapi.io/favorites1', obj)
        setFavorites((prev) => [...prev, data])
        }
      } catch (error) {
        alert('Не удолось добавить в фавориты')
        console.error(error)
      }

    };

    const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
    }

    const isItemAdded = (id) => {
      return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    }

    return (
      <AppContext.Provider 
        value = { {
          items, 
          cartItems, 
          favorites, 
          isItemAdded, 
          onAddToFavorites, 
          onAddToCart,
          setCartOpened, 
          setCartItems, 
        } } >
        
        <div className="wrapper clear">
        <Drawer items={cartItems} 
          onClose = { () => setCartOpened(false)} 
          onRemove ={onRemoveItem}   
          opened={cartOpened}
        />

          <Header onClickCart = { () => setCartOpened(true)} />
    
          <Routes>
            <Route path="/home"
              element={                       
                <Home 
                items = {items}
                cartItems = {cartItems}
                favorites = {favorites} 
                searchValue = {searchValue} 
                onChangeSearchInput = {onChangeSearchInput}
                onAddToFavorites = {onAddToFavorites}
                setSearchValue = {setSearchValue}
                onAddToCart = {onAddToCart}
                isLoading = {isLoading}
                />
              }        
              > 
            </Route>
          </Routes>

          <Routes>
            <Route path="/favorites"
                element={
                  <Favorites />
                }        
              > 
            </Route>
          </Routes>

          <Routes>
            <Route path="/orders"
                element={
                  <Orders />
                }        
              > 
            </Route>
          </Routes>

        </div>
      </AppContext.Provider>
    );
  }
  
  export default App;

  