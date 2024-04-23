DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  x_coordinate DECIMAL(9,6) NOT NULL,
  y_coordinate DECIMAL(9,6) NOT NULL,
  title VARCHAR(255),
  description TEXT
);
