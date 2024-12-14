import "./FacilityCard.css";

type FacilityCardProps = {
  imageSrc: string;
  imageAlt: string;
  facilityName: string;
};

function FacilityCard({ imageSrc, imageAlt, facilityName }: FacilityCardProps) {
  return (
    <div className="facility-card">
      <div className="facility-card-image">
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className="facility-card-title">{facilityName}</div>
    </div>
  );
}

export default FacilityCard;
