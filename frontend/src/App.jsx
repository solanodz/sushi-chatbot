import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Componente para el ítem del menú
const MenuItem = ({ item, onAdd, onRemove, quantity = 0 }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
    <div className="flex-1">
      <h3 className="font-medium text-gray-800">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.description}</p>
      <p className="text-indigo-600 font-medium">${item.price.toFixed(2)}</p>
    </div>
    <div className="flex items-center space-x-3">
      <button
        onClick={() => onRemove(item)}
        className={`w-8 h-8 rounded-full flex items-center justify-center
                   ${quantity > 0
            ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        disabled={quantity === 0}
      >
        -
      </button>
      <span className="w-6 text-center">{quantity}</span>
      <button
        onClick={() => onAdd(item)}
        className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 
                 hover:bg-indigo-200 flex items-center justify-center"
      >
        +
      </button>
    </div>
  </div>
);

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.required,
    description: PropTypes.string,
    price: PropTypes.number.required
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  quantity: PropTypes.number
};

// Componente para el carrito
const Cart = ({ items, total, onDeliveryChange, delivery, deliveryAddress, onAddressChange }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <h3 className="font-medium text-gray-800 mb-3">Tu Pedido</h3>
    {items.map(item => (
      <div key={item.name} className="flex justify-between text-sm mb-2">
        <span>{item.quantity}x {item.name}</span>
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    ))}
    <div className="border-t border-gray-200 mt-3 pt-3">
      {/* Opción de envío */}
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          id="delivery"
          checked={delivery}
          onChange={(e) => onDeliveryChange(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 
                   border-gray-300 rounded cursor-pointer"
        />
        <label htmlFor="delivery" className="ml-2 text-sm text-gray-700">
          ¿Deseas envío a domicilio?
        </label>
      </div>

      {/* Campo de dirección */}
      {delivery && (
        <div className="mb-3">
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="Ingresa la dirección de entrega"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                     text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between font-medium">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.required,
    price: PropTypes.number.required,
    quantity: PropTypes.number.required
  })).isRequired,
  total: PropTypes.number.isRequired,
  onDeliveryChange: PropTypes.func.isRequired,
  delivery: PropTypes.bool.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  onAddressChange: PropTypes.func.isRequired
};

// Componente de Reserva
const ReservationForm = ({ onSubmit }) => {
  const [reservation, setReservation] = useState({
    date: '',
    time: '',
    partySize: 2,
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Obtener la fecha actual en formato ISO y ajustar la zona horaria
  const today = new Date();
  const tzOffset = today.getTimezoneOffset() * 60000; // offset en milisegundos
  const localISOTime = (new Date(today - tzOffset)).toISOString().split('T')[0];

  const availableHours = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reservation);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            min={localISOTime}
            value={reservation.date}
            onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Hora */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora
          </label>
          <select
            value={reservation.time}
            onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccionar hora</option>
            {availableHours.map(hour => (
              <option key={hour} value={hour}>{hour}</option>
            ))}
          </select>
        </div>

        {/* Cantidad de personas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad de personas
          </label>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setReservation(prev => ({
                ...prev,
                partySize: Math.max(1, prev.partySize - 1)
              }))}
              className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600
                       hover:bg-indigo-200 flex items-center justify-center"
            >
              -
            </button>
            <span className="w-12 text-center">{reservation.partySize}</span>
            <button
              type="button"
              onClick={() => setReservation(prev => ({
                ...prev,
                partySize: Math.min(20, prev.partySize + 1)
              }))}
              className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600
                       hover:bg-indigo-200 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={reservation.name}
            onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            value={reservation.phone}
            onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={reservation.email}
            onChange={(e) => setReservation({ ...reservation, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Notas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notas adicionales
        </label>
        <textarea
          value={reservation.notes}
          onChange={(e) => setReservation({ ...reservation, notes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md
                   focus:outline-none focus:ring-1 focus:ring-indigo-500"
          rows="3"
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg
                 hover:bg-indigo-700 transition-colors"
      >
        Confirmar Reserva
      </button>
    </form>
  );
};

ReservationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

function App() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: '¡Bienvenido a nuestro restaurante! 🍱\n\nPuedo ayudarte con:\n- Ver el menú\n- Tomar tu pedido\n- Hacer una reserva\n- Información del local'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const messagesEndRef = useRef(null);
  const [delivery, setDelivery] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Manejar agregar/quitar items
  const handleAddItem = (item) => {
    setCart(prev => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1
    }));
  };

  const handleRemoveItem = (item) => {
    if (!cart[item.name]) return;

    setCart(prev => ({
      ...prev,
      [item.name]: prev[item.name] - 1
    }));
  };

  // Calcular total y items del carrito
  const cartItems = menuItems
    .filter(item => cart[item.name] > 0)
    .map(item => ({
      ...item,
      quantity: cart[item.name]
    }));

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  // Enviar pedido
  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) return;

    // Validar dirección si se seleccionó envío
    if (delivery && !deliveryAddress.trim()) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Por favor, ingresa una dirección de entrega válida.',
        error: true
      }]);
      return;
    }

    setMessages(prev => [...prev,
    {
      type: 'bot',
      content: `📋 Resumen de tu pedido:\n\n${cartItems.map(item =>
        `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`
      ).join('\n')}\n\nTotal: $${cartTotal.toFixed(2)}${delivery ? `\n\n🚚 Envío a: ${deliveryAddress}` : '\n\n🏪 Retiro en local'
        }\n\n¿Deseas confirmar este pedido?`,
      options: ["✅ Confirmar pedido", "🔄 Modificar pedido"]
    }
    ]);

    setShowMenu(false);
  };

  const handleOptionClick = async (option) => {
    // Add user's selection to chat
    setMessages(prev => [...prev, {
      type: 'user',
      content: option
    }]);

    if (option === "Ver menú" || option === "Tomar tu pedido") {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        const menuData = await response.json();
        setMenuItems(menuData);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: '¡Aquí tienes nuestro menú! Selecciona los productos que desees:',
          showMenu: true
        }]);
      } catch (error) {
        console.error('Error loading menu:', error);
      }
      return;
    }

    if (option === "Hacer una reserva") {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: '¡Por supuesto! Por favor, completa los siguientes datos para tu reserva:',
        showReservationForm: true
      }]);
      return;
    }

    if (option === "Información del local") {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: `🏮 Información del Restaurante:

📍 Dirección: Av. Example 123, Ciudad
📞 Teléfono: (123) 456-7890
⏰ Horarios:
   Lunes a Jueves: 12:00 - 15:00 y 19:00 - 23:00
   Viernes y Sábado: 12:00 - 15:00 y 19:00 - 00:00
   Domingo: 12:00 - 15:00 y 19:00 - 22:00

🅿️ Estacionamiento disponible
💳 Aceptamos todas las tarjetas
🌐 www.turestaurante.com`,
        options: ["Ver menú", "Hacer una reserva", "Tomar tu pedido"]
      }]);
      return;
    }

    // Agregar manejo de confirmación de pedido
    if (option === "✅ Confirmar pedido") {
      try {
        // Formatear los items del carrito
        const formattedItems = cartItems.map(item => ({
          nombre: item.name,
          cantidad: item.quantity,
          precio: item.price,
          subtotal: item.price * item.quantity
        }));

        // Calcular el total nuevamente para asegurarnos
        const total = formattedItems.reduce((sum, item) => sum + item.subtotal, 0);

        const orderData = {
          items: formattedItems,
          totalPedido: Number(total.toFixed(2)), // Cambiado de 'total' a 'totalPedido'
          delivery: Boolean(delivery),
          direccionEntrega: delivery ? deliveryAddress : '',
          estado: 'pendiente'
        };

        console.log('Enviando orden:', orderData);

        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al crear el pedido');
        }

        // Actualizar mensajes y limpiar carrito
        setMessages(prev => [...prev,
        {
          type: 'user',
          content: '✅ Confirmar pedido'
        },
        {
          type: 'bot',
          content: '¡Tu pedido ha sido confirmado! Te avisaremos cuando esté listo.'
        }
        ]);

        // Limpiar estado
        setCart({});
        setDelivery(false);
        setDeliveryAddress('');
        setShowMenu(false);

      } catch (error) {
        console.error('Error completo:', error);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: `Error al procesar tu pedido: ${error.message}`,
          error: true,
          options: ['🔄 Modificar pedido']
        }]);
      }
    } else if (option === "🔄 Modificar pedido") {
      setShowMenu(true);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Por favor, modifica tu pedido:',
        showMenu: true
      }]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const message = inputMessage.toLowerCase();
    setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
    setInputMessage('');

    // Si el usuario quiere hacer una reserva
    if (message.includes('reserva') || message.includes('reservar') ||
      message.includes('mesa')) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: '¡Por supuesto! Por favor, completa los siguientes datos para tu reserva:',
        showReservationForm: true
      }]);
      return;
    }

    // Si el usuario pide ver el menú
    if (message.includes('menu') || message.includes('pedir') ||
      message.includes('ordenar') || message.includes('quiero')) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        const menuData = await response.json();
        setMenuItems(menuData);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: '¡Aquí tienes nuestro menú! Selecciona los productos que desees:',
          showMenu: true
        }]);
      } catch (error) {
        console.error('Error loading menu:', error);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: 'Lo siento, hubo un error al cargar el menú. Por favor, intenta nuevamente.',
          error: true
        }]);
      }
      setIsLoading(false);
      return;
    }

    // Resto de la lógica del chat...
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          orderId: currentOrderId
        }),
      });

      const data = await response.json();

      // Solo agregamos mensajes al chat si no estamos mostrando el menú
      if (!showMenu) {
        setMessages(prev => [...prev, {
          type: 'bot',
          content: data.response,
          options: data.options || [],
          error: data.error
        }]);
      }

      if (data.orderId) {
        setCurrentOrderId(data.orderId);
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Lo siento, hubo un error. Por favor, intenta nuevamente.',
        error: true
      }]);
    }
    setIsLoading(false);
  };

  // Agregar el manejador de la reserva
  const handleReservationSubmit = async (reservationData) => {
    setIsLoading(true);
    try {

      const response = await fetch('http://localhost:5000/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'confirmar reserva',
          reservationData
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev,
      {
        type: 'user',
        content: `He realizado una reserva para ${reservationData.partySize} personas el ${reservationData.date} a las ${reservationData.time}`
      },
      {
        type: 'bot',
        content: data.response,
        options: data.options || [],
      }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Error al procesar la reserva. Por favor, intenta nuevamente.',
        error: true
      }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">🍱 Challenge Nular. Chatbot para pedir sushi</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : message.error
                    ? 'bg-red-100 text-red-800 rounded-bl-sm shadow-md'
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-md'
                  }`}
              >
                <div className="text-sm whitespace-pre-wrap">
                  {message.content}
                </div>
                {message.showMenu && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      {menuItems.map(item => (
                        <MenuItem
                          key={item.name}
                          item={item}
                          onAdd={handleAddItem}
                          onRemove={handleRemoveItem}
                          quantity={cart[item.name] || 0}
                        />
                      ))}
                    </div>
                    {Object.keys(cart).length > 0 && (
                      <div className="space-y-4">
                        <Cart
                          items={cartItems}
                          total={cartTotal}
                          delivery={delivery}
                          deliveryAddress={deliveryAddress}
                          onDeliveryChange={setDelivery}
                          onAddressChange={setDeliveryAddress}
                        />
                        <button
                          onClick={handleSubmitOrder}
                          className="w-full py-2 bg-indigo-600 text-white rounded-lg
                                   hover:bg-indigo-700 disabled:bg-gray-400
                                   disabled:cursor-not-allowed transition-colors"
                        >
                          Confirmar Pedido
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {message.options && message.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-full
                                 text-sm hover:bg-indigo-700 transition-colors
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {message.showReservationForm && (
                  <div className="mt-4">
                    <ReservationForm onSubmit={handleReservationSubmit} />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white shadow-lg border-t border-gray-200"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 disabled:bg-gray-400
                     disabled:cursor-not-allowed transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
