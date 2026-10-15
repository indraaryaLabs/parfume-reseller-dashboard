import 'dotenv/config';
import pg from 'pg';

const client = new pg.Client(process.env.DATABASE_URL);

async function main() {
  await client.connect();

  // Get all users
  const users = await client.query('SELECT id, name, email FROM "user"');
  console.log('Users found:', users.rows.length);

  for (const user of users.rows) {
    const existing = await client.query('SELECT id FROM user_profile WHERE user_id = $1', [user.id]);
    
    if (existing.rows.length > 0) {
      await client.query("UPDATE user_profile SET role = 'admin' WHERE user_id = $1", [user.id]);
      console.log(`Updated: ${user.email} -> admin`);
    } else {
      await client.query(
        "INSERT INTO user_profile (id, user_id, role, created_at, updated_at) VALUES (gen_random_uuid(), $1, 'admin', NOW(), NOW())",
        [user.id]
      );
      console.log(`Created: ${user.email} -> admin`);
    }
  }

  // Verify
  const profiles = await client.query('SELECT up.role, u.email FROM user_profile up JOIN "user" u ON u.id = up.user_id');
  console.log('\nVerification:');
  profiles.rows.forEach(p => console.log(`  ${p.email} = ${p.role}`));

  await client.end();
}

main().catch(e => { console.error(e); process.exit(1); });
