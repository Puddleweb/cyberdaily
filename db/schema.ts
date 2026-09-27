import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
export const challenges = sqliteTable('challenges', {
 day: text('day').primaryKey(), payload: text('payload').notNull(), source: text('source').notNull(), createdAt: text('created_at').notNull(),
});
export const attempts = sqliteTable('attempts', {
 userId: text('user_id').notNull(), day: text('day').notNull(), challengeId: text('challenge_id').notNull(), answer: integer('answer').notNull(), score: integer('score').notNull(), completedAt: text('completed_at').notNull(),
}, t => [primaryKey({columns:[t.userId,t.day,t.challengeId]})]);
export const generationRuns = sqliteTable('generation_runs', {
 day:text('day').primaryKey(), token:text('token').notNull(), status:text('status').notNull(), updatedAt:integer('updated_at').notNull(), message:text('message'),
});
