import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: "faq1",
    question: "How can I register my cooperative on the South Sudan Agro Marketplace?",
    answer: "To register your cooperative, navigate to the Directory section and click on 'Register Your Business'. You'll need to complete the registration form and upload required documents including your registration certificate, details about your products, location information, and contact details. Our team will review your application and approve it within 2-3 business days.",
    category: "registration"
  },
  {
    id: "faq2",
    question: "What documents do I need to register as a vendor?",
    answer: "For registration as a vendor, you'll need: 1) Business registration certificate, 2) Tax clearance certificate (if applicable), 3) Product catalog or list, 4) Photos of your products, 5) Proof of location (lease agreement or utility bill), and 6) Contact information. Additional documents may be requested depending on the type of products you're selling.",
    category: "registration"
  },
  {
    id: "faq3",
    question: "How can I find buyers for my agricultural products?",
    answer: "Once your profile is approved and listed in our directory, buyers can find you through search filters. You can also list your available products in the marketplace section. Additionally, you can participate in tenders posted on the platform and attend virtual and in-person networking events that we regularly organize to connect farmers with buyers.",
    category: "marketplace"
  },
  {
    id: "faq4",
    question: "Is there a fee to register on the platform?",
    answer: "Basic registration on the South Sudan Agro Marketplace is completely free for farmers, cooperatives, and small-scale vendors. Premium features such as featured listings, advanced analytics, and priority support are available for a small subscription fee. Please contact our support team for current pricing information.",
    category: "general"
  },
  {
    id: "faq5",
    question: "How can I update my profile information?",
    answer: "Log into your account and navigate to your profile section. Click on the 'Edit Profile' button to update your information. For major changes such as business name or registration details, please contact our support team as additional verification may be required.",
    category: "account"
  },
  {
    id: "faq6",
    question: "What types of agricultural products can be listed?",
    answer: "The platform supports listing of all legal agricultural products including crops (cereals, fruits, vegetables, tubers, etc.), livestock, poultry, fish, honey, and processed agricultural products. Products must comply with local regulations and standards.",
    category: "marketplace"
  },
  {
    id: "faq7",
    question: "How can I access the farming tutorials and training materials?",
    answer: "All farming tutorials and training materials are available in the 'Tutorials' and 'Trainings' sections of the website. Most content is freely accessible once you create an account. Some specialized training courses might require registration. Content is available in multiple languages including English, Arabic, and several local languages.",
    category: "resources"
  },
  {
    id: "faq8",
    question: "How do I report pest or disease outbreaks?",
    answer: "To report pest or disease outbreaks, click on the 'Report Disease & Pest Outbreak' button on the homepage or navigate to this section from the main menu. Complete the reporting form with details about the location, affected crops, symptoms observed, and if possible, upload photos. Our team will forward the information to relevant authorities and provide guidance on next steps.",
    category: "services"
  }
];

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState(faqs);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === "") {
      setFilteredFAQs(faqs);
      return;
    }
    
    const filtered = faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredFAQs(filtered);
  };
  
  const filterByCategory = (category: string) => {
    if (category === "all") {
      setFilteredFAQs(faqs);
      return;
    }
    
    const filtered = faqs.filter(faq => faq.category === category);
    setFilteredFAQs(filtered);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Frequently Asked Questions</h1>
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={filterByCategory}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="py-4 text-center text-gray-500">No FAQs matching your search criteria.</p>
            )}
          </Accordion>
        </TabsContent>
        
        {/* Duplicate content structure is automatically handled by the filterByCategory function */}
        <TabsContent value="general" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="py-4 text-center text-gray-500">No FAQs in this category.</p>
            )}
          </Accordion>
        </TabsContent>
        
        {/* Other tab contents follow the same pattern */}
        <TabsContent value="registration" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="py-4 text-center text-gray-500">No FAQs in this category.</p>
            )}
          </Accordion>
        </TabsContent>
        
        <TabsContent value="marketplace" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="py-4 text-center text-gray-500">No FAQs in this category.</p>
            )}
          </Accordion>
        </TabsContent>
        
        <TabsContent value="account" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="py-4 text-center text-gray-500">No FAQs in this category.</p>
            )}
          </Accordion>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="py-4 text-center text-gray-500">No FAQs in this category.</p>
            )}
          </Accordion>
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Can't find what you're looking for?</h2>
        <p className="mb-4">
          If you have a question that isn't answered here, please feel free to contact our support team.
        </p>
        <div className="flex gap-4">
          <Button className="bg-agro-blue hover:bg-blue-800">Contact Support</Button>
          <Button variant="outline">Submit a Question</Button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
