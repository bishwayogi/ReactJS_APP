import React, { useCallback, useMemo, useRef } from "react";
import ProductListItem from "./ProductListItem";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import "react-virtualized/styles.css";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

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
    for (let i = 0; i < list.length; i += 5) {
      grouped.push(list.slice(i, i + 5));
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
          <div key={key} style={style}>
            <Grid container spacing={2} sx={{ px: 2 }}>
              {rowProducts.map((p, idx) => (
                <Grid item xs={12} sm={6} md={2.4} key={idx}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <ProductListItem product={p} onAddToCart={onAddToCart} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </CellMeasurer>
      );
    },
    [rows, onAddToCart]
  );

  if (!count) {
    return (
      <Box
        sx={{
          height: 280,
          display: "grid",
          placeItems: "center",
          color: "text.secondary",
          border: (t) => `1px dashed ${t.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Typography>No products to display.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height, borderRadius: 2, overflow: "hidden" }}>
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
    </Box>
  );
}
