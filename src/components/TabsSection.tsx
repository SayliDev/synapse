import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const TabsSection = () => (
  <Tabs defaultValue="sales" className="w-full max-w-2xl text-center">
    <TabsList className="mb-4">
      <TabsTrigger value="sales">Sales</TabsTrigger>
      <TabsTrigger value="marketing">Marketing</TabsTrigger>
      <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
      <TabsTrigger value="engagement">Engagement</TabsTrigger>
    </TabsList>
  </Tabs>
);

export default TabsSection;
