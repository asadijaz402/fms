import { createContext } from 'react';
import PropTypes from 'prop-types';
import useFilter from '../hook/useFilter';

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const filter = useFilter();

  return (
    <FilterContext.Provider value={{ ...filter }}>
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterContext;
