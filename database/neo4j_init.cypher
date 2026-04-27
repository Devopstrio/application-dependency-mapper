// Devopstrio Application Dependency Mapper
// Neo4j Enterprise Graph Initialisation & Constraints

// Node Property Constraints
CREATE CONSTRAINT component_id IF NOT EXISTS FOR (c:Component) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT app_id IF NOT EXISTS FOR (a:Application) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT db_id IF NOT EXISTS FOR (d:Database) REQUIRE d.id IS UNIQUE;

// Indexes for rapid UI rendering and blast radius traversal
CREATE INDEX component_type_index IF NOT EXISTS FOR (c:Component) ON (c.type);
CREATE INDEX component_region_index IF NOT EXISTS FOR (c:Component) ON (c.region);
CREATE INDEX app_name_index IF NOT EXISTS FOR (a:Application) ON (a.name);

// ==============================================
// MOCK DATA SEEDING (For High-Level Demonstrations)
// ==============================================

// Create Core Systems
MERGE (gateway:Component:Application {id: 'api-gw-01', name: 'Global API Gateway', type: 'Gateway', region: 'uksouth'})
MERGE (auth:Component:Application {id: 'auth-svc-01', name: 'Identity Provider Service', type: 'Microservice', region: 'uksouth'})
MERGE (payment:Component:Application {id: 'pay-svc-01', name: 'Payment Orchestrator', type: 'Microservice', region: 'uksouth'})
MERGE (fraud:Component:Application {id: 'fraud-svc-01', name: 'Fraud Detection Engine', type: 'AI-Model', region: 'ukwest'})
MERGE (payment_db:Component:Database {id: 'db-pay-01', name: 'PostgreSQL Payments', type: 'Azure PostgreSQL', region: 'uksouth'})

// Create Dependency Relationships [CALLS], [READS], [WRITES]
MERGE (gateway)-[:CALLS {protocol: 'HTTPS', avg_latency_ms: 12}]->(auth)
MERGE (gateway)-[:CALLS {protocol: 'HTTPS', avg_latency_ms: 45}]->(payment)
MERGE (payment)-[:CALLS {protocol: 'gRPC', avg_latency_ms: 5}]->(fraud)
MERGE (payment)-[:WRITES {protocol: 'TCP', port: 5432}]->(payment_db)
MERGE (payment)-[:READS {protocol: 'TCP', port: 5432}]->(payment_db)
MERGE (auth)-[:READS {protocol: 'TCP', port: 6379}]->(cache:Component:Database {id: 'db-redis-01', name: 'Auth Redis Cache', type: 'Azure Cache'})
