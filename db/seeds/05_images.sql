-- Insert seed data for the images table
INSERT INTO images (pin_id, image_url, description, is_thumbnail) VALUES
  -- Images for Map 1 Pins
  (1, 'https://images.unsplash.com/photo-1531318453146-5b595d295e56?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXMlMjBmb3Jlc3QlMjB0cmFpbHxlbnwwfHwwfHx8MA%3D%3D', 'Start of the nature trail', false),
  (2, 'https://images.unsplash.com/photo-1683341960939-84c4e7095875?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFyaXMlMjB3YXRlcmZhbGx8ZW58MHx8MHx8fDA%3D', 'Scenic view of a waterfall', false),
  (3, 'https://plus.unsplash.com/premium_photo-1669725687267-c84399d917a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJhbmNlJTIwd2lsZGxpZmV8ZW58MHx8MHx8fDA%3D', 'Chance to spot local wildlife', false),
  -- Images for Map 2 Pins
  (4, 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D', 'Iconic landmark of the city', false),
  (5, 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGltZXMlMjBzcXVhcmV8ZW58MHx8MHx8fDA%3D', 'Vibrant and bustling area', false),
  (6, 'https://images.unsplash.com/photo-1575372587186-5012f8886b4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2VudHJhbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D', 'Green oasis in the city', false),
  -- Images for Map 3 Pins
  (7, 'https://images.unsplash.com/photo-1555029941-a475f4e50810?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3lkbmV5JTIwYmVhY2h8ZW58MHx8MHx8fDA%3D', 'Relaxing spot by the sea', false),
  (8, 'https://images.unsplash.com/photo-1598600703090-6867b834f070?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3lkbmV5JTIwc3VyZmluZ3xlbnwwfHwwfHx8MA%3D%3D', 'Great waves for surfing', false),
  (9, 'https://images.unsplash.com/photo-1493375366763-3ed5e0e6d8ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lkbmV5JTIwc3Vuc2V0fGVufDB8fDB8fHww', 'Beautiful sunset over the water', false),
  -- Images for Map 4 Pins
  (10, 'https://images.unsplash.com/photo-1578983731891-041a65ab4ae5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRlbnZlciUyMG1vdW50YWluJTIwcGVha3xlbnwwfHwwfHx8MA%3D%3D', 'Stunning view from the summit', false),
  (11, 'https://images.unsplash.com/photo-1510256506868-484d0db06ee2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVudmVyJTIwY2F2ZXxlbnwwfHwwfHx8MA%3D%3D', 'Explore mysterious caves', false),
  (12, 'https://images.unsplash.com/photo-1663294727039-7b0f66c1f64e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGVudmVyJTIwd2lsZGxpZmV8ZW58MHx8MHx8fDA%3D', 'Protected area for diverse wildlife', false),
  -- Images for Map 5 Pins
  (13, 'https://images.unsplash.com/photo-1578666062144-080ac96e3e24?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG93ZXIlMjBvZiUyMGxvbmRvbnxlbnwwfHwwfHx8MA%3D%3D', 'Ancient castle with rich history', false),
  (14, 'https://images.unsplash.com/photo-1584652868574-0669f4292976?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9uJTIwbXVzZXVtfGVufDB8fDB8fHww', 'Discover artifacts and exhibits', false),
  (15, 'https://images.unsplash.com/photo-1588541905384-35ea798604bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9udW1lbnQlMjBzcXVhcmUlMjBsb25kb258ZW58MHx8MHx8fDA%3D', 'Memorial square honoring historic figures', false);
