import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FiltersProps {
  filters: {
    series: string[];
    years: number[];
    rarity: string[];
    priceRange: [number, number];
  };
  onFilterChange: (filters: any) => void;
  maxPrice: number;
}

export default function Filters({ filters, onFilterChange, maxPrice }: FiltersProps) {
  const seriesOptions = ['Bratz', 'Monster High', 'Барби'];
  const yearOptions = [2024, 2023, 2022, 2021, 2020, 2019, 2018];
  const rarityOptions = [
    { value: 'common', label: 'Обычная' },
    { value: 'rare', label: 'Редкая' },
    { value: 'legendary', label: 'Легендарная' },
  ];

  const handleSeriesToggle = (series: string) => {
    const newSeries = filters.series.includes(series)
      ? filters.series.filter((s) => s !== series)
      : [...filters.series, series];
    onFilterChange({ ...filters, series: newSeries });
  };

  const handleYearToggle = (year: number) => {
    const newYears = filters.years.includes(year)
      ? filters.years.filter((y) => y !== year)
      : [...filters.years, year];
    onFilterChange({ ...filters, years: newYears });
  };

  const handleRarityToggle = (rarity: string) => {
    const newRarity = filters.rarity.includes(rarity)
      ? filters.rarity.filter((r) => r !== rarity)
      : [...filters.rarity, rarity];
    onFilterChange({ ...filters, rarity: newRarity });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] as [number, number] });
  };

  const resetFilters = () => {
    onFilterChange({
      series: [],
      years: [],
      rarity: [],
      priceRange: [0, maxPrice] as [number, number],
    });
  };

  const activeFiltersCount = 
    filters.series.length + 
    filters.years.length + 
    filters.rarity.length + 
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== maxPrice ? 1 : 0);

  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-xl sticky top-24 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-xl flex items-center gap-2">
          <Icon name="SlidersHorizontal" size={20} />
          Фильтры
        </h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs"
          >
            Сбросить ({activeFiltersCount})
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label className="font-heading font-semibold mb-3 block">Серия</Label>
          <div className="space-y-2">
            {seriesOptions.map((series) => (
              <div key={series} className="flex items-center space-x-2">
                <Checkbox
                  id={`series-${series}`}
                  checked={filters.series.includes(series)}
                  onCheckedChange={() => handleSeriesToggle(series)}
                />
                <label
                  htmlFor={`series-${series}`}
                  className="text-sm cursor-pointer hover:text-primary transition-colors"
                >
                  {series}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Label className="font-heading font-semibold mb-3 block">Год выпуска</Label>
          <div className="space-y-2">
            {yearOptions.map((year) => (
              <div key={year} className="flex items-center space-x-2">
                <Checkbox
                  id={`year-${year}`}
                  checked={filters.years.includes(year)}
                  onCheckedChange={() => handleYearToggle(year)}
                />
                <label
                  htmlFor={`year-${year}`}
                  className="text-sm cursor-pointer hover:text-primary transition-colors"
                >
                  {year}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Label className="font-heading font-semibold mb-3 block">Редкость</Label>
          <div className="space-y-2">
            {rarityOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`rarity-${option.value}`}
                  checked={filters.rarity.includes(option.value)}
                  onCheckedChange={() => handleRarityToggle(option.value)}
                />
                <label
                  htmlFor={`rarity-${option.value}`}
                  className="text-sm cursor-pointer hover:text-primary transition-colors"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Label className="font-heading font-semibold mb-3 block">
            Цена: {filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()} ₽
          </Label>
          <Slider
            min={0}
            max={maxPrice}
            step={1000}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
}
