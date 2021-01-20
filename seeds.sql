-- Users
INSERT INTO Users (email, password, createdAt, updatedAt) VALUES ('test@tester.com', 'testpassword', '2021-01-16', '2021-01-16');

-- Parks
INSERT INTO Parks (name, designation, parkID, createdAt, updatedAt) VALUES ('Yosemite', 'National Park', 'yose', '2021-01-16', '2021-01-16');
INSERT INTO Parks (name, designation, parkID, createdAt, updatedAt) VALUES ('Big Bend', 'National Park', 'bibe', '2021-01-16', '2021-01-16');

-- Profiles
INSERT INTO Profiles (userID, parkID, hasVisited, createdAt, updatedAt) VALUES (1, 'yose', 1, '2021-01-16', '2021-01-16');
INSERT INTO Profiles (userID, parkID, hasVisited, createdAt, updatedAt) VALUES (1, 'bibe', 0, '2021-01-16', '2021-01-16');