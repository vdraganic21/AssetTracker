import "./FacilityCard.css";

type FacilityCardProps = {
  imageSrc: string;
  imageAlt: string;
  facilityName: string;
};

function FacilityCard({ imageSrc, imageAlt, facilityName }: FacilityCardProps) {
  return (
    <div className="card">
      <img src={imageSrc} alt={imageAlt} className="card-image" />
      <div className="card-title">{facilityName}</div>
    </div>
  );
}

export default FacilityCard;
