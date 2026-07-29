import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProducerGrid from "@/components/ProducerGrid";
import ProductGrid from "@/components/ProductGrid";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProducerGrid />
        <ProductGrid />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;