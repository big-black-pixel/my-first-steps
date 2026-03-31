import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, removeUser } from '../redux/slices/userSlice';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch();
  const { isAuth, currentUser } = useSelector((state) => state.user);
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoginMode, setIsLoginMode] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLoginMode) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        dispatch(setUser({ email: data.user.email, id: data.user.id }));
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Ура! Регистрация успешна. Теперь вы можете войти.');
        setIsLoginMode(true);
      }
    } catch (error) {
      alert(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(removeUser());
  };

  if (isAuth) {
    return (
      <div className="content p-40">
        <h1>Личный кабинет</h1>
        <div className="mt-20 d-flex flex-column" style={{ maxWidth: '300px' }}>
          <p className="mb-20">Добро пожаловать, <br/><b>{currentUser.email}</b>!</p>
          
          <Link to="/orders">
            <button className="greenButton mb-15">
              Мои заказы <img src="/img-foto/strelca-go-zacaz.svg" alt="Arrow" />
            </button>
          </Link>

          <button onClick={handleLogout} className="greenButton" style={{ backgroundColor: '#ff6c6c' }}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content p-40 d-flex flex-column align-center">
      <h1>{isLoginMode ? 'Вход в аккаунт' : 'Регистрация'}</h1>
      
      <form onSubmit={handleAuth} className="d-flex flex-column mt-30" style={{ width: '300px' }}>
        <input 
          required
          type="email" 
          placeholder="Ваш Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-15 p-10"
          style={{ border: '1px solid #f3f3f3', borderRadius: '10px', fontSize: '16px' }}
        />
        <input 
          required
          type="password" 
          placeholder="Пароль (минимум 6 символов)" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-20 p-10"
          style={{ border: '1px solid #f3f3f3', borderRadius: '10px', fontSize: '16px' }}
        />
        <button disabled={isLoading} type="submit" className="greenButton">
          {isLoading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться')}
        </button>
      </form>

      <p className="mt-20 cu-p opacity-6" onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти'}
      </p>
    </div>
  );
}

export default Profile;