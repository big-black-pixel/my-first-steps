import React from "react";
import { Routes , Route } from 'react-router-dom';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";
import { supabase } from "./supabase";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile"; 

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/slices/userSlice';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector(state => state.user);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setUser({ email: session.user.email, id: session.user.id }));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setUser({ email: session.user.email, id: session.user.id }));
      } else {
        setCartItems([]);
        setFavorites([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  React.useEffect(()=>{
     async function fetchData(){
        try {
          setIsLoading(true);
          const { data: itemsData } = await supabase.from('items').select('*');
          setItems(itemsData || []); 

          if (currentUser) {
            const { data: cartData } = await supabase.from('cart').select('*, items(*)').eq('user_id', currentUser.id);
            const formattedCart = cartData ? cartData.map(c => ({
              ...c.items,       
              id: c.id,         
              parentId: c.item_id 
            })) : [];
            setCartItems(formattedCart);

            const { data: favoritesData } = await supabase.from('favorites').select('*, items(*)').eq('user_id', currentUser.id);
            const formattedFavorites = favoritesData ? favoritesData.map(f => ({
              ...f.items,
              id: f.id,
              parentId: f.item_id
            })) : [];
            setFavorites(formattedFavorites);
          }

          setIsLoading(false);
        } catch (error) {
          alert("Ошибка при запросе данных");
          console.error(error);
        }
      }
      fetchData();
    }, [currentUser]);

    const onAddToCart = async (obj) => {
      if (!isAuth) {
        alert("Пожалуйста, войдите в аккаунт, чтобы добавлять товары в корзину!");
        return;
      }

      try {
        const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
        
        if(findItem){
          setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
          await supabase.from('cart').delete().eq('id', findItem.id);
        } else {
          setCartItems(prev => [...prev, { ...obj, parentId: obj.id }]);
          const { data } = await supabase.from('cart').insert([{ item_id: obj.id, user_id: currentUser.id }]).select();
            
          if (data) {
            setCartItems(prev => prev.map(item => {
              if (item.parentId === data[0].item_id) {
                return { ...item, id: data[0].id };
              }
              return item;
            }));
          }
        }
      } catch (error) {
        alert('Не получилось добавить в корзину');
        console.error(error);
      }
    };

    const onRemoveItem = async (id) => {
      try {
        await supabase.from('cart').delete().eq('id', id);
        setCartItems(prev => prev.filter((item) => Number(item.id) !== Number(id)));
      } catch (error) {
        alert('Не получилось удалить из корзины');
        console.error(error);
      }
    }

    const onAddToFavorites = async (obj) => {
      if (!isAuth) {
        alert("Пожалуйста, войдите в аккаунт, чтобы добавлять в закладки!");
        return;
      }

      try {
        const findItem = favorites.find((favObj) => Number(favObj.parentId) === Number(obj.id));

        if(findItem){
          setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
          await supabase.from('favorites').delete().eq('id', findItem.id);
        } else {
          setFavorites((prev) => [...prev, { ...obj, parentId: obj.id }]);
          const { data } = await supabase.from('favorites').insert([{ item_id: obj.id, user_id: currentUser.id }]).select();

          if (data) {
            setFavorites((prev) => prev.map(item => {
              if (item.parentId === data[0].item_id) {
                return { ...item, id: data[0].id };
              }
              return item;
            }));
          }
        }
      } catch (error) {
        alert('Не удалось добавить в фавориты');
        console.error(error);
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
            <Route path="/"
              element={                       
                <Home 
                  items={items}
                  cartItems={cartItems}
                  favorites={favorites} 
                  searchValue={searchValue} 
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToFavorites={onAddToFavorites}
                  setSearchValue={setSearchValue}
                  onAddToCart={onAddToCart}
                  isLoading={isLoading}
                />
              }        
            />
            <Route path="/home"
              element={                       
                <Home 
                  items={items}
                  cartItems={cartItems}
                  favorites={favorites} 
                  searchValue={searchValue} 
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToFavorites={onAddToFavorites}
                  setSearchValue={setSearchValue}
                  onAddToCart={onAddToCart}
                  isLoading={isLoading}
                />
              }        
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} /> 
          </Routes>

        </div>
      </AppContext.Provider>
    );
}
  
export default App;