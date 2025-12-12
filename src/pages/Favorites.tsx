import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useFavorites } from '@/context/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function Favorites() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { favorites } = useFavorites();
  const [cart, setCart] = useState<any[]>([]);

  const handleAddToCart = (product: any) => {
    setCart([...cart, product]);
    toast({
      title: 'Добавлено в корзину',
      description: `${product.name} - ${product.price.toLocaleString()} ₽`,
    });
  };

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
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-4xl mb-2 flex items-center gap-3">
                <Icon name="Heart" size={32} className="text-red-500" />
                Избранное
              </h1>
              <p className="text-muted-foreground">
                {favorites.length === 0 
                  ? 'У вас пока нет избранных товаров' 
                  : `Сохранено кукол: ${favorites.length}`
                }
              </p>
            </div>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-20 space-y-6 animate-fade-in">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-4">
                <Icon name="Heart" size={48} className="text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="font-heading font-bold text-2xl">Пока пусто</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Добавляйте понравившиеся куклы в избранное, нажав на иконку сердечка на карточке товара
                </p>
              </div>
              <Button size="lg" onClick={() => navigate('/')} className="font-heading font-semibold">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Перейти в каталог
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="font-heading font-semibold"
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить еще
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
