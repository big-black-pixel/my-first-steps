import { useEffect, useState } from "react";
import Card from "../components/Card";
import { supabase } from "../supabase";
import { useSelector } from 'react-redux';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchOrders() {
      try {
        if (currentUser) {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', currentUser.id);
          
          if (error) {
            console.error("Ошибка Supabase:", error);
            alert("Не удалось загрузить заказы с сервера.");
          } else if (data) {
            setOrders(data.map((obj) => obj.items).flat());
          }
        }
      } catch (error) {
        console.error("Ошибка в коде:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [currentUser]);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;