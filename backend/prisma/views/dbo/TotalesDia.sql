SELECT
  SUM(TotalMonetarioVendido) AS TotalVendido,
  SUM(TotalProductosVendidos) AS TotalProductos,
  Fecha
FROM
  dbo.Totales
GROUP BY
  Fecha;