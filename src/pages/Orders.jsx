import React from "react";
import Card from "../components/Card";
import { supabase } from "../supabase"; 

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('orders').select('*');

        if (error) {
          console.error("Ошибка при загрузке заказов:", error);
          alert('Ошибка при загрузке заказов');
          return;
        }

        setOrders(data.reduce((prev, obj) => [...prev, ...(obj.items || [])], []));
        setIsLoading(false);

      } catch (error) {
        alert('Ошибка сервера');
        console.error(error);
      }
    })();
  }, []);

  return (
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои заказы</h1>
        </div>
        
        <div className="sneakers d-flex flex-wrap">
          {(isLoading ? [...Array(10)] : orders).map((item, index) => (
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