import { cards } from "@/data/cards";
import Card from "../ui/card";

const CardsSection = () => (
  <div className="flex gap-6 justify-center items-center p-10 max-w-[1200px]">
    {cards.map((card, index) => (
      <Card
        key={index}
        title={card.title}
        subtitle={card.subtitle}
        description={card.description}
      />
    ))}
  </div>
);

export default CardsSection;
