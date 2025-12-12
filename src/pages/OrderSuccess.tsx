import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!orderData) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderNumber, cart, formData, totalPrice, deliveryPrice, finalPrice } = orderData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-2xl">💅</div>
            <span className="font-heading font-bold text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              DollVerse
            </span>
          </button>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4 animate-scale-in">
              <Icon name="Check" size={40} />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl">
              Спасибо за заказ!
            </h1>
            <p className="text-xl text-muted-foreground">
              Ваш заказ <span className="font-semibold text-primary">#{orderNumber}</span> успешно оформлен
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Статус заказа</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      В обработке
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/track-order/${orderNumber}`)}
                >
                  <Icon name="Package" size={18} className="mr-2" />
                  Отследить
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg">Детали заказа</h3>
                <div className="space-y-3">
                  {cart.map((item: any) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.series}</p>
                        <p className="text-sm font-semibold text-primary">
                          {item.price.toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({cart.length})</span>
                  <span className="font-semibold">{totalPrice.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="font-semibold">
                    {deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice.toLocaleString()} ₽`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-heading font-bold">Итого:</span>
                  <span className="font-heading font-bold text-primary text-2xl">
                    {finalPrice.toLocaleString()} ₽
                  </span>
                </div>
              </div>

              <Separator />

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Icon name="User" size={16} />
                    Получатель
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{formData.phone}</p>
                  <p className="text-sm text-muted-foreground">{formData.email}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Icon name="MapPin" size={16} />
                    Адрес доставки
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.city}
                  </p>
                  <p className="text-sm text-muted-foreground">{formData.address}</p>
                  {formData.postalCode && (
                    <p className="text-sm text-muted-foreground">{formData.postalCode}</p>
                  )}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={18} className="text-primary mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">Что дальше?</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Мы отправим подтверждение на {formData.email}</li>
                      <li>Свяжемся с вами по телефону {formData.phone}</li>
                      <li>Отправим трек-номер для отслеживания</li>
                      <li>Доставим заказ в течение 3-7 дней</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 font-heading font-semibold"
              onClick={() => navigate('/')}
            >
              Продолжить покупки
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 font-heading font-semibold"
              onClick={() => navigate('/account/orders')}
            >
              <Icon name="Package" size={18} className="mr-2" />
              Мои заказы
            </Button>
          </div>

          {countdown > 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Автоматический переход в каталог через {countdown} сек.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
