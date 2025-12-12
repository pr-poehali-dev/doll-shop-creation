import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useFavorites } from '@/context/FavoritesContext';

export interface Product {
  id: number;
  name: string;
  series: string;
  year: number;
  price: number;
  image: string;
  rarity: 'common' | 'rare' | 'legendary';
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const rarityConfig = {
  common: { label: 'Обычная', color: 'bg-muted text-muted-foreground' },
  rare: { label: 'Редкая', color: 'bg-secondary text-secondary-foreground' },
  legendary: { label: 'Легендарная', color: 'bg-primary text-primary-foreground' },
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const rarity = rarityConfig[product.rarity];
  const favorite = isFavorite(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fade-in cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Badge className={`absolute top-3 right-3 ${rarity.color}`}>
          {rarity.label}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 left-3 bg-background/80 backdrop-blur hover:bg-background transition-colors ${
            favorite ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={handleToggleFavorite}
        >
          <Icon name={favorite ? 'Heart' : 'Heart'} size={20} fill={favorite ? 'currentColor' : 'none'} />
        </Button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">Нет в наличии</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="font-heading font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {product.series} • {product.year}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-primary font-heading">
            {product.price.toLocaleString()} ₽
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full font-heading font-semibold"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <>
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              В корзину
            </>
          ) : (
            'Нет в наличии'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}