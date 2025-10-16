SELECT
  TOP (100) PERCENT DF.IdFactura AS Factura,
  SUM(DF.Cantidad) AS TotalProductosVendidos,
  SUM(DF.Subtotal) AS TotalMonetarioVendido,
  MAX(EF.Fecha) AS Fecha
FROM
  dbo.DetalleFactura AS DF
  JOIN dbo.EstadoFactura AS EF ON DF.IdFactura = EF.IdFactura
WHERE
  (EF.IdEstadoEnvio = 4)
GROUP BY
  DF.IdFactura
ORDER BY
  Factura DESC;