import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const TabsSection = () => (
  <div className="relative ">
    {/* Tabs bar mobile */}
    <div className="sm:hidden">
      <Select defaultValue="sales">
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    {/* Tabs bar sur desktop */}
    <Tabs
      defaultValue="sales"
      className="w-full max-w-2xl text-center hidden sm:block"
    >
      <TabsList className="mb-4">
        <TabsTrigger value="sales">Sales</TabsTrigger>
        <TabsTrigger value="marketing">Marketing</TabsTrigger>
        <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
        <TabsTrigger value="engagement">Engagement</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);

export default TabsSection;
