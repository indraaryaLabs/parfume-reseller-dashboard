import Hero from '../components/Hero';
import ProductCatalog from '../components/ProductCatalog';
import UpcomingRestock from '../components/UpcomingRestock';
import Brands from '../components/Brands';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <ProductCatalog />
      <UpcomingRestock />
      <Brands />
    </div>
  );
}
