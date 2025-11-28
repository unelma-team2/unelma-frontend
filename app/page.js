import HeroSection from "@/components/home/HeroSection";
import InquiryAndMetrics from "@/components/home/InquiryAndMetrics";
import Services from "@/components/home/Services.jsx";
import Products from "@/components/home/Products.jsx";
import OrderingProcess from "@/components/home/OrderingProcess";
import RecentWork from "@/components/home/RecentWork";
import ClientFeedback from "@/components/home/ClientFeedback";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";
import BackToTopButton from "@/components/BackToTopButton";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InquiryAndMetrics />
      <Services />
      <Products />
      <OrderingProcess />
      <RecentWork />
      <ClientFeedback />
      <RecentBlogPosts />
      <BackToTopButton />
    </>
  );
}
