import Fastify from 'fastify';
import postgres from '@fastify/postgres';

// สร้าง Fastify instance
const fastify = Fastify({ logger: true });

// ตั้งค่าเชื่อมต่อ PostgreSQL
fastify.register(postgres, {
  connectionString: 'postgres://postgres:postgres@localhost:5432/work_easy'
  // แทนที่ username, password, your_database ด้วยค่าจริง
});

// Route ตัวอย่าง: GET /users
fastify.get('/users', async (request, reply) => {
  try {
    const client = await fastify.pg.connect();
    const { rows } = await client.query('SELECT * FROM users');
    client.release();
    return reply.send(rows);
  } catch (err) {
    return reply.status(500).send({ error: 'Database error' });
  }
});

// เริ่ม server
const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    console.log('Server running at http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();