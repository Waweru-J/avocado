import PropTypes from "prop-types";

const Card = ({ children, bg = "" }) => {
  return <div className={` ${bg} `}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.string,
};

export default Card;
