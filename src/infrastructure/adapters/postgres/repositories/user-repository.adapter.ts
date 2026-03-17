import { Injectable } from '@nestjs/common';
import { eq, between, sql, desc, asc } from 'drizzle-orm';
import {
  CreateUserDto,
  PaginatedUsers,
  UpdateUserDto,
  User,
  UserRepositoryPort,
} from '@/application/ports/out/postgres/user-repository.port';

import { DrizzleClient } from '../../../db/postgres/drizzle.client';
import { users } from '../../../db/postgres/drizzle.schema';

@Injectable()
export class DrizzleUserRepository extends UserRepositoryPort {
  constructor(private readonly drizzleClient: DrizzleClient) {
    super();
  }

  async findAll(): Promise<User[]> {
    const db = this.drizzleClient.getDb();
    return await db.select().from(users);
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginatedUsers> {
    const db = this.drizzleClient.getDb();

    const offset = (page - 1) * limit;

    const [allUsers, totalResult] = await Promise.all([
      db.select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(users),
    ]);

    return {
      users: allUsers,
      total: Number(totalResult[0]?.count || 0),
    };
  }

  async findById(id: string): Promise<User | null> {
    const db = this.drizzleClient.getDb();
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const db = this.drizzleClient.getDb();
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0] || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const db = this.drizzleClient.getDb();
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return result[0] || null;
  }

  async create(data: CreateUserDto): Promise<User> {
    const db = this.drizzleClient.getDb();
    const result = await db
      .insert(users)
      .values({
        username: data.username,
        password: data.password,
        email: data.email,
        role: data.role || 'user',
      })
      .returning();
    return result[0];
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const db = this.drizzleClient.getDb();
    const result = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<void> {
    const db = this.drizzleClient.getDb();
    await db.delete(users).where(eq(users.id, id));
  }

  async updateLastSeen(id: string): Promise<void> {
    const db = this.drizzleClient.getDb();
    await db
      .update(users)
      .set({ lastSeen: new Date() })
      .where(eq(users.id, id));
  }

}
