-- Insert seed data for the pins table
INSERT INTO pins (user_id, map_id, lat, lng, title, description) VALUES
  -- Pins for Map 1
  (1, 1, 48.8588443, 2.2943506, 'Forest Trail Start', 'Start of the nature trail'),
  (2, 1, 48.8598443, 2.2953506, 'Waterfall View', 'Scenic view of a waterfall'),
  (3, 1, 48.8608443, 2.2963506, 'Wildlife Spot', 'Chance to spot local wildlife'),
  -- Pins for Map 2
  (2, 2, 40.712776, -74.005974, 'Statue of Liberty', 'Iconic landmark of the city'),
  (3, 2, 40.714776, -74.007974, 'Times Square', 'Vibrant and bustling area'),
  (1, 2, 40.715776, -74.008974, 'Central Park', 'Green oasis in the city'),
  -- Pins for Map 3
  (3, 3, -33.867487, 151.20699, 'Sandy Beach', 'Relaxing spot by the sea'),
  (1, 3, -33.868487, 151.20799, 'Surfing Spot', 'Great waves for surfing'),
  (2, 3, -33.869487, 151.20899, 'Sunset View', 'Beautiful sunset over the water'),
  -- Pins for Map 4
  (1, 4, 39.7392358, -104.990251, 'Mountain Peak', 'Stunning view from the summit'),
  (2, 4, 39.7402358, -104.991251, 'Cave Exploration', 'Explore mysterious caves'),
  (3, 4, 39.7412358, -104.992251, 'Wildlife Sanctuary', 'Protected area for diverse wildlife'),
  -- Pins for Map 5
  (3, 5, 51.5073509, -0.1277583, 'Historic Castle', 'Ancient castle with rich history'),
  (1, 5, 51.5083509, -0.1287583, 'Museum Visit', 'Discover artifacts and exhibits'),
  (2, 5, 51.5093509, -0.1297583, 'Monument Square', 'Memorial square honoring historic figures');
