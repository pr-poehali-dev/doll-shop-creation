import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const trackingData = {
  45678: {
    status: 'delivered',
    currentStep: 4,
    estimatedDelivery: '2024-12-10',
    courier: 'СДЭК',
    trackingNumber: 'DV-2024-45678-RU',
    history: [
      { date: '2024-12-10 14:30', status: 'Доставлен', location: 'Москва, ул. Ленина 15' },
      { date: '2024-12-10 09:15', status: 'В пути к получателю', location: 'Москва, сортировочный центр' },
      { date: '2024-12-09 16:20', status: 'Прибыл в город назначения', location: 'Москва' },
      { date: '2024-12-08 12:00', status: 'В пути', location: 'Казань' },
      { date: '2024-12-07 10:00', status: 'Отправлен', location: 'Санкт-Петербург, склад DollVerse' },
    ],
  },
  34567: {
    status: 'shipping',
    currentStep: 3,
    estimatedDelivery: '2024-12-13',
    courier: 'Почта России',
    trackingNumber: 'DV-2024-34567-RU',
    history: [
      { date: '2024-12-11 08:45', status: 'В пути', location: 'Екатеринбург' },
      { date: '2024-12-10 14:30', status: 'В пути', location: 'Пермь' },
      { date: '2024-12-08 11:20', status: 'Отправлен', location: 'Санкт-Петербург, склад DollVerse' },
    ],
  },
  23456: {
    status: 'processing',
    currentStep: 1,
    estimatedDelivery: '2024-12-18',
    courier: 'СДЭК',
    trackingNumber: 'DV-2024-23456-RU',
    history: [
      { date: '2024-12-11 15:00', status: 'Комплектация заказа', location: 'Санкт-Петербург, склад DollVerse' },
      { date: '2024-11-28 12:30', status: 'Заказ принят', location: 'Онлайн' },
    ],
  },
};

const steps = [
  { id: 1, label: 'Обработка', icon: 'FileText' },
  { id: 2, label: 'Комплектация', icon: 'Package' },
  { id: 3, label: 'В пути', icon: 'Truck' },
  { id: 4, label: 'Доставлен', icon: 'CheckCircle' },
];

export default function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (orderId && trackingData[orderId as keyof typeof trackingData]) {
      setOrderData(trackingData[orderId as keyof typeof trackingData]);
    }
  }, [orderId]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="text-6xl">📦</div>
          <h1 className="text-2xl font-heading font-bold">Заказ не найден</h1>
          <p className="text-muted-foreground">Проверьте номер заказа и попробуйте снова</p>
          <Button onClick={() => navigate('/')}>Вернуться в магазин</Button>
        </div>
      </div>
    );
  }

  const progress = (orderData.currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
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
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h1 className="font-heading font-bold text-4xl">Отслеживание заказа</h1>
            <p className="text-muted-foreground text-lg">Заказ #{orderId}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center justify-between">
                <span>Статус доставки</span>
                <Badge className={
                  orderData.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  orderData.status === 'shipping' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }>
                  {orderData.status === 'delivered' ? 'Доставлен' :
                   orderData.status === 'shipping' ? 'В пути' :
                   'В обработке'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Progress value={progress} className="h-2" />
                <div className="grid grid-cols-4 gap-4">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`text-center space-y-2 ${
                        step.id <= orderData.currentStep ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                        step.id <= orderData.currentStep 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon name={step.icon as any} size={20} />
                      </div>
                      <p className="text-xs font-medium">{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 pt-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Icon name="Calendar" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Ожидаемая доставка</p>
                  <p className="font-semibold">
                    {new Date(orderData.estimatedDelivery).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Icon name="Truck" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Служба доставки</p>
                  <p className="font-semibold">{orderData.courier}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Icon name="Hash" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Трек-номер</p>
                  <p className="font-mono text-xs font-semibold">{orderData.trackingNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Icon name="History" size={20} />
                История перемещений
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.history.map((event: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                      {index !== orderData.history.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className="font-semibold">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1 font-heading font-semibold" onClick={() => navigate('/account/orders')}>
              <Icon name="Package" size={18} className="mr-2" />
              Все заказы
            </Button>
            <Button variant="outline" className="flex-1 font-heading font-semibold" onClick={() => navigate('/')}>
              Продолжить покупки
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
