import type { CSSProperties } from 'react';

type StylesType = {
    form: (height: number, width: number) => CSSProperties,
}

const styles: StylesType = {
  form: (height: number, width: number) => ({
    height: `${height}px`,
    width: `${width}px`,
    display: 'flex',
    flexDirection: 'row',
  }),
};

export default styles;
