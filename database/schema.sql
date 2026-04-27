-- Devopstrio Application Dependency Mapper
-- Metadata Tracking Schema (Graph data lives in Neo4j)
-- Target: PostgreSQL 14+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizational Hierarchy
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    role VARCHAR(50) DEFAULT 'Viewer', -- Arch, Engineer, SRE, Viewer
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Catalog Overlay (Connects to Neo4j Node UUIDs)
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    graph_node_id VARCHAR(255) UNIQUE NOT NULL, -- Ties to Neo4j UUID constraint
    name VARCHAR(255) NOT NULL,
    business_criticality INT DEFAULT 3, -- 1=Low, 5=Mission Critical
    owner_id UUID REFERENCES users(id),
    cmdb_reference VARCHAR(255), -- Link back to ServiceNow
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Discovery Operation Logs
CREATE TABLE IF NOT EXISTS scan_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    connector_type VARCHAR(100) NOT NULL, -- 'Azure', 'Kubernetes', 'ServiceNow'
    status VARCHAR(50) DEFAULT 'Running', -- Running, Completed, Failed
    nodes_discovered INT DEFAULT 0,
    edges_discovered INT DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Impact Simulation Scenarios (Saved Planning)
CREATE TABLE IF NOT EXISTS impact_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scenario_name VARCHAR(255) NOT NULL,
    target_node_id VARCHAR(255) NOT NULL,
    blast_radius_score FLOAT, -- Affected vs Total
    affected_nodes JSONB DEFAULT '[]', -- Snapshot of Neo4j output
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_apps_graph ON applications(graph_node_id);
CREATE INDEX idx_scans_tenant ON scan_jobs(tenant_id);
