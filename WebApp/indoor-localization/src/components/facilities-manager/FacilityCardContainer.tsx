import FacilityCard from "./FacilityCard";

type FacilityCardProps = {
  imageSrc: string;
  imageAlt: string;
  facilityName: string;
};

type FacilityCardContainerProps = {
  cards: FacilityCardProps[];
};

function FacilityCardContainer({ cards }: FacilityCardContainerProps) {
  return (
    <div className="card-container">
      {cards.map((card) => (
        <FacilityCard
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
          facilityName={card.facilityName}
        />
      ))}
    </div>
  );
}

export default FacilityCardContainer;
