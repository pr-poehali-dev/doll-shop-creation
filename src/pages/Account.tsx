import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const mockOrders = [
  {
    id: 45678,
    date: '2024-12-10',
    status: 'delivered',
    items: 2,
    total: 28400,
    trackingNumber: 'DV-2024-45678-RU',
  },
  {
    id: 34567,
    date: '2024-12-05',
    status: 'shipping',
    items: 1,
    total: 15900,
    trackingNumber: 'DV-2024-34567-RU',
  },
  {
    id: 23456,
    date: '2024-11-28',
    status: 'processing',
    items: 3,
    total: 42100,
    trackingNumber: 'DV-2024-23456-RU',
  },
];

const statusConfig = {
  processing: { label: 'В обработке', color: 'bg-yellow-100 text-yellow-800' },
  shipping: { label: 'В пути', color: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Доставлен', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Отменён', color: 'bg-red-100 text-red-800' },
};

export default function Account() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: 'Вы вышли из аккаунта',
      description: 'До скорой встречи! 👋',
    });
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-2xl">💅</div>
            <span className="font-heading font-bold text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              DollVerse
            </span>
          </button>
          <Button variant="ghost" onClick={handleLogout}>
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl text-white font-heading font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <h1 className="font-heading font-bold text-3xl">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList>
              <TabsTrigger value="orders">
                <Icon name="Package" size={16} className="mr-2" />
                Мои заказы
              </TabsTrigger>
              <TabsTrigger value="profile">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">История заказов</CardTitle>
                  <CardDescription>Просмотр и отслеживание ваших заказов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    return (
                      <div key={order.id} className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-heading font-semibold text-lg">Заказ #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <Badge className={status.color}>{status.label}</Badge>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Товаров</p>
                            <p className="font-semibold">{order.items} шт.</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Сумма</p>
                            <p className="font-semibold text-primary">{order.total.toLocaleString()} ₽</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-muted-foreground">Трек-номер</p>
                            <p className="font-mono text-xs">{order.trackingNumber}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/track-order/${order.id}`)}
                          >
                            <Icon name="MapPin" size={14} className="mr-2" />
                            Отследить
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Info" size={14} className="mr-2" />
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Личные данные</CardTitle>
                  <CardDescription>Управление информацией профиля</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Имя</p>
                        <p className="font-semibold">{user.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Фамилия</p>
                        <p className="font-semibold">{user.lastName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-heading font-semibold">Быстрые действия</h3>
                    <div className="grid gap-2">
                      <Button variant="outline" className="justify-start">
                        <Icon name="MapPin" size={18} className="mr-2" />
                        Управление адресами
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Icon name="CreditCard" size={18} className="mr-2" />
                        Способы оплаты
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Icon name="Bell" size={18} className="mr-2" />
                        Настройки уведомлений
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Icon name="Lock" size={18} className="mr-2" />
                        Изменить пароль
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
