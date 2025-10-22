CREATE TABLE "auth_errors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"error_type" text NOT NULL,
	"error_message" text NOT NULL,
	"stack_trace" text,
	"user_id" text,
	"email" text,
	"operation" text,
	"user_agent" text,
	"ip_address" text,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"metadata" text
);
--> statement-breakpoint
CREATE TABLE "auth_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event" text NOT NULL,
	"user_id" text,
	"email" text,
	"provider" text,
	"duration" integer,
	"success" boolean NOT NULL,
	"error_type" text,
	"error_message" text,
	"user_agent" text,
	"ip_address" text,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"metadata" text
);
--> statement-breakpoint
CREATE TABLE "auth_sessions_tracking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" text NOT NULL,
	"user_id" text NOT NULL,
	"action" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"metadata" text
);
--> statement-breakpoint
ALTER TABLE "auth_errors" ADD CONSTRAINT "auth_errors_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth_metrics" ADD CONSTRAINT "auth_metrics_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth_sessions_tracking" ADD CONSTRAINT "auth_sessions_tracking_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "auth_errors_error_type_idx" ON "auth_errors" USING btree ("error_type");--> statement-breakpoint
CREATE INDEX "auth_errors_timestamp_idx" ON "auth_errors" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "auth_errors_user_id_idx" ON "auth_errors" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "auth_errors_operation_idx" ON "auth_errors" USING btree ("operation");--> statement-breakpoint
CREATE INDEX "auth_metrics_event_idx" ON "auth_metrics" USING btree ("event");--> statement-breakpoint
CREATE INDEX "auth_metrics_timestamp_idx" ON "auth_metrics" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "auth_metrics_user_id_idx" ON "auth_metrics" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "auth_metrics_success_idx" ON "auth_metrics" USING btree ("success");--> statement-breakpoint
CREATE INDEX "auth_metrics_provider_idx" ON "auth_metrics" USING btree ("provider");--> statement-breakpoint
CREATE INDEX "auth_sessions_tracking_session_id_idx" ON "auth_sessions_tracking" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "auth_sessions_tracking_user_id_idx" ON "auth_sessions_tracking" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "auth_sessions_tracking_timestamp_idx" ON "auth_sessions_tracking" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "auth_sessions_tracking_action_idx" ON "auth_sessions_tracking" USING btree ("action");