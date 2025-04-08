-- Section B
-- Complete the spouse ID for couples where only one partner has it filled
UPDATE p2
SET Spouse_Id = p1.Person_Id
FROM People p1
JOIN People p2 ON p1.Spouse_Id = p2.Person_Id
WHERE p2.Spouse_Id IS NULL;

SELECT Person_Id, Personal_Name, Spouse_Id
FROM People
ORDER BY Person_Id;
