import HeroSection from "@/components/home/HeroSection";
import ProjectInquiry from "@/components/home/ProjectInquiry";
import ServicesSection from "@/components/home/ServicesSection";
import ProductsSection from "@/components/home/ProductsSection";
import OrderingProcess from "@/components/home/OrderingProcess";
import RecentWork from "@/components/home/RecentWork";
import ClientFeedback from "@/components/home/ClientFeedback";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProjectInquiry />
      <ServicesSection />
      <ProductsSection />
      <OrderingProcess />
      <RecentWork />
      <ClientFeedback />
      <RecentBlogPosts />
    </main>
  );
}
