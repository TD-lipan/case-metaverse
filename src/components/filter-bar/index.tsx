import React, { useMemo, useState } from 'react';
import styles from './index.less';

type FilterType = 'default' | 'hover' | 'selected';

type FilterBarProps = {
  type?: FilterType;
  onClick: () => void;
};

export default function FilterBar(props: FilterBarProps) {
  const { type, onClick } = props;
  const [filterType, setFilterType] = useState<FilterType>(type || 'default');

  const filterBarClass = useMemo(() => {
    switch (filterType) {
      case 'hover':
        return styles.filterBarHover;
      case 'selected':
        return styles.filterBarSelected;
      case 'default':
      default:
        return styles.filterBarDefault;
    }
  }, [filterType]);

  return (
    <div
      className={filterBarClass}
      onMouseOver={() => filterType !== 'selected' && setFilterType('hover')}
      onMouseOut={() => filterType !== 'selected' && setFilterType('default')}
      onClick={() => {
        setFilterType(filterType === 'selected' ? 'default' : 'selected');
        onClick();
      }}
    >
      <div></div>
    </div>
  );
}
