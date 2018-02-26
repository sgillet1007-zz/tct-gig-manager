CREATE TABLE gigs(
	id serial primary key,
	-- date/time of the gig
	gig_date date,
	start_time time,
	end_time time,
	-- gig location and venue details
	loc_venue character varying(50),
	loc_city character varying(40),
	loc_streetaddr character varying(50),
	loc_state character (2),
	loc_zipcode integer,
	loc_lat real,
	loc_long real,
	venue_website character varying(120),
	-- band memebers confirmed for the gig
	nate_confirmed boolean,
	cass_confirmed boolean,
	sam_confirmed boolean,
	mike_confirmed boolean,
	-- setlist and other specific instructions
	setlist_id character (2),
	instructions character varying(150)
);

INSERT INTO gigs(loc_venue, gig_date, start_time, end_time, loc_streetaddr, loc_city, loc_state, loc_zipcode, loc_lat, loc_long, nate_confirmed, cass_confirmed, sam_confirmed, mike_confirmed, setlist_id)
VALUES
('Clancy''s Irish Pub', 'March 17, 2018', '16:00', '18:00', '7000 West 38th Ave', 'Wheatridge', 'CO', 80033, 39.769045, -105.074560, 'y', 'y', 'y', 'y', '1a'),
('Denver Central Library', 'April 14, 2018', '10:30', '11:15', '10 West 14th Ave', 'Denver', 'CO', 80204, 39.737390, -104.988091, 'y', 'y', 'y', 'n', '1a'),
('Hands-On Auto Tech', 'May 5, 2018', '16:00', '18:00', '1566 Vista View Dr ', 'Longmont', 'CO', 80504, 40.159159,  -105.025759, 'y', 'y', 'y', 'y', '1a');

CREATE TABLE setlist_1a(
	id serial primary key,
	title character varying(50),
	accordion boolean,
	song_order integer
);

INSERT INTO setlist_1a(title, accordion, song_order)
VALUES
('Rufus', 'n', 1),
('Tocame', 'n', 2),
('Love is Dumb', 'n', 3),
('Love Ya', 'y', 4),
('Knock Three Times', 'y', 5),
('Gonna Miss Me', 'y', 6),
('Hey Diddle Diddle', 'n', 7),
('High on Lies', 'n', 8),
('Inspector Clousso', 'n', 9),
('Ghost', 'y', 10),
('Satan Inc.', 'y', 11),
('She''s Coming Back', 'y', 12),
('Stay', 'y', 13),
('Everything but the Blues', 'n', 14),
('In the City', 'n', 15),
('$12 Suit', 'n', 16);
