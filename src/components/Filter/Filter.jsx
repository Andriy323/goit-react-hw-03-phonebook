import PropTypes from 'prop-types';
const Filter = ({ handleFilter, value }) => {
  return (
    <div>
      <label>Filter</label>
      <input name="filter" onChange={handleFilter} value={value} />
    </div>
  );
};

export default Filter;

Filter.prototypes = {
  value: PropTypes.string,
  handleFilter: PropTypes.func,
};
