import React, { useCallback, useMemo, useRef } from "react";
import ProductListItem from "./ProductListItem";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import "react-virtualized/styles.css";

export default function VirtualProductListAdaptive({
  products = [],
  onAddToCart,
  height = 720,
  minRowHeight = 132,
}) {
  const list = Array.isArray(products) ? products : [];
  const count = list.length;

  // --- Group products into rows of 5 ---
  const rows = useMemo(() => {
    const grouped = [];
    for (let i = 0; i < list.length; i += 4) {
      grouped.push(list.slice(i, i + 4));
    }
    return grouped;
  }, [list]);

  const cacheRef = useRef(
    new CellMeasurerCache({
      defaultHeight: minRowHeight,
      fixedWidth: true,
    })
  );

  const rowRenderer = useCallback(
    ({ index, key, parent, style }) => {
      const rowProducts = rows[index];
      if (!rowProducts || rowProducts.length === 0)
        return <div key={key} style={style} />;

      return (
        <CellMeasurer
          cache={cacheRef.current}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          <div
            key={key}
            style={{
              ...style,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              padding: "8px 16px",
              boxSizing: "border-box",
            }}
          >
            {rowProducts.map((p, idx) => (
              <div
                key={idx}
                style={{
                  flex: "1 1 calc(20% - 16px)", // 5 per row with spacing
                  minWidth: "180px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  background: "#fff",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <ProductListItem product={p} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        </CellMeasurer>
      );
    },
    [rows, onAddToCart]
  );

  if (!count) {
    return (
      <div
        style={{
          //height: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#777",
          border: "1px dashed #ccc",
          borderRadius: "8px",
          fontSize: "16px",
          fontFamily: "sans-serif",
        }}
      >
        No products to display.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: "8px",
        overflow: "hidden",
        background: "#fafafa",
      }}
    >
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            width={width}
            height={height}
            rowCount={rows.length}
            deferredMeasurementCache={cacheRef.current}
            rowHeight={cacheRef.current.rowHeight}
            rowRenderer={rowRenderer}
            overscanRowCount={4}
          />
        )}
      </AutoSizer>
    </div>
  );
}
