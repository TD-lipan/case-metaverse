import React, { useMemo } from 'react';
import styles from './index.less';

export default function ({ type }: { type?: 'default' | 'hover' | 'selected' }) {
    const filterBarClass = useMemo(() => {
        switch (type) {
            case 'hover':
                return styles.filterBarHover;
            case 'selected':
                return styles.filterBarSelected;
            case 'default':
            default:
                return styles.filterBarDefault;
        }
    }, [])
    return (
        <div className={filterBarClass}>
            <div></div>
        </div>
    );
}
