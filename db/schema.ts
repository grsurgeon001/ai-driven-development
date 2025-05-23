import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, boolean } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  employeeId: text("employee_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email"),
  passwordHash: text("password_hash").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const patients = sqliteTable("patients", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  patientId: text("patient_id").notNull(),
  userId: text("user_id").references(() => users.id),
  conferenceType: text("conference_type").notNull(),
  reasons: text("reasons").notNull(), // JSON string으로 저장
  isDiscussing: boolean("is_discussing").notNull().default(false),
  isDone: boolean("is_done").notNull().default(false),
  isFastRegistered: boolean("is_fast_registered").notNull().default(false),
  submittedAt: text("submitted_at").default(sql`CURRENT_TIMESTAMP`),
});

export const files = sqliteTable("files", {
  id: text("id").primaryKey(),
  patientId: text("patient_id")
    .notNull()
    .references(() => patients.id, { onDelete: "cascade" }),
  filePath: text("file_path").notNull(),
  uploadedAt: text("uploaded_at").default(sql`CURRENT_TIMESTAMP`),
});
