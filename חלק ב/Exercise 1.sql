-- Create People table
CREATE TABLE People (
  Person_Id INT PRIMARY KEY,
  First_Name NVARCHAR(50),
  Last_Name NVARCHAR(50),
  Gender NVARCHAR(10),
  Father_Id INT,
  Mother_Id INT,
  Spouse_Id INT
);

-- Insert data into People table
INSERT INTO People VALUES
(1, N'Sheri', N'Levy', N'Female', 16, 2, 11),
(2, N'Tzira', N'Oppenheim', N'Female', 16, 22, 12),
(3, N'Elimelech', N'Beckerman', N'Male', 16, 22, 13),
(4, N'Miri', N'Wolfin', N'Female', 16, 22, 14),
(5, N'Gitty', N'Sterling', N'Female', 16, 22, 15),
(6, N'Ayla', N'Beckerman', N'Female', 16, 22, NULL),
(7, N'Aryeh', N'Beckerman', N'Male', 16, 22, NULL),
(8, N'Naomi', N'Beckerman', N'Female', 16, 22, NULL),
(9, N'Moishe', N'Beckerman', N'Male', 16, 22, NULL),
(10, N'Hani', N'Beckerman', N'Female', 16, 22, NULL),
(11, N'Tzvi', N'Levy', N'Male', NULL, NULL, NULL),
(12, N'Shlomo', N'Oppenheim', N'Male', NULL, NULL, NULL),
(13, N'Devora', N'Beckerman', N'Female', NULL, NULL, NULL),
(14, N'Eli', N'Wolfin', N'Male', NULL, NULL, NULL),
(15, N'Zevi', N'Sterling', N'Male', NULL, NULL, NULL),
(16, N'Chaim', N'Beckerman', N'Male', NULL, NULL, 22),
(22, N'Frida', N'Beckerman', N'Female', NULL, NULL, 16);

-- Create Relatives table
CREATE TABLE Relatives (
  Person_Id INT,
  Relative_Id INT,
  Relation_Type NVARCHAR(20),
  CONSTRAINT chk_ConnectionType CHECK (Relation_Type IN (
    N'Father', N'Mother',
    N'Son', N'Daughter',
    N'Brother', N'Sister',
    N'Husband', N'Wife'
  ))
);

-- ===== Insert bi-directional relationships =====

-- Father
INSERT INTO Relatives
SELECT Person_Id, Father_Id, N'Father'
FROM People
WHERE Father_Id IS NOT NULL;

INSERT INTO Relatives
SELECT Father_Id, Person_Id,
  CASE WHEN Gender = N'Male' THEN N'Son' ELSE N'Daughter' END
FROM People
WHERE Father_Id IS NOT NULL;

-- Mother
INSERT INTO Relatives
SELECT Person_Id, Mother_Id, N'Mother'
FROM People
WHERE Mother_Id IS NOT NULL;

INSERT INTO Relatives
SELECT Mother_Id, Person_Id,
  CASE WHEN Gender = N'Male' THEN N'Son' ELSE N'Daughter' END
FROM People
WHERE Mother_Id IS NOT NULL;

-- Spouses
INSERT INTO Relatives
SELECT 
  Person_Id, 
  Spouse_Id,
  CASE WHEN Gender = N'Male' THEN N'Wife' ELSE N'Husband' END
FROM People
WHERE Spouse_Id IS NOT NULL;

INSERT INTO Relatives
SELECT 
  Spouse_Id,
  Person_Id,
  CASE WHEN Gender = N'Male' THEN N'Husband' ELSE N'Wife' END
FROM People
WHERE Spouse_Id IS NOT NULL;

-- Siblings
INSERT INTO Relatives
SELECT 
  p1.Person_Id,
  p2.Person_Id,
  CASE WHEN p2.Gender = N'Male' THEN N'Brother' ELSE N'Sister' END
FROM People p1
JOIN People p2 ON 
  p1.Person_Id <> p2.Person_Id
  AND (
    (p1.Father_Id IS NOT NULL AND p1.Father_Id = p2.Father_Id)
    OR
    (p1.Mother_Id IS NOT NULL AND p1.Mother_Id = p2.Mother_Id)
  );

INSERT INTO Relatives
SELECT 
  p2.Person_Id,
  p1.Person_Id,
  CASE WHEN p1.Gender = N'Male' THEN N'Brother' ELSE N'Sister' END
FROM People p1
JOIN People p2 ON 
  p1.Person_Id <> p2.Person_Id
  AND (
    (p1.Father_Id IS NOT NULL AND p1.Father_Id = p2.Father_Id)
    OR
    (p1.Mother_Id IS NOT NULL AND p1.Mother_Id = p2.Mother_Id)
  );

SELECT * FROM Relatives ORDER BY Person_Id;
