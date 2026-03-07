import { Injectable } from '@nestjs/common';
import { eq, and, between, sql, sum, desc, asc, or } from 'drizzle-orm';
import {
  CreateUserDto,
  PaginatedUsers,
  RankingItem,
  UpdateUserDto,
  User,
  UserRepositoryPort,
} from '@/application/ports/out/postgres/user-repository.port';

import { DrizzleClientAdapter } from '../drizzle-client-adapter';
import { users, userEvents } from '../drizzle.schema';

@Injectable()
export class DrizzleUserRepository extends UserRepositoryPort {
  constructor(private readonly drizzleClient: DrizzleClientAdapter) {
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

  async getWeeklyRanking(startOfWeek: Date, endOfWeek: Date): Promise<RankingItem[]> {
    const db = this.drizzleClient.getDb();

    const totalXpExpression = sql<number>`CAST(SUM(CAST(${userEvents.metadata}->>'amount' AS INTEGER)) AS INTEGER)`;

    const result = await db
      .select({
        userId: userEvents.userId,
        username: users.username,
        totalXp: totalXpExpression,
      })
      .from(userEvents)
      .innerJoin(users, eq(userEvents.userId, users.id))
      .where(
        and(
          eq(userEvents.eventType, 'xp_earned'),
          between(userEvents.occurredAt, startOfWeek, endOfWeek)
        )
      )
      .groupBy(userEvents.userId, users.username)
      .orderBy(desc(totalXpExpression))
      .limit(100);

    return result.map(item => ({
      userId: item.userId,
      username: item.username,
      totalXp: item.totalXp || 0,
      avatarUrl: null,
    }));
  }

  async getGeneralRanking(): Promise<RankingItem[]> {
    const db = this.drizzleClient.getDb();

    const result = await db
      .select({
        userId: users.id,
        username: users.username,
        totalXp: users.xp,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .where(eq(users.role, 'user'))
      .orderBy(desc(users.xp), asc(users.updatedAt))
      .limit(10);

    return result as RankingItem[];
  }

  async getUserRanking(userId: string): Promise<{ xp: number; position: number } | null> {
    const db = this.drizzleClient.getDb();

    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) return null;

    const [positionResult] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(users)
      .where(
        and(
          eq(users.role, 'user'),
          or(
            sql`${users.xp} > ${user.xp}`,
            and(
              sql`${users.xp} = ${user.xp}`,
              sql`${users.updatedAt} < ${user.updatedAt}`
            )
          )
        )
      );

    return {
      xp: user.xp,
      position: Number(positionResult?.count || 0) + 1,
    };
  }

  async incrementXp(userId: string, amount: number): Promise<void> {
    const db = this.drizzleClient.getDb();
    await db
      .update(users)
      .set({ xp: sql`${users.xp} + ${amount}` })
      .where(eq(users.id, userId));
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
