const Card = (props) => {
  return (
    <div className="card" refid={props.card.id} onClick={props.selectCard}>
      <i
        className={`fas ${props.card.icon}`}
        style={{ color: props.color }}
      ></i>
      {/* <div>{props.card.isSelected ? "yes" : "no"}</div> */}
    </div>
  );
};

export default Card;
