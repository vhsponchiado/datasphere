import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {
  CreateSessionDto,
  Session,
  SessionRepositoryPort,
} from '@/application/ports/out/postgres/session-repository.port';
import { DrizzleClientAdapter } from '../drizzle-client-adapter';
import { sessions } from '../drizzle.schema';

@Injectable()
export class DrizzleSessionRepository extends SessionRepositoryPort {
  constructor(private readonly drizzleClient: DrizzleClientAdapter) {
    super();
  }

  async create(data: CreateSessionDto): Promise<Session> {
    const db = this.drizzleClient.getDb();
    const result = await db
      .insert(sessions)
      .values({
        userId: data.userId,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
      })
      .returning();
    return result[0];
  }

  async findByRefreshToken(refreshToken: string): Promise<Session | null> {
    const db = this.drizzleClient.getDb();
    const result = await db
      .select()
      .from(sessions)
      .where(eq(sessions.refreshToken, refreshToken));
    return result[0] || null;
  }

  async deleteByRefreshToken(refreshToken: string): Promise<void> {
    const db = this.drizzleClient.getDb();
    await db.delete(sessions).where(eq(sessions.refreshToken, refreshToken));
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    const db = this.drizzleClient.getDb();
    await db.delete(sessions).where(eq(sessions.userId, userId));
  }

  async deleteByUserId(userId: string): Promise<void> {
    const db = this.drizzleClient.getDb();
    await db.delete(sessions).where(eq(sessions.userId, userId));
  }
}

