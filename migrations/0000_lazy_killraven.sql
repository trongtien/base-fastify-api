CREATE TABLE IF NOT EXISTS "bds_products"."common_land" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text,
	"province_code" integer NOT NULL,
	"district_code" integer NOT NULL,
	"ward_code" integer NOT NULL,
	"status" integer DEFAULT 1,
	"created_by" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modify_by" varchar(255),
	"modify_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bds_products"."images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link" varchar(255) NOT NULL,
	"type" integer DEFAULT 0 NOT NULL,
	"position" integer DEFAULT 0,
	"is_avatar" integer DEFAULT 0 NOT NULL,
	"description" varchar(255),
	"is_used" integer DEFAULT 0,
	"post_estate_id" uuid,
	"is_confirm_update" integer DEFAULT 0 NOT NULL,
	"created_by" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modify_by" varchar(255),
	"modify_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bds_products"."post_estate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255),
	"slug" varchar(255) NOT NULL,
	"code" varchar(255) NOT NULL,
	"street" varchar(255),
	"lat" real DEFAULT 0,
	"lang" real DEFAULT 0,
	"type" integer DEFAULT 0 NOT NULL,
	"youtube_url" text,
	"point" real NOT NULL,
	"province_code" integer NOT NULL,
	"district_code" integer NOT NULL,
	"ward_code" integer NOT NULL,
	"customer_id" uuid NOT NULL,
	"note_verified" text,
	"is_block" integer DEFAULT 0 NOT NULL,
	"is_delete" integer DEFAULT 0 NOT NULL,
	"is_owner" integer DEFAULT 0 NOT NULL,
	"created_by" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modify_by" varchar(255),
	"modify_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bds_products"."post_estate_detail" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_estate_id" uuid,
	"content" text,
	"acreage" real,
	"facade" real,
	"num_way_in" real,
	"price" numeric,
	"unit" integer DEFAULT 0 NOT NULL,
	"price_square_metre" numeric,
	"direction_house" varchar(100),
	"direction_balcony" varchar(100),
	"num_bedroom" integer,
	"num_road_House" integer,
	"num_floors" integer,
	"num_bathroom" integer,
	"furniture" varchar(255),
	"house_owning_document" text,
	"contact_name" varchar(255),
	"contact_phone" varchar(255),
	"contact_mail" varchar(100),
	"created_by" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modify_by" varchar(255),
	"modify_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bds_products"."post_estate_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_estate_id" uuid NOT NULL,
	"node" text,
	"created_by" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modify_by" varchar(255),
	"modify_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bds_products"."post_estate_report" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" varchar(255) NOT NULL,
	"post_estate_id" uuid NOT NULL,
	"customer_id" uuid,
	"contact_name" varchar(50),
	"contact_phone" varchar(20),
	"contact_mail" varchar(50),
	"is_confirmed" integer DEFAULT 0 NOT NULL,
	"created_by" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modify_by" varchar(255),
	"modify_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bds_products"."images" ADD CONSTRAINT "images_post_estate_id_post_estate_id_fk" FOREIGN KEY ("post_estate_id") REFERENCES "bds_products"."post_estate"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bds_products"."post_estate_detail" ADD CONSTRAINT "post_estate_detail_post_estate_id_post_estate_id_fk" FOREIGN KEY ("post_estate_id") REFERENCES "bds_products"."post_estate"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bds_products"."post_estate_history" ADD CONSTRAINT "post_estate_history_post_estate_id_post_estate_id_fk" FOREIGN KEY ("post_estate_id") REFERENCES "bds_products"."post_estate"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "common_land_name_slug_id_idx" ON "bds_products"."common_land" USING btree ("name","slug","id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "image_link_id_idx" ON "bds_products"."images" USING btree ("link","id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_estate_name_slug_id_idx" ON "bds_products"."post_estate" USING btree ("title","slug","id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_estate_history_id_idx" ON "bds_products"."post_estate_history" USING btree ("post_estate_id","id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_estate_report_name_id_idx" ON "bds_products"."post_estate_report" USING btree ("contact_name","id");