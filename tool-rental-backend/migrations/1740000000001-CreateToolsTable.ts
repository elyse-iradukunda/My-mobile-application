import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateToolsTable1740000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum type for tool status
    await queryRunner.query(`
      CREATE TYPE tool_status_enum AS ENUM ('available', 'rented', 'unavailable', 'pending')
    `);

    await queryRunner.query(`
      CREATE TABLE tools (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        price_per_day DECIMAL(10,0) NOT NULL,
        deposit DECIMAL(10,0),
        location VARCHAR(255) NOT NULL,
        lat DECIMAL(10,7),
        lng DECIMAL(10,7),
        images TEXT[] DEFAULT '{}',
        status tool_status_enum DEFAULT 'pending',
        rating DECIMAL(3,2) DEFAULT 0,
        total_reviews INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX idx_tools_owner_id ON tools(owner_id);
      CREATE INDEX idx_tools_title ON tools(title);
      CREATE INDEX idx_tools_category ON tools(category);
      CREATE INDEX idx_tools_location ON tools(location);
      CREATE INDEX idx_tools_status ON tools(status);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tools;`);
    await queryRunner.query(`DROP TYPE tool_status_enum;`);
  }
}
