import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur rounded-full border border-primary/20">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-medium text-primary">Эксклюзивная коллекция 2024</span>
          </div>

          <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Куклы мечты
            </span>
            <br />
            <span className="text-foreground">для коллекционеров</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bratz, Monster High и Барби — редкие экземпляры и лимитированные серии от официальных дилеров. 
            Подлинность гарантирована! 💎
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="text-lg h-14 px-8 bg-primary hover:bg-primary/90 font-heading font-semibold"
              onClick={scrollToCatalog}
            >
              Смотреть каталог
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg h-14 px-8 border-2 font-heading font-semibold"
              onClick={() => {
                const element = document.getElementById('rare');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Редкие куклы 🔥
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            {[
              { icon: '🎁', label: 'Подлинность', desc: '100% оригинал' },
              { icon: '🚚', label: 'Доставка', desc: 'По всей России' },
              { icon: '⭐', label: 'Гарантия', desc: 'Возврат 14 дней' },
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center space-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl">{item.icon}</div>
                <p className="font-heading font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </section>
  );
}
