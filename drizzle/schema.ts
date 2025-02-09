import { pgTable, unique, pgEnum, serial, varchar, timestamp, text, foreignKey, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const user_system_enum = pgEnum("user_system_enum", ['system', 'user'])


export const user_subscriptions = pgTable("user_subscriptions", {
	id: serial("id").primaryKey().notNull(),
	user_id: varchar("user_id", { length: 256 }).notNull(),
	stripe_customer_id: varchar("stripe_customer_id", { length: 256 }).notNull(),
	stripe_subscription_id: varchar("stripe_subscription_id", { length: 256 }),
	stripe_price_id: varchar("stripe_price_id", { length: 256 }),
	stripe_current_period_ended_at: timestamp("stripe_current_period_ended_at", { mode: 'string' }),
},
(table) => {
	return {
		user_subscriptions_user_id_unique: unique("user_subscriptions_user_id_unique").on(table.user_id),
		user_subscriptions_stripe_customer_id_unique: unique("user_subscriptions_stripe_customer_id_unique").on(table.stripe_customer_id),
		user_subscriptions_stripe_subscription_id_unique: unique("user_subscriptions_stripe_subscription_id_unique").on(table.stripe_subscription_id),
	}
});

export const chats = pgTable("chats", {
	id: serial("id").primaryKey().notNull(),
	pdf_name: text("pdf_name").notNull(),
	pdf_url: text("pdf_url").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	user_id: varchar("user_id", { length: 256 }).notNull(),
	file_key: text("file_key").notNull(),
});

export const messages = pgTable("messages", {
	id: serial("id").primaryKey().notNull(),
	chat_id: integer("chat_id").notNull().references(() => chats.id),
	content: text("content").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	role: user_system_enum("role").notNull(),
});