import React from 'react';

type Props<T> = {
  data: T[];
  renderItem: ({ item, index }: { item: T, index: number }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  ItemSeparatorComponent?: () => React.ReactElement | null;
  ListHeaderComponent?: () => React.ReactElement | null;
  ListFooterComponent?: () => React.ReactElement | null;
  ListEmptyComponent?: () => React.ReactElement | null;
  ListType?: 'ordered' | 'unordered';
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  separatorStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
};

function FlatList<T>({
  data,
  renderItem,
  keyExtractor,
  ItemSeparatorComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  ListType,
  containerStyle,
  itemStyle,
  separatorStyle,
  headerStyle,
  footerStyle,
}: Props<T>) {
  let Wrapper: keyof JSX.IntrinsicElements | typeof React.Fragment = React.Fragment;
  let ItemWrapper: keyof JSX.IntrinsicElements = 'div';

  if (ListType === 'ordered') {
    Wrapper = 'ol';
    ItemWrapper = 'li';
  } else if (ListType === 'unordered') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Wrapper = 'ul';
    ItemWrapper = 'li';
  }

  return (
    <div style={containerStyle}>
      {ListHeaderComponent && (
        <div style={headerStyle}>
          {ListHeaderComponent()}
        </div>
      )}
      {data && data.length ? (
        <>
          {data.map((item, index) => {
            const ItemElement = ItemWrapper;

            return (
              <ItemElement
                key={keyExtractor(item, index)}
                style={itemStyle}
              >
                {renderItem({ item, index })}
                {ItemSeparatorComponent && index < data.length - 1 && (
                  <div style={separatorStyle}>
                    {ItemSeparatorComponent()}
                  </div>
                )}
              </ItemElement>
            );
          })}
        </>
      ) : (
        ListEmptyComponent && (
          <div>
            {ListEmptyComponent()}
          </div>
        )
      )}
      {ListFooterComponent && (
        <div style={footerStyle}>
          {ListFooterComponent()}
        </div>
      )}
    </div>
  );
}

export default FlatList;
