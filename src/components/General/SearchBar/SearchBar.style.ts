import type { CSSProperties } from 'react';

type StylesType = {
    form: (height: number, width: number | 'auto') => CSSProperties,
}

const styles: StylesType = {
  form: (height: number, width: number | 'auto') => ({
    height: `${height}px`,
    width: `${width === 'auto' ? width : `${width}px`}`,
    display: 'flex',
    flexDirection: 'row',
  }),
};

export default styles;
