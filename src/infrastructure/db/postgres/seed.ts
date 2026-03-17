import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './drizzle.schema';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

dotenv.config();

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

const db = drizzle(pool, { schema });

async function seed() {
    console.log('🌱 Starting seed...');

    console.log('Creating admin user...');
    const existingAdmin = await db.query.users.findFirst({
        where: eq(schema.users.email, 'admin@lumio.com'),
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('3141516', 10);
        await db.insert(schema.users).values({
            username: 'admin',
            email: 'admin@lumio.com',
            password: hashedPassword,
            role: 'admin',
        });
        console.log('✅ Admin user created');
    } else {
        console.log('ℹ️ Admin user already exists');
    }

    console.log('✅ Seed completed successfully');
    await pool.end();
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    pool.end();
    process.exit(1);
});
