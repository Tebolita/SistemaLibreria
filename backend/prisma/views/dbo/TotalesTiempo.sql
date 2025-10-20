SELECT
  TOP (100) PERCENT SUM(TotalMonetarioVendido) AS TotalVendido,
  SUM(TotalProductosVendidos) AS TotalProductos,
  MONTH(Fecha) AS Mes,
  YEAR(Fecha) AS Anio
FROM
  dbo.Totales
GROUP BY
  YEAR(Fecha),
  MONTH(Fecha)
ORDER BY
  Anio,
  Mes;