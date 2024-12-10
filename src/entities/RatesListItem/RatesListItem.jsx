import PropTypes from 'prop-types';
import "./RatesListItem.css";

export default function RatesListItem(props) {

  return (
    <li className="rates__list_item">
      <span className="rates__list_item_currency">{props.currency}</span>
      <span> : </span>
      <span className="rates__list_item_rate">{props.rate}</span>
    </li>
  );
}

RatesListItem.propTypes = {
  currency: PropTypes.string,
  rate: PropTypes.number,
}