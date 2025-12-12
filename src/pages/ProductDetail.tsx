import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/components/ProductCard';
import ProductCard from '@/components/ProductCard';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Bratz Yasmin Night Out',
    series: 'Bratz',
    year: 2024,
    price: 15900,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/bb2837a4-58f0-4e02-9dbc-a3f6a1efebdc.jpg',
    rarity: 'legendary',
    inStock: true,
  },
  {
    id: 2,
    name: 'Monster High Draculaura',
    series: 'Monster High',
    year: 2023,
    price: 12500,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/bfe23047-7737-4ef7-862c-273cc2944054.jpg',
    rarity: 'rare',
    inStock: true,
  },
  {
    id: 3,
    name: 'Барби Signature Pink',
    series: 'Барби',
    year: 2024,
    price: 18900,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/232128bb-1928-429c-a5c2-d5d8bef89b31.jpg',
    rarity: 'legendary',
    inStock: true,
  },
  {
    id: 4,
    name: 'Bratz Cloe Rock Angelz',
    series: 'Bratz',
    year: 2023,
    price: 14200,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/bb2837a4-58f0-4e02-9dbc-a3f6a1efebdc.jpg',
    rarity: 'rare',
    inStock: true,
  },
  {
    id: 5,
    name: 'Monster High Cleo de Nile',
    series: 'Monster High',
    year: 2022,
    price: 11800,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/bfe23047-7737-4ef7-862c-273cc2944054.jpg',
    rarity: 'common',
    inStock: true,
  },
  {
    id: 6,
    name: 'Барби Коллекционная Holiday',
    series: 'Барби',
    year: 2021,
    price: 24500,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/232128bb-1928-429c-a5c2-d5d8bef89b31.jpg',
    rarity: 'legendary',
    inStock: false,
  },
  {
    id: 7,
    name: 'Bratz Jade Passion 4 Fashion',
    series: 'Bratz',
    year: 2024,
    price: 16700,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/bb2837a4-58f0-4e02-9dbc-a3f6a1efebdc.jpg',
    rarity: 'rare',
    inStock: true,
  },
  {
    id: 8,
    name: 'Monster High Frankie Stein',
    series: 'Monster High',
    year: 2024,
    price: 13900,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/bfe23047-7737-4ef7-862c-273cc2944054.jpg',
    rarity: 'rare',
    inStock: true,
  },
  {
    id: 9,
    name: 'Барби Extra Glam',
    series: 'Барби',
    year: 2023,
    price: 9900,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/232128bb-1928-429c-a5c2-d5d8bef89b31.jpg',
    rarity: 'common',
    inStock: true,
  },
  {
    id: 10,
    name: 'Bratz 20th Anniversary',
    series: 'Bratz',
    year: 2021,
    price: 28900,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/bb2837a4-58f0-4e02-9dbc-a3f6a1efebdc.jpg',
    rarity: 'legendary',
    inStock: true,
  },
  {
    id: 11,
    name: 'Monster High Lagoona Blue',
    series: 'Monster High',
    year: 2023,
    price: 10500,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/bfe23047-7737-4ef7-862c-273cc2944054.jpg',
    rarity: 'common',
    inStock: true,
  },
  {
    id: 12,
    name: 'Барби Fashionista',
    series: 'Барби',
    year: 2024,
    price: 7900,
    image: 'https://cdn.poehali.dev/projects/ed853190-34f8-4d97-bf52-1f1e6df84066/files/232128bb-1928-429c-a5c2-d5d8bef89b31.jpg',
    rarity: 'common',
    inStock: true,
  },
];

const rarityConfig = {
  common: { label: 'Обычная', color: 'bg-muted text-muted-foreground' },
  rare: { label: 'Редкая', color: 'bg-secondary text-secondary-foreground' },
  legendary: { label: 'Легендарная', color: 'bg-primary text-primary-foreground' },
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">😔</div>
          <h1 className="text-2xl font-heading font-bold">Товар не найден</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const rarity = rarityConfig[product.rarity];

  const handleAddToCart = (productToAdd?: Product) => {
    const targetProduct = productToAdd || product;
    toast({
      title: 'Добавлено в корзину',
      description: `${targetProduct.name} (${productToAdd ? 1 : quantity} шт.) - ${(targetProduct.price * (productToAdd ? 1 : quantity)).toLocaleString()} ₽`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
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
        <div className="grid lg:grid-cols-2 gap-12 animate-fade-in">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge className={`absolute top-4 right-4 ${rarity.color} text-base px-4 py-2`}>
                {rarity.label}
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{product.series}</span>
                <span>•</span>
                <span>{product.year} год</span>
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-primary font-heading">
                  {product.price.toLocaleString()} ₽
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Количество:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full h-14 text-lg font-heading font-semibold"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? (
                  <>
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Добавить в корзину • {(product.price * quantity).toLocaleString()} ₽
                  </>
                ) : (
                  'Нет в наличии'
                )}
              </Button>

              {product.inStock && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Icon name="Check" size={16} />
                  <span>В наличии</span>
                </div>
              )}
            </div>

            <Separator />

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="specs">Характеристики</TabsTrigger>
                <TabsTrigger value="delivery">Доставка</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4 pt-4">
                <p className="text-muted-foreground leading-relaxed">
                  {product.rarity === 'legendary' 
                    ? `Эксклюзивная коллекционная кукла ${product.name} — настоящая жемчужина для истинных ценителей! Лимитированный выпуск ${product.year} года. Каждая деталь проработана с ювелирной точностью: роскошный наряд, аксессуары премиум-класса и уникальный дизайн делают эту куклу настоящим произведением искусства.`
                    : product.rarity === 'rare'
                    ? `Редкая коллекционная кукла ${product.name} из серии ${product.series}. Выпущена в ${product.year} году ограниченным тиражом. Отличается стильным дизайном, качественными материалами и детальной проработкой образа. Отличное пополнение для коллекции!`
                    : `Кукла ${product.name} из популярной серии ${product.series}. Выпуск ${product.year} года. Яркий дизайн, качественное исполнение и доступная цена делают эту модель отличным выбором как для игры, так и для начинающих коллекционеров.`
                  }
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <Icon name="Sparkles" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-sm">Подлинность</p>
                      <p className="text-xs text-muted-foreground">100% оригинал</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Package" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-sm">Упаковка</p>
                      <p className="text-xs text-muted-foreground">Оригинальная коробка</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Shield" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-sm">Гарантия</p>
                      <p className="text-xs text-muted-foreground">30 дней</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Star" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-sm">Состояние</p>
                      <p className="text-xs text-muted-foreground">Новая</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="specs" className="space-y-3 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Серия</span>
                    <span className="font-semibold">{product.series}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Год выпуска</span>
                    <span className="font-semibold">{product.year}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Редкость</span>
                    <span className="font-semibold">{rarity.label}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Артикул</span>
                    <span className="font-semibold">DV-{product.id.toString().padStart(4, '0')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Высота</span>
                    <span className="font-semibold">28-30 см</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Материал</span>
                    <span className="font-semibold">Пластик, текстиль</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="delivery" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Truck" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Доставка по России</p>
                      <p className="text-sm text-muted-foreground">СДЭК, Почта России — от 3 до 7 дней</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Самовывоз</p>
                      <p className="text-sm text-muted-foreground">Бесплатно из пункта выдачи в вашем городе</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CreditCard" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Оплата</p>
                      <p className="text-sm text-muted-foreground">Онлайн картой или при получении</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="RotateCcw" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Возврат</p>
                      <p className="text-sm text-muted-foreground">14 дней с момента получения</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Separator className="my-16" />

        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              Похожие товары
            </h2>
            <p className="text-muted-foreground">
              Другие куклы из серии {product.series}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.series === product.series && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}