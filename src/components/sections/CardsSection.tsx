import { cards } from "@/data/cards";
import Card from "../ui/card";

const CardsSection = () => (
  <div className="relative w-full max-w-[1200px] hidden md:block">
    <div className="flex overflow-x-auto gap-6 p-10 scrollbar-hide">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
        />
      ))}
    </div>
  </div>
);

export default CardsSection;
