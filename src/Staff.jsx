import React, { useState, useEffect } from 'react';
import './App.css';

const firstNames = [
  'Jack', 'Megan', 'Sam', 'Leo', 'Nina', 'Oscar', 'Paul', 'Quinn', 'Rita', 'Steve', 'Tom', 'Carlos', 'Frank', 'Alice', 'Hank', 'Grace', 'Ivy', 'Uma', 'Vera', 'Will', 'Xena', 'Yara', 'Zane', 'Bob', 'Dana', 'Eve', 'Max', 'Lara', 'Ben',
  // Tina variations
  'Tina', 'Tina-Marie', 'Tina-Louise', 'Tina-Rose', 'Tina-May', 'Tina-Jane', 'Tina-Lee', 'Tina-Belle', 'Tina-Rae', 'Tina-Faye', 'Tina-Lynn', 'Tina-Sue', 'Tina-Ann', 'Tina-Kay', 'Tina-Joy', 'Tina-Dawn', 'Tina-Sky', 'Tina-Jo', 'Tina-Jean', 'Tina-Eve',
  'Tina-Elle', 'Tina-Claire', 'Tina-Beth', 'Tina-Kate', 'Tina-Paige', 'Tina-Jules', 'Tina-Lauren', 'Tina-Ash', 'Tina-Maeve', 'Tina-Gwen', 'Tina-Liz', 'Tina-Mira', 'Tina-Nell', 'Tina-Pearl', 'Tina-Shea', 'Tina-Tess', 'Tina-Wren', 'Tina-Zoe', 'Tina-Blaire', 'Tina-Cleo',
  'Tina-Demi', 'Tina-Fern', 'Tina-Gia', 'Tina-Hope', 'Tina-Iris', 'Tina-Jade', 'Tina-Kira', 'Tina-Lex', 'Tina-Mona', 'Tina-Nina',
  // 200 more unique names
  'Aaliyah', 'Abel', 'Abram', 'Ada', 'Adaline', 'Adan', 'Addison', 'Adelaide', 'Aden', 'Adrian', 'Agnes', 'Aidan', 'Aileen', 'Aimee', 'Ainsley', 'Aisha', 'Alaina', 'Alana', 'Alani', 'Alaric',
  'Alba', 'Alec', 'Alejandra', 'Alejandro', 'Alena', 'Alessandra', 'Alex', 'Alexa', 'Alexia', 'Alexis', 'Alia', 'Alina', 'Alisa', 'Alison', 'Alistair', 'Alivia', 'Aliyah', 'Alma', 'Alondra', 'Alton',
  'Alvin', 'Alyson', 'Amara', 'Amari', 'Amaya', 'Amber', 'Amelia', 'Amelie', 'Amina', 'Amira', 'Amy', 'Ana', 'Anahi', 'Anastasia', 'Anderson', 'Andre', 'Andrea', 'Andres', 'Andrew', 'Andy',
  'Angel', 'Angela', 'Angelica', 'Angelina', 'Angelo', 'Anika', 'Anisa', 'Anita', 'Ann', 'Anna', 'Annabel', 'Annabella', 'Annabelle', 'Annalise', 'Anne', 'Annie', 'Ansley', 'Anthony', 'Antoinette', 'Anton',
  'Antonia', 'April', 'Archer', 'Ari', 'Aria', 'Ariana', 'Arianna', 'Ariel', 'Arjun', 'Arlo', 'Armando', 'Armani', 'Arnav', 'Artem', 'Arthur', 'Arturo', 'Arya', 'Asa', 'Ash', 'Asher',
  'Ashley', 'Ashton', 'Aspen', 'Astrid', 'Athena', 'Atlas', 'Atticus', 'Aubree', 'Aubrey', 'Audrey', 'August', 'Aurelia', 'Aurora', 'Austin', 'Ava', 'Avah', 'Avery', 'Axel', 'Ayden', 'Azalea',
  'Bailey', 'Barbara', 'Barrett', 'Barry', 'Beau', 'Beckett', 'Belinda', 'Ben', 'Benedict', 'Benjamin', 'Bennett', 'Benson', 'Bentley', 'Bernard', 'Bernice', 'Beth', 'Bethany', 'Bianca', 'Bill', 'Billy',
  'Blaine', 'Blair', 'Blake', 'Blanca', 'Blaze', 'Bo', 'Bobbie', 'Bonnie', 'Boris', 'Boston', 'Bowen', 'Boyd', 'Brady', 'Braelyn', 'Branden', 'Brandon', 'Brantley', 'Brayden', 'Brenda', 'Brendan',
  'Brent', 'Brett', 'Brian', 'Briana', 'Brianna', 'Bridget', 'Briggs', 'Brinley', 'Bristol', 'Brittany', 'Brock', 'Brody', 'Bronson', 'Brooke', 'Brooklyn', 'Bruce', 'Bruno', 'Bryan', 'Bryant', 'Bryce',
  'Brynn', 'Bryson', 'Buddy', 'Buster', 'Byron', 'Cadence', 'Caiden', 'Caitlin', 'Caleb', 'Callie', 'Calvin', 'Camden', 'Cameron', 'Camila', 'Camille', 'Campbell', 'Candace', 'Cara', 'Carina', 'Carissa',
  'Carla', 'Carlee', 'Carley', 'Carlo', 'Carlos', 'Carmen', 'Carol', 'Carolina', 'Caroline', 'Carrie', 'Carson', 'Carter', 'Casey', 'Cassandra', 'Cassidy', 'Catalina', 'Catherine', 'Cecelia', 'Cecilia', 'Celeste',
  'Celia', 'Chad', 'Chance', 'Chandler', 'Channing', 'Chantal', 'Charity', 'Charlene', 'Charles', 'Charlie', 'Charlotte', 'Chase', 'Chelsea', 'Cher', 'Cherish', 'Cheryl', 'Cheyenne', 'Chris', 'Christian', 'Christina',
  'Christine', 'Christopher', 'Claire', 'Clara', 'Clarence', 'Clark', 'Claudia', 'Clay', 'Clayton', 'Clementine', 'Cleo', 'Clifford', 'Clint', 'Clinton', 'Clyde', 'Cody', 'Colby', 'Cole', 'Colin', 'Colleen',
  'Collin', 'Colt', 'Colton', 'Conner', 'Connie', 'Connor', 'Constance', 'Cooper', 'Corbin', 'Corey', 'Cory', 'Courtney', 'Craig', 'Cristian', 'Crystal', 'Curtis', 'Cynthia', 'Daisy', 'Dakota', 'Dale',
  'Dallas', 'Dalton', 'Damian', 'Damon', 'Dan', 'Dana', 'Daniel', 'Danielle', 'Danny', 'Daphne', 'Darian', 'Darius', 'Darla', 'Darlene', 'Darrell', 'Darren', 'Darryl', 'Darwin', 'Dave', 'David',
  'Dawn', 'Dayton', 'Dean', 'Deanna', 'Deborah', 'Declan', 'Dee', 'Deena', 'Deidre', 'Deirdre', 'Delaney', 'Delilah', 'Della', 'Demetrius', 'Denise', 'Dennis', 'Derek', 'Desmond', 'Destiny', 'Devin',
  'Devon', 'Dexter', 'Diamond', 'Diana', 'Diane', 'Diego', 'Dillon', 'Dina', 'Dion', 'Dixie', 'Dominic', 'Dominique', 'Don', 'Donald', 'Donna', 'Donovan', 'Dora', 'Dorothy', 'Doug', 'Douglas',
  'Drake', 'Drew', 'Duane', 'Duke', 'Duncan', 'Dustin', 'Dwayne', 'Dwight', 'Dylan', 'Earl', 'Eddie', 'Eden', 'Edgar', 'Edith', 'Edmund', 'Edward', 'Edwin', 'Eileen', 'Elaine', 'Eli',
  'Eliana', 'Elias', 'Elijah', 'Elise', 'Eliza', 'Elizabeth', 'Ella', 'Ellen', 'Ellie', 'Elliot', 'Elliott', 'Ellis', 'Elmer', 'Elsa', 'Elsie', 'Elton', 'Elvin', 'Elvira', 'Elyse', 'Emerson',
  'Emery', 'Emilia', 'Emily', 'Emma', 'Emmanuel', 'Emmett', 'Enrique', 'Enzo', 'Eric', 'Erica', 'Erick', 'Erik', 'Erin', 'Ernest', 'Esteban', 'Estelle', 'Esther', 'Ethan', 'Eugene', 'Eva',
  'Evan', 'Eve', 'Evelyn', 'Everett', 'Ezra', 'Faith', 'Fallon', 'Faye', 'Felicia', 'Felipe', 'Felix', 'Fern', 'Fernando', 'Fiona', 'Finn', 'Fisher', 'Flora', 'Florence', 'Floyd', 'Flynn',
  'Forest', 'Forrest', 'Frances', 'Francesca', 'Francine', 'Francis', 'Frank', 'Frankie', 'Franklin', 'Fred', 'Freddie', 'Frederick', 'Gabriel', 'Gage', 'Gail', 'Gale', 'Gavin', 'Gene', 'Genesis', 'Geoffrey',
  'George', 'Georgia', 'Gerald', 'Geraldine', 'Gilbert', 'Gina', 'Ginger', 'Giovanni', 'Giselle', 'Gladys', 'Glen', 'Glenda', 'Glenn', 'Gloria', 'Goldie', 'Gordon', 'Grace', 'Gracie', 'Grant', 'Grayson',
  'Greg', 'Gregory', 'Greta', 'Gretchen', 'Griffin', 'Guadalupe', 'Gunnar', 'Gwen', 'Gwendolyn', 'Hailey', 'Haley', 'Hallie', 'Hank', 'Hannah', 'Harley', 'Harmony', 'Harold', 'Harper', 'Harrison', 'Harry',
  'Hazel', 'Heather', 'Heidi', 'Helen', 'Helena', 'Henry', 'Herbert', 'Holly', 'Hope', 'Howard', 'Hudson', 'Hugh', 'Hunter', 'Ian', 'Ibrahim', 'Ike', 'Iliana', 'Imani', 'India', 'Indigo',
  'Ingrid', 'Ira', 'Irene', 'Iris', 'Irma', 'Isaac', 'Isabel', 'Isabella', 'Isabelle', 'Isaias', 'Isla', 'Ismael', 'Israel', 'Ivan', 'Ivy', 'Jace', 'Jackie', 'Jackson', 'Jaclyn', 'Jada',
  'Jade', 'Jaime', 'Jake', 'Jalen', 'Jamal', 'James', 'Jamie', 'Jan', 'Jana', 'Jane', 'Janet', 'Janice', 'Jared', 'Jasmin', 'Jasmine', 'Jason', 'Jasper', 'Jay', 'Jayden', 'Jayla',
  'Jaylen', 'Jean', 'Jeanne', 'Jeff', 'Jefferson', 'Jeffrey', 'Jenna', 'Jennifer', 'Jenny', 'Jeremiah', 'Jeremy', 'Jerome', 'Jerry', 'Jesse', 'Jessica', 'Jessie', 'Jesus', 'Jill', 'Jim', 'Jimmie',
  'Jimmy', 'Joan', 'Joanna', 'Joanne', 'Jocelyn', 'Jodi', 'Jody', 'Joe', 'Joel', 'Joey', 'John', 'Johnathan', 'Johnny', 'Jon', 'Jonah', 'Jonathan', 'Jordan', 'Jordyn', 'Jose', 'Joseph',
  'Joshua', 'Josiah', 'Joy', 'Juan', 'Judith', 'Judy', 'Julia', 'Julian', 'Julie', 'Juliet', 'June', 'Justin', 'Kaden', 'Kai', 'Kaia', 'Kaitlyn', 'Kale', 'Kaleb', 'Kali', 'Kameron',
  'Kamila', 'Kane', 'Karen', 'Karla', 'Karlee', 'Karly', 'Karson', 'Karter', 'Kasey', 'Kassandra', 'Kassidy', 'Kate', 'Katelyn', 'Katerina', 'Kathleen', 'Kathryn', 'Kathy', 'Katie', 'Katlyn', 'Kay',
  'Kayden', 'Kayla', 'Kaylee', 'Kayleigh', 'Keegan', 'Keira', 'Keith', 'Kellan', 'Kelley', 'Kelly', 'Kelsey', 'Kelvin', 'Ken', 'Kendall', 'Kendra', 'Kennedy', 'Kenneth', 'Kenny', 'Kent', 'Kerry',
  'Kevin', 'Kiara', 'Kiera', 'Kim', 'Kimber', 'Kimberly', 'King', 'Kingston', 'Kira', 'Kirk', 'Kirsten', 'Kit', 'Kobe', 'Kody', 'Kolby', 'Kole', 'Kora', 'Kourtney', 'Krista', 'Kristen',
  'Kristin', 'Kristina', 'Kristopher', 'Kurt', 'Kyla', 'Kyle', 'Kyler', 'Kylie', 'Kyra', 'Lacey', 'Laila', 'Lake', 'Lana', 'Lance', 'Landon', 'Lane', 'Larry', 'Laura', 'Laurel', 'Lauren',
  'Laurie', 'Lawrence', 'Layla', 'Leah', 'Leandro', 'Lee', 'Leila', 'Leilani', 'Leland', 'Lena', 'Leo', 'Leon', 'Leonard', 'Leonardo', 'Leona', 'Leslie', 'Lester', 'Levi', 'Lewis', 'Lexi',
  'Lia', 'Liana', 'Libby', 'Lila', 'Lilah', 'Lilian', 'Liliana', 'Lillian', 'Lillie', 'Lilly', 'Lincoln', 'Linda', 'Lindsay', 'Lindsey', 'Lisa', 'Liz', 'Liza', 'Logan', 'London', 'Londyn',
  'Loren', 'Lorena', 'Lorenzo', 'Loretta', 'Lori', 'Lorraine', 'Lou', 'Louisa', 'Louis', 'Louise', 'Lucas', 'Lucia', 'Lucille', 'Lucy', 'Luisa', 'Lukas', 'Luna', 'Luther', 'Lydia', 'Lyla'
  ,'Sophie', 'Olivia', 'Emma', 'Ava', 'Charlotte', 'Amelia', 'Harper', 'Ella', 'Abigail', 'Emily', 'Elizabeth', 'Mia', 'Scarlett', 'Victoria', 'Madison', 'Luna', 'Layla', 'Penelope', 'Aria', 'Chloe',
  'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Alexander', 'Mason', 'Michael', 'Ethan', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Levi', 'Sebastian', 'Mateo',
  'Aiden', 'Matthew', 'David', 'Joseph', 'Samuel', 'Carter', 'Owen', 'Wyatt', 'John', 'Jack', 'Luke', 'Jayden', 'Dylan', 'Grayson', 'Leah', 'Zoey', 'Stella', 'Hazel', 'Aurora', 'Natalie',
  'Brooklyn', 'Savannah', 'Skylar', 'Nova', 'Paisley', 'Genesis', 'Bella', 'Autumn', 'Ruby', 'Serenity', 'Kennedy', 'Alice', 'Clara', 'Vivian', 'Gabriella', 'Hailey', 'Elena', 'Ariana', 'Allison', 'Sarah',
  'Nathan', 'Isaac', 'Caleb', 'Christian', 'Hunter', 'Joshua', 'Andrew', 'Lincoln', 'Christopher', 'Thomas', 'Charles', 'Eli', 'Jonathan', 'Connor', 'Landon', 'Adrian', 'Jaxon', 'Roman', 'Asher', 'Ryan',
  'Easton', 'Aaron', 'Ezekiel', 'Colton', 'Cameron', 'Carson', 'Robert', 'Angel', 'Maverick', 'Nicholas', 'Dominic', 'Jace', 'Adam', 'Ian', 'Austin', 'Santiago', 'Jordan', 'Cooper', 'Brayden', 'Miles',
  'Sawyer', 'Jason', 'Evan', 'Kayden', 'Josiah', 'Parker', 'Xavier', 'Blake', 'Leo', 'Bentley', 'Kayla', 'Naomi', 'Ellie', 'Aubrey', 'Anna', 'Caroline', 'Maya', 'Valentina', 'Ruby', 'Kennedy',
  'Madeline', 'Peyton', 'Julia', 'Rylee', 'Clara', 'Raelynn', 'Melanie', 'Arianna', 'Gabrielle', 'Faith', 'Alexis', 'Isabelle', 'Alice', 'Vivienne', 'Brielle', 'Reagan', 'Khloe', 'Alexandra', 'Jade', 'Lyla',
  'Molly', 'Sydney', 'Morgan', 'Jasmine', 'Trinity', 'Hope', 'Summer', 'Camila', 'Delilah', 'Jocelyn', 'Lila', 'Juliana', 'Valerie', 'Alina', 'Emery', 'Rose', 'Brooke', 'Rachel', 'Norah', 'Kylie',
  'Aaliyah', 'Andrea', 'Maria', 'Londyn', 'Juliette', 'Amaya', 'Nicole', 'Emilia', 'Kayleigh', 'Adeline', 'Arya', 'Isabel', 'Lilliana', 'Raegan', 'Sloane', 'Maggie', 'Harmony', 'Georgia', 'Finley', 'Daisy',
  'Phoenix', 'Remi', 'Blair', 'Lena', 'Adalynn', 'Journey', 'Alana', 'Catalina', 'Sawyer', 'Lola', 'Hayden', 'Kendall', 'Evangeline', 'Cora', 'Mckenna', 'Haven', 'Tessa', 'Miriam', 'Diana', 'Selena',
  'Julianna', 'Kali', 'Anastasia', 'Cecilia', 'Maeve', 'Heidi', 'Jane', 'Mya', 'Camille', 'Lana', 'Nina', 'Sage', 'Ada', 'Lia', 'Alexis', 'Ariella', 'Esther', 'Millie', 'Ruth', 'Sara',
  'Jax', 'Ryder', 'Kingston', 'Zion', 'Karter', 'Jayce', 'Tyler', 'Emmanuel', 'Brantley', 'Ace', 'Kaiden', 'Maxwell', 'Malachi', 'Ivan', 'Jaylen', 'Miguel', 'Thiago', 'Gael', 'Bryson', 'Rafael',
  'Jorge', 'Calvin', 'Zane', 'Damian', 'Simon', 'Kyrie', 'Vincent', 'Beau', 'Jake', 'Louis', 'Caden', 'Mylo', 'Paxton', 'Rocco', 'Koa', 'Ari', 'Enzo', 'Lane', 'Cash', 'Troy',
  'Hendrix', 'Jett', 'Kash', 'Kyson', 'Ramon', 'Ricky', 'Ronin', 'Santos', 'Tatum', 'Zayne', 'Alden', 'Benson', 'Cannon', 'Dax', 'Drew', 'Eden', 'Ford', 'Gage', 'Jensen', 'Kaiser',
// ...existing code...
];
const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez',
  'White', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Adams', 'Baker', 'Nelson', 'Carter', 'Mitchell', 'Perez',
  'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper',
  'Richardson', 'Cox', 'Howard', 'Ward', 'Flores', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes', 'Myers', 'Ford', 'Hamilton', 'Graham', 'Sullivan',
  'Wallace', 'Woods', 'Cole', 'West', 'Jordan', 'Owens', 'Reynolds', 'Fisher', 'Ellis', 'Harrison', 'Gibson', 'McDonald', 'Cruz', 'Marshall', 'Ortiz', 'Gomez', 'Murray', 'Freeman', 'Wells', 'Webb',
  'Simpson', 'Stevens', 'Tucker', 'Porter', 'Hunter', 'Hicks', 'Crawford', 'Henry', 'Boyd', 'Mason', 'Morales', 'Kennedy', 'Warren', 'Dixon', 'Ramos', 'Reyes', 'Burns', 'Gordon', 'Shaw', 'Holmes',
  'Rice', 'Robertson', 'Hunt', 'Black', 'Daniels', 'Palmer', 'Mills', 'Nichols', 'Grant', 'Knight', 'Ferguson', 'Rose', 'Stone', 'Hawkins', 'Dunn', 'Perkins', 'Hudson', 'Spencer', 'Gardner', 'Stephens',
  'Payne', 'Pierce', 'Berry', 'Matthews', 'Arnold', 'Wagner', 'Willis', 'Ray', 'Watkins', 'Olson', 'Carroll', 'Duncan', 'Snyder', 'Hart', 'Cunningham', 'Bradley', 'Lane', 'Andrews', 'Ruiz', 'Harper',
  'Fox', 'Riley', 'Armstrong', 'Carpenter', 'Weaver', 'Greene', 'Lawrence', 'Elliott', 'Chavez', 'Sims', 'Austin', 'Peters', 'Kelley', 'Franklin', 'Lawson', 'Fields', 'Gutierrez', 'Ryan', 'Schmidt', 'Carr',
  'Vasquez', 'Castillo', 'Wheeler', 'Chapman', 'Oliver', 'Montgomery', 'Richards', 'Williamson', 'Johnston', 'Banks', 'Meyer', 'Bishop', 'McCoy', 'Howell', 'Alvarez', 'Morrison', 'Hansen', 'Fernandez', 'Garza', 'Harvey',
  'Little', 'Burton', 'Stanley', 'Ng', 'George', 'Jacobs', 'Reid', 'Kim', 'Fuller', 'Lynch', 'Dean', 'Gilbert', 'Garrett', 'Romero', 'Welch', 'Larson', 'Frazier', 'Burke', 'Hanson', 'Day',
  'Mendoza', 'Moreno', 'Bowman', 'Medina', 'Fowler', 'Brewer', 'Hoffman', 'Carlson', 'Silva', 'Pearson', 'Holland', 'Douglas', 'Fleming', 'Jensen', 'Vargas', 'Byrd', 'Davidson', 'Hopkins', 'May', 'Terry',
  'Herrera', 'Wade', 'Soto', 'Walters', 'Curtis', 'Neal', 'Caldwell', 'Lowe', 'Jennings', 'Barnes', 'Greer', 'Alvarado', 'Patterson', 'Hines', 'Wilkins', 'Powers', 'Ball', 'Frost', 'Robbins', 'Shepherd',
  'Marquez', 'Blevins', 'Bentley', 'Dalton', 'Morrow', 'Vaughn', 'Gaines', 'Shaffer', 'Short', 'Kaiser', 'Hancock', 'Herring', 'Shields', 'Sexton', 'Acosta', 'Morse', 'Duffy', 'Salazar', 'Knox', 'Huffman',
  'French', 'Stout', 'Sears', 'Bowers', 'Rojas', 'Leach', 'Chang', 'Blanchard', 'Cline', 'Finley', 'Goodwin', 'Blevins', 'Humphrey', 'Randall', 'Pugh', 'Gentry', 'Farmer', 'Harmon', 'Manning', 'Cameron',
  'Conner', 'McCormick', 'Stokes', 'Owen', 'Blevins', 'Benson', 'Barker', 'Hood', 'Sweeney', 'Strong', 'Prince', 'McKenzie', 'Shannon', 'Clements', 'Benton', 'Abbott', 'Acevedo', 'Adams', 'Aguilar', 'Alexander',
  'Alford', 'Ali', 'Allen', 'Allison', 'Alston', 'Alvarado', 'Amador', 'Andersen', 'Anderson', 'Andrews', 'Anthony', 'Armstrong', 'Arnold', 'Ashley', 'Atkins', 'Austin', 'Avery', 'Avila', 'Ayala', 'Ayers',
  'Bailey', 'Baird', 'Baker', 'Baldwin', 'Ball', 'Barker', 'Barlow', 'Barnes', 'Barnett', 'Barr', 'Barrera', 'Barrett', 'Barron', 'Barry', 'Bartlett', 'Barton', 'Bass', 'Bates', 'Battle', 'Bauer',
  'Bautista', 'Beach', 'Beasley', 'Beck', 'Becker', 'Bell', 'Bender', 'Benjamin', 'Bennett', 'Benson', 'Bentley', 'Benton', 'Berg', 'Berger', 'Bernard', 'Berry', 'Best', 'Bird', 'Bishop', 'Black',
  'Blackburn', 'Blackwell', 'Blair', 'Blake', 'Blanchard', 'Blankenship', 'Bolton', 'Bond', 'Bonner', 'Booker', 'Boone', 'Booth', 'Bowen', 'Bowers', 'Bowman', 'Boyd', 'Boyer', 'Boyle', 'Bradford', 'Bradley',
  'Bradshaw', 'Brady', 'Branch', 'Brandt', 'Bray', 'Brennan', 'Brewer', 'Bridges', 'Briggs', 'Bright', 'Britt', 'Brock', 'Brooks', 'Brown', 'Browning', 'Bruce', 'Bryan', 'Bryant', 'Buchanan', 'Buck',
  'Buckley', 'Bullock', 'Burch', 'Burgess', 'Burke', 'Burks', 'Burnett', 'Burns', 'Burris', 'Burt', 'Burton', 'Bush', 'Butler', 'Byers', 'Byrd', 'Cabrera', 'Cain', 'Calderon', 'Caldwell', 'Calhoun',
  'Callahan', 'Calvert', 'Cameron', 'Campbell', 'Campos', 'Cannon', 'Cantrell', 'Cantu', 'Capps', 'Carlin', 'Carlson', 'Carney', 'Carpenter', 'Carr', 'Carrillo', 'Carroll', 'Carson', 'Carter', 'Caruso', 'Case',
  'Casey', 'Cash', 'Castaneda', 'Castillo', 'Castro', 'Cates', 'Cato', 'Cavazos', 'Chambers', 'Chan', 'Chandler', 'Chaney', 'Chang', 'Chapman', 'Charles', 'Chase', 'Chavez', 'Cherry', 'Christian', 'Christiansen',
  'Church', 'Clark', 'Clarke', 'Clay', 'Clayton', 'Clements', 'Cleveland', 'Cline', 'Clinton', 'Cobb', 'Cochran', 'Coffey', 'Cohen', 'Cole', 'Coleman', 'Collier', 'Collins', 'Colon', 'Combs', 'Compton',
  'Conley', 'Conner', 'Conrad', 'Contreras', 'Conway', 'Cook', 'Cooke', 'Cooley', 'Cooper', 'Copeland', 'Cortez', 'Cote', 'Cotton', 'Couch', 'Coughlin', 'Coulter', 'Courtney', 'Cowan', 'Cox', 'Coy',
  'Crabtree', 'Craft', 'Craig', 'Crane', 'Crawford', 'Crews', 'Crockett', 'Cross', 'Cruz', 'Cummings', 'Cunningham', 'Curry', 'Curtis', 'Dale', 'Dalton', 'Daly', 'Dana', 'Daniel', 'Daniels', 'Daugherty',
  'Davenport', 'David', 'Davidson', 'Davis', 'Dawson', 'Day', 'Dayton', 'Dean', 'Decker', 'Dee', 'Dejesus', 'Delacruz', 'Delaney', 'Deleon', 'Delgado', 'Dennis', 'Denny', 'Denton', 'Derrick', 'Desmond',
  'Devine', 'Devin', 'Devine', 'Dewitt', 'Diaz', 'Dickerson', 'Dickson', 'Dillard', 'Dillon', 'Dimas', 'Dixon', 'Do', 'Dodson', 'Dominguez', 'Donaldson', 'Donovan', 'Dorsey', 'Dotson', 'Dougherty', 'Douglas',
  'Downs', 'Doyle', 'Drake', 'Drew', 'Du', 'Duarte', 'Dudley', 'Duffy', 'Duke', 'Dunbar', 'Duncan', 'Dunn', 'Duran', 'Durham', 'Dyer', 'Eaton', 'Edwards', 'Egan', 'Elder', 'Eldridge',
  'Elias', 'Ellington', 'Elliott', 'Ellis', 'Ellison', 'Elmore', 'Elrod', 'Emerson', 'Emery', 'England', 'Engle', 'Enriquez', 'Erickson', 'Ernst', 'Escobar', 'Espinoza', 'Estes', 'Estrada', 'Evans', 'Everett',
  'Ewing', 'Farley', 'Farmer', 'Farrell', 'Faulkner', 'Fay', 'Felix', 'Ferguson', 'Fernandez', 'Ferrell', 'Fields', 'Figueroa', 'Finch', 'Finley', 'Fischer', 'Fisher', 'Fitzgerald', 'Fleming', 'Fletcher', 'Flores',
  'Flowers', 'Floyd', 'Flynn', 'Foley', 'Forbes', 'Ford', 'Foreman', 'Foster', 'Fowler', 'Fox', 'Francis', 'Franco', 'Frank', 'Franklin', 'Franks', 'Freeman', 'French', 'Frost', 'Fry', 'Frye',
  'Fuentes', 'Fuller', 'Fulton', 'Gaines', 'Gallagher', 'Gallegos', 'Galloway', 'Gamble', 'Garcia', 'Gardner', 'Garner', 'Garrett', 'Garrison', 'Garza', 'Gates', 'Gay', 'Gentry', 'George', 'Gibbs', 'Gibson',
  'Gilbert', 'Giles', 'Gill', 'Gillespie', 'Gilliam', 'Gilmore', 'Ginger', 'Glover', 'Goff', 'Golden', 'Gomez', 'Gonzales', 'Gonzalez', 'Good', 'Goodman', 'Goodwin', 'Gordon', 'Gorman', 'Gould', 'Graham',
  'Grant', 'Graves', 'Gray', 'Grayson', 'Greene', 'Green', 'Greenberg', 'Greenwood', 'Greer', 'Gregory', 'Griffin', 'Grimes', 'Gross', 'Guerra', 'Guerrero', 'Guthrie', 'Gutierrez', 'Guy', 'Hahn', 'Hale',
  'Haley', 'Hall', 'Haller', 'Hamilton', 'Hamlin', 'Hamm', 'Hammond', 'Hampton', 'Hancock', 'Haney', 'Hanna', 'Hannah', 'Hansen', 'Hanson', 'Hardin', 'Harding', 'Hardy', 'Harmon', 'Harper', 'Harrell',
  'Harrington', 'Harris', 'Harrison', 'Hart', 'Hartman', 'Harvey', 'Hatcher', 'Hatfield', 'Hawkins', 'Hayden', 'Hayes', 'Haynes', 'Hays', 'Head', 'Heath', 'Hebert', 'Henderson', 'Hendricks', 'Hendrix', 'Henry',
  'Hensley', 'Henson', 'Herman', 'Hernandez', 'Herrera', 'Hess', 'Hester', 'Hewitt', 'Hickman', 'Hicks', 'Higgins', 'Hill', 'Hines', 'Hinton', 'Hobbs', 'Hodge', 'Hodges', 'Hoffman', 'Hogan', 'Holcomb',
  'Holden', 'Holder', 'Holland', 'Holloway', 'Holman', 'Holmes', 'Holt', 'Hood', 'Hooper', 'Hoover', 'Hopkins', 'Hopper', 'Horn', 'Horne', 'Horton', 'House', 'Houston', 'Howard', 'Howe', 'Howell',
  'Hubbard', 'Huber', 'Hudson', 'Huff', 'Huffman', 'Hughes', 'Hull', 'Humphrey', 'Hunt', 'Hunter', 'Hurley', 'Hurst', 'Hutchinson', 'Hyde'
];
function randomFullName(role) {
  let first = firstNames[Math.floor(Math.random() * firstNames.length)];
  let last = lastNames[Math.floor(Math.random() * lastNames.length)];
  // Guarantee Tina for ramp
  if (role === 'ramp' && Math.random() < 0.2) first = 'Tina';
  return `${first} ${last}`;
}

function generateEmployee(id, role) {
  return {
    id,
    name: randomFullName(role),
    role,
    details: {
      phone: `555-${Math.floor(1000 + Math.random() * 9000)}`,
      shift: Math.random() < 0.5 ? 'AM' : 'PM',
      notes: ''
    }
  };
}

function Staff({ employees, setEmployees }) {
  // Custom hiring/interview states
  const [customName, setCustomName] = useState("");
  const [customRole, setCustomRole] = useState("ramp");
  const [interviewing, setInterviewing] = useState(false);
  const [interviewStep, setInterviewStep] = useState(0);
  const [interviewResult, setInterviewResult] = useState(null);

  // Interview questions
  const interviewQuestions = [
    "Why do you want to work here?",
    "What is your greatest strength?",
    "How do you handle stress at work?"
  ];

  // Custom hire handler
  const startInterview = () => {
    if (!customName.trim()) return;
    setInterviewing(true);
    setInterviewStep(0);
    setInterviewResult(null);
  };

  const handleInterviewAnswer = answer => {
    // For demo, just go to next step
    if (interviewStep < interviewQuestions.length - 1) {
      setInterviewStep(interviewStep + 1);
    } else {
      setInterviewResult("pass");
    }
  };

  const finishInterview = () => {
    if (interviewResult === "pass") {
      const emp = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: customName,
        role: customRole,
        details: {
          phone: `555-${Math.floor(1000 + Math.random() * 9000)}`,
          shift: Math.random() < 0.5 ? "AM" : "PM",
          notes: "Custom hired"
        }
      };
      hireEmployee(emp);
      setCustomName("");
      setCustomRole("ramp");
    }
    setInterviewing(false);
    setInterviewStep(0);
    setInterviewResult(null);
  };
  const [newStaff, setNewStaff] = useState([]);
  useEffect(() => {
    // Generate new random staff daily, one per role, no duplicates
    const today = new Date().toDateString();
    const lastGen = localStorage.getItem('lastStaffGen');
    let generated = [];
    if (lastGen !== today) {
      const roles = ['ramp', 'cs', 'admin'];
      const usedNames = new Set();
      let idBase = Date.now();
      for (let i = 0; i < 5; i++) {
        const role = roles[i % roles.length];
        let emp;
        let tries = 0;
        do {
          emp = generateEmployee(idBase + i, role);
          tries++;
        } while (usedNames.has(emp.name) && tries < 10);
        usedNames.add(emp.name);
        generated.push(emp);
      }
      // Ensure Tina is present as ramp at all times (with last name)
      if (!generated.some(e => e.name.startsWith('Tina ') && e.role === 'ramp')) {
        const tinaLast = lastNames[Math.floor(Math.random() * lastNames.length)];
        generated.push({
          id: idBase + 1000,
          name: `Tina ${tinaLast}`,
          role: 'ramp',
          details: {
            phone: '555-1234',
            shift: 'AM',
            notes: 'Always present'
          }
        });
      }
      setNewStaff(generated);
      localStorage.setItem('lastStaffGen', today);
      localStorage.setItem('newStaff', JSON.stringify(generated));
    } else {
      const stored = localStorage.getItem('newStaff');
      if (stored) {
        generated = JSON.parse(stored);
        // Ensure Tina is present as ramp at all times (with last name)
        if (!generated.some(e => e.name.startsWith('Tina ') && e.role === 'ramp')) {
          const tinaLast = lastNames[Math.floor(Math.random() * lastNames.length)];
          generated.push({
            id: Date.now() + 1000,
            name: `Tina ${tinaLast}`,
            role: 'ramp',
            details: {
              phone: '555-1234',
              shift: 'AM',
              notes: 'Always present'
            }
          });
          localStorage.setItem('newStaff', JSON.stringify(generated));
        }
        setNewStaff(generated);
      }
    }
  }, []);

  const hireEmployee = emp => {
    setEmployees(prev => {
      let updated = prev;
      if (!prev.some(e => e.name === emp.name && e.role === emp.role)) {
        updated = [...prev, emp];
      }
      // Ensure Tina is present as ramp at all times (with last name)
      if (!updated.some(e => e.name.startsWith('Tina ') && e.role === 'ramp')) {
        const tinaLast = lastNames[Math.floor(Math.random() * lastNames.length)];
        updated = [
          ...updated,
          {
            id: Date.now() + 2000,
            name: `Tina ${tinaLast}`,
            role: 'ramp',
            details: {
              phone: '555-1234',
              shift: 'AM',
              notes: 'Always present'
            }
          }
        ];
      }
      localStorage.setItem('employees', JSON.stringify(updated));
      return updated;
    });
    setNewStaff(prev => prev.filter(e => e.id !== emp.id));
    // Persist hired employees immediately
    const stored = localStorage.getItem('employees');
    if (stored) setEmployees(JSON.parse(stored));
  };

  const fireEmployee = empId => {
    setEmployees(prev => {
      let updated = prev.filter(e => e.id !== empId);
      // Prevent Tina from being fired (with last name)
      if (!updated.some(e => e.name.startsWith('Tina ') && e.role === 'ramp')) {
        const tinaLast = lastNames[Math.floor(Math.random() * lastNames.length)];
        updated = [
          ...updated,
          {
            id: Date.now() + 2000,
            name: `Tina ${tinaLast}`,
            role: 'ramp',
            details: {
              phone: '555-1234',
              shift: 'AM',
              notes: 'Always present'
            }
          }
        ];
      }
      localStorage.setItem('employees', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '2.5em auto 0 auto', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,51,102,0.10)', padding: '2.5em', minHeight: '60vh' }}>
      <h2 style={{ color: '#003366', fontWeight: 700, fontSize: '2em', marginBottom: '1.5em' }}>Staff Management</h2>
      {/* Custom Hiring Section */}
      <div style={{ marginBottom: '2em', paddingBottom: '1em', borderBottom: '1px solid #eee' }}>
        <h3 style={{ color: '#003366', fontWeight: 600 }}>Custom Hire</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1em', marginBottom: '1em' }}>
          <input
            type="text"
            placeholder="Enter name..."
            value={customName}
            onChange={e => setCustomName(e.target.value)}
            style={{ padding: '0.5em', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1em' }}
          />
          <select value={customRole} onChange={e => setCustomRole(e.target.value)} style={{ padding: '0.5em', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1em' }}>
            <option value="ramp">Ramp</option>
            <option value="cs">CS</option>
            <option value="admin">Admin</option>
          </select>
          <button style={{ background: '#003366', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5em 1em', fontWeight: 600, cursor: 'pointer' }} onClick={startInterview}>Interview & Hire</button>
        </div>
        {/* Interview Modal */}
        {interviewing && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '2em', minWidth: '320px', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
              <h4 style={{ color: '#003366', fontWeight: 700, marginBottom: '1em' }}>Interview for {customName} ({customRole})</h4>
              {interviewResult !== "pass" ? (
                <>
                  <div style={{ marginBottom: '1em', fontWeight: 500 }}>{interviewQuestions[interviewStep]}</div>
                  <input type="text" style={{ width: '100%', padding: '0.5em', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '1em' }} autoFocus onKeyDown={e => { if (e.key === 'Enter') handleInterviewAnswer(e.target.value); }} />
                  <button style={{ background: '#009966', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5em 1em', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleInterviewAnswer()}>Next</button>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: '1em', color: '#009966', fontWeight: 600 }}>Interview passed! Ready to hire.</div>
                  <button style={{ background: '#003366', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5em 1em', fontWeight: 600, cursor: 'pointer' }} onClick={finishInterview}>Hire {customName}</button>
                  <button style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5em 1em', fontWeight: 600, cursor: 'pointer', marginLeft: '1em' }} onClick={() => setInterviewing(false)}>Cancel</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginBottom: '2em' }}>
        <h3 style={{ color: '#009966', fontWeight: 600 }}>New Candidates (Daily)</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {newStaff.filter(emp => emp.role === 'ramp' || emp.role === 'cs' || emp.role === 'admin').map(emp => (
            <li key={emp.id} style={{ marginBottom: '1em', background: '#f8f8fa', borderRadius: '8px', padding: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ background: '#003366', color: '#fff', borderRadius: '5px', padding: '2px 10px', fontWeight: 600, letterSpacing: '0.5px', marginRight: '0.5em' }}>
                {emp.name} <span style={{ color: '#ffe066', fontWeight: 700, marginLeft: '4px' }}>({emp.role})</span>
              </span>
              <span style={{ color: '#003366', fontWeight: 500, marginLeft: '0.5em' }}>{emp.details.phone} [{emp.details.shift}]</span>
              <button style={{ background: '#009966', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5em 1em', fontWeight: 600, cursor: 'pointer' }} onClick={() => hireEmployee(emp)}>Hire</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 style={{ color: '#003366', fontWeight: 600 }}>Current Staff</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {employees.map(emp => (
            <li key={emp.id} style={{ marginBottom: '1em', background: '#f8f8fa', borderRadius: '8px', padding: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ background: '#003366', color: '#fff', borderRadius: '5px', padding: '2px 10px', fontWeight: 600, letterSpacing: '0.5px', marginRight: '0.5em' }}>
                {emp.name} <span style={{ color: '#ffe066', fontWeight: 700, marginLeft: '4px' }}>({emp.role})</span>
              </span>
              <span style={{ color: '#003366', fontWeight: 500, marginLeft: '0.5em' }}>{emp.details.phone} [{emp.details.shift}]</span>
              <button style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5em 1em', fontWeight: 600, cursor: 'pointer' }} onClick={() => fireEmployee(emp.id)}>Fire</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Staff;
