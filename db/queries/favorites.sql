-- DO NOT USE: sql test code
INSERT INTO
  favorited_maps (user_id, map_id)
VALUES
  (6, 7)
ON CONFLICT (user_id, map_id) DO NOTHING;
