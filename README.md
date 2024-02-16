# supabase-reactivity

## Setup with supabase cli :

- bun install
- supabase init
- supabase start
- set your .env.local file

### Insert this in your postgres (user: postgres, db: postgres, host: 127.0.0.1:54322)
```sql
-- Create the table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
-- Insert some sample data into the table
INSERT INTO items (name) VALUES ('items 1');
INSERT INTO items (name) VALUES ('items 2');
INSERT INTO items (name) VALUES ('items 3');
INSERT INTO items (name) VALUES ('items 4');

```

- bun dev

