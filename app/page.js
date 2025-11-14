import HeroSection from "@/components/home/HeroSection";
import InquiryAndMetrics from "@/components/home/InquiryAndMetrics";
import ServicesSection from "@/components/home/ServicesSection";
import ProductsSection from "@/components/home/ProductsSection";
import OrderingProcess from "@/components/home/OrderingProcess";
import RecentWork from "@/components/home/RecentWork";
import ClientFeedback from "@/components/home/ClientFeedback";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InquiryAndMetrics />
      <ServicesSection />
      <ProductsSection />
      <OrderingProcess />
      <RecentWork />
      <ClientFeedback />
      <RecentBlogPosts />
    </>
  );
}
