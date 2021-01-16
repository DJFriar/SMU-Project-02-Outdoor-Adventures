-- Users
INSERT INTO Users (email, password, createdAt, updatedAt) VALUES ('test@tester.com', 'testpassword', '2021-01-16', '2021-01-16');

-- Parks
INSERT INTO Parks (name, designation, state, createdAt, updatedAt) VALUES ('Yosemite', 'National Park', 'CA', '2021-01-16', '2021-01-16');
INSERT INTO Parks (name, designation, state, createdAt, updatedAt) VALUES ('Grand Canyon', 'National Park', 'AZ', '2021-01-16', '2021-01-16');
INSERT INTO Parks (name, designation, state, createdAt, updatedAt) VALUES ('Glen Canyon', 'National Recreation Area', 'AZ', '2021-01-16', '2021-01-16');
INSERT INTO Parks (name, designation, state, createdAt, updatedAt) VALUES ('Big Bend', 'National Park', 'TX', '2021-01-16', '2021-01-16');
INSERT INTO Parks (name, designation, state, createdAt, updatedAt) VALUES ('Fort Davis', 'National Historic Site', 'TX', '2021-01-16', '2021-01-16');

-- Profiles
INSERT INTO Profiles (userID, parkID, isWishlist, hasVisited, createdAt, updatedAt) VALUES (1, 1, 0, 1, '2021-01-16', '2021-01-16');
INSERT INTO Profiles (userID, parkID, isWishlist, hasVisited, createdAt, updatedAt) VALUES (1, 2, 0, 1, '2021-01-16', '2021-01-16');
INSERT INTO Profiles (userID, parkID, isWishlist, hasVisited, createdAt, updatedAt) VALUES (1, 5, 1, 0, '2021-01-16', '2021-01-16');