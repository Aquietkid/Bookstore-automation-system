Create database Test_ali

CREATE TABLE `Supplier` (
  `ID` int PRIMARY KEY,
  `Name` varchar(50),
  `Phone` varchar(12)
);

INSERT INTO Test_ali.Supplier VALUES (1, 'SampleSupplier', '123')


ALTER USER 'avnadmin' 
IDENTIFIED WITH mysql_native_password BY 'AVNS_7dw5-zuiWf5KtkR9U0S';