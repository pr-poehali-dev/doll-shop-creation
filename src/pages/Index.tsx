import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductCard, { Product } from '../components/ProductCard';
import Filters from '../components/Filters';
import { useToast } from '../hooks/use-toast';

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

export default function Index() {
  const { toast } = useToast();
  const [cart, setCart] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    series: [] as string[],
    years: [] as number[],
    rarity: [] as string[],
    priceRange: [0, 30000] as [number, number],
  });

  const maxPrice = Math.max(...mockProducts.map(p => p.price));

  const filteredProducts = mockProducts.filter((product) => {
    if (filters.series.length > 0 && !filters.series.includes(product.series)) return false;
    if (filters.years.length > 0 && !filters.years.includes(product.year)) return false;
    if (filters.rarity.length > 0 && !filters.rarity.includes(product.rarity)) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    return true;
  });

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    toast({
      title: 'Добавлено в корзину',
      description: `${product.name} - ${product.price.toLocaleString()} ₽`,
    });
  };

  const handleRemoveFromCart = (id: number) => {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const legendaryProducts = mockProducts.filter(p => p.rarity === 'legendary');
  const rareProducts = mockProducts.filter(p => p.rarity === 'rare');

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} onRemoveFromCart={handleRemoveFromCart} />
      <Hero />

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-heading font-bold text-4xl md:text-5xl">
              Полный каталог
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Найдите свою идеальную куклу среди {mockProducts.length} уникальных моделей
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Filters 
                filters={filters} 
                onFilterChange={setFilters}
                maxPrice={maxPrice}
              />
            </div>

            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="text-6xl">😔</div>
                  <p className="text-xl font-heading font-semibold">Ничего не найдено</p>
                  <p className="text-muted-foreground">Попробуйте изменить фильтры</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="py-16">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-heading font-bold text-4xl md:text-5xl">
              Популярные коллекции
            </h2>
            <p className="text-muted-foreground text-lg">
              Самые востребованные серии у коллекционеров
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {rareProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="rare" className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-2xl">💎</span>
              <span className="text-sm font-heading font-semibold text-primary">Эксклюзив</span>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl">
              Редкие экземпляры
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Лимитированные выпуски и раритетные куклы для истинных ценителей
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {legendaryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl">💅</span>
            <span className="font-heading font-bold text-2xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              DollVerse
            </span>
          </div>
          <p className="text-muted-foreground">
            Официальный магазин коллекционных кукол © 2024
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">О нас</a>
            <a href="#" className="hover:text-primary transition-colors">Доставка</a>
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}