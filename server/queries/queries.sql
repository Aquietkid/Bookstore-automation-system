Create database Test_ali

CREATE TABLE `Supplier` (
  `ID` int PRIMARY KEY,
  `Name` varchar(50),
  `Phone` varchar(12)
);

INSERT INTO Test_ali.Supplier VALUES (1, 'SampleSupplier', '123')


ALTER USER 'avnadmin' 
IDENTIFIED WITH mysql_native_password BY 'AVNS_7dw5-zuiWf5KtkR9U0S';

ALTER TABLE Test_ali.Supplier
MODIFY ID int auto_increment

INSERT INTO Test_ali.Supplier (Name, Phone) VALUES
('Kaif Books', '0312-1234567'), 
('Lala Book Depot', '0300-1234567'),
('Anees Book Corner', '0322-1234567'),
('Iqbal Book Corner', '0341-1234567'),
('Vanguard Books', '042-123-123'), 
('Allied Books', '042-124-124'),
('Mahmood Paper Works', '042-130-130');

UPDATE Test_ali.Supplier SET Phone = '0346-1234567' WHERE ID=1;