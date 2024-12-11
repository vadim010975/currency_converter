import PropTypes from 'prop-types';
import "./InputListItem.css";

export default function InputListItem(props) {

  function onClick() {
    props.onClick(props.item);
  }

  return (
    <li onClick={onClick} className="converter__list_item">
      {props.item}
    </li>
  );
}

InputListItem.propTypes = {
  item: PropTypes.string,
  onClick: PropTypes.func,
}