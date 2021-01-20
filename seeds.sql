-- Users
INSERT INTO Users (email, password, createdAt, updatedAt) VALUES ('test@tester.com', 'testpassword', '2021-01-16', '2021-01-16');

-- Parks
INSERT INTO Parks (name, designation, parkID, states, lat, long, createdAt, updatedAt) VALUES ('Yosemite', 'National Park', 'yose', ,'CA', '37.84883288', '-119.5571873', '2021-01-16', '2021-01-16');
INSERT INTO Parks (name, designation, parkID, states, lat, long, createdAt, updatedAt) VALUES ('Big Bend', 'National Park', 'bibe', ,'AZ', '29.29817767', '-103.2297897', '2021-01-16', '2021-01-16');

-- Profiles
INSERT INTO Profiles (userID, parkID, hasVisited, createdAt, updatedAt) VALUES (1, 'yose', 1, '2021-01-16', '2021-01-16');
INSERT INTO Profiles (userID, parkID, hasVisited, createdAt, updatedAt) VALUES (1, 'bibe', 0, '2021-01-16', '2021-01-16');