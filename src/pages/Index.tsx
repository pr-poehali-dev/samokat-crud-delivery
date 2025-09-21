import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Моковые данные заказов
  const orders = [
    { id: '001', customer: 'Анна К.', status: 'preparing', items: 5, total: 1250, address: 'ул. Ленина 45' },
    { id: '002', customer: 'Михаил С.', status: 'delivering', items: 3, total: 890, address: 'пр. Мира 12' },
    { id: '003', customer: 'Елена В.', status: 'delivered', items: 7, total: 2100, address: 'ул. Пушкина 8' },
  ];

  // Моковые данные курьеров
  const couriers = [
    { id: 1, name: 'Дмитрий', status: 'active', orders: 2, location: { lat: 55.7558, lng: 37.6176 } },
    { id: 2, name: 'Алексей', status: 'active', orders: 1, location: { lat: 55.7522, lng: 37.6156 } },
    { id: 3, name: 'Мария', status: 'break', orders: 0, location: { lat: 55.7507, lng: 37.6177 } },
  ];

  // Моковые данные товаров
  const products = [
    { id: 1, name: 'Молоко 1л', category: 'Молочные', price: 89, image: '🥛' },
    { id: 2, name: 'Хлеб белый', category: 'Хлеб', price: 45, image: '🍞' },
    { id: 3, name: 'Яблоки 1кг', category: 'Фрукты', price: 159, image: '🍎' },
    { id: 4, name: 'Coca-Cola 0.5л', category: 'Напитки', price: 79, image: '🥤' },
    { id: 5, name: 'Сыр российский', category: 'Молочные', price: 299, image: '🧀' },
    { id: 6, name: 'Бананы 1кг', category: 'Фрукты', price: 119, image: '🍌' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-500';
      case 'delivering': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'preparing': return 'Готовится';
      case 'delivering': return 'В пути';
      case 'delivered': return 'Доставлен';
      default: return 'Неизвестно';
    }
  };

  const addToCart = (product) => {
    const cartItem = {
      ...product,
      cartId: Date.now() + Math.random(),
      quantity: 1
    };
    setCart([...cart, cartItem]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const replaceInCart = (cartId, newProduct) => {
    setCart(cart.map(item => 
      item.cartId === cartId 
        ? { ...newProduct, cartId, quantity: item.quantity }
        : item
    ));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity === 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(cart.map(item => 
      item.cartId === cartId 
        ? { ...item, quantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Icon name="Truck" size={28} className="text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">QuickDelivery</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомления
              </Button>
              <div className="relative">
                <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Корзина ({getTotalItems()})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Корзина товаров</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {cart.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-gray-300" />
                          <p>Корзина пустая</p>
                        </div>
                      ) : (
                        <>
                          {cart.map((item) => (
                            <div key={item.cartId} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="text-2xl">{item.image}</div>
                                  <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <p className="font-bold">₽{item.price} × {item.quantity}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Select onValueChange={(value) => {
                                  const newProduct = products.find(p => p.id === parseInt(value));
                                  if (newProduct) replaceInCart(item.cartId, newProduct);
                                }}>
                                  <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Заменить на..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {products.filter(p => p.id !== item.id).map((product) => (
                                      <SelectItem key={product.id} value={product.id.toString()}>
                                        {product.image} {product.name} - ₽{product.price}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeFromCart(item.cartId)}
                                >
                                  <Icon name="Trash2" size={14} className="mr-1" />
                                  Удалить
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-lg font-medium">Итого:</span>
                              <span className="text-xl font-bold">₽{getTotalPrice()}</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setCart([])}
                              >
                                Очистить корзину
                              </Button>
                              <Button className="flex-1">
                                <Icon name="Check" size={16} className="mr-2" />
                                Оформить заказ
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Панель
            </TabsTrigger>
            <TabsTrigger value="catalog">
              <Icon name="Package" size={16} className="mr-2" />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="tracking">
              <Icon name="MapPin" size={16} className="mr-2" />
              Трекинг
            </TabsTrigger>
            <TabsTrigger value="couriers">
              <Icon name="Users" size={16} className="mr-2" />
              Курьеры
            </TabsTrigger>
          </TabsList>

          {/* Панель управления */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Активные заказы</CardTitle>
                  <Icon name="ShoppingBag" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">+12% от вчера</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Курьеры онлайн</CardTitle>
                  <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">из 12 доступных</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Выручка за день</CardTitle>
                  <Icon name="DollarSign" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₽45,231</div>
                  <p className="text-xs text-muted-foreground">+8% от вчера</p>
                </CardContent>
              </Card>
            </div>

            {/* Список заказов */}
            <Card>
              <CardHeader>
                <CardTitle>Последние заказы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {getStatusText(order.status)}
                        </Badge>
                        <div>
                          <p className="font-medium">Заказ #{order.id}</p>
                          <p className="text-sm text-gray-500">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₽{order.total}</p>
                        <p className="text-sm text-gray-500">{order.items} товаров</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Каталог товаров */}
          <TabsContent value="catalog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Каталог товаров</h2>
              <div className="flex space-x-2">
                <Input placeholder="Поиск товаров..." className="w-64" />
                <Button variant="outline">
                  <Icon name="Search" size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-4xl mb-4 text-center">{product.image}</div>
                    <h3 className="font-medium mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">₽{product.price}</span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Icon name="Plus" size={16} className="mr-1" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Трекинг доставки */}
          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Карта доставки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
                  
                  {/* Имитация карты с точками курьеров */}
                  <div className="relative w-full h-full">
                    {couriers.map((courier) => (
                      <div
                        key={courier.id}
                        className="absolute w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse"
                        style={{
                          left: `${Math.random() * 80 + 10}%`,
                          top: `${Math.random() * 80 + 10}%`
                        }}
                      >
                        <Icon name="Truck" size={16} />
                      </div>
                    ))}
                    
                    <div className="absolute top-4 left-4 bg-white rounded-lg p-4 shadow-lg">
                      <h3 className="font-medium mb-2">Активные доставки</h3>
                      <div className="space-y-2">
                        {orders.filter(o => o.status === 'delivering').map((order) => (
                          <div key={order.id} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">Заказ #{order.id}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статус доставок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.filter(o => o.status === 'delivering').map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Заказ #{order.id}</h4>
                        <Badge className="bg-blue-500 text-white">В пути</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{order.customer}</p>
                      <p className="text-sm text-gray-600 mb-3">{order.address}</p>
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="Clock" size={14} />
                        <span>Осталось ~15 мин</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Панель курьеров */}
          <TabsContent value="couriers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Курьеры</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {couriers.map((courier) => (
                    <div key={courier.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{courier.name}</h3>
                        <Badge className={courier.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                          {courier.status === 'active' ? 'Активен' : 'Перерыв'}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Icon name="Package" size={14} />
                          <span>Заказов: {courier.orders}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="MapPin" size={14} />
                          <span>На карте</span>
                        </div>
                      </div>
                      {courier.status === 'active' && (
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          <Icon name="MessageCircle" size={14} className="mr-2" />
                          Связаться
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;