<div align="center">

<img src="https://raw.githubusercontent.com/Devopstrio/.github/main/assets/Browser_logo.png" height="85" alt="Devopstrio Logo" />

<h1>Application Dependency Mapper</h1>

<p><strong>Enterprise Graph Analytics & Auto-Discovery for Service Interactions and Blast Radius Simulations</strong></p>

[![Architecture](https://img.shields.io/badge/Architecture-Graph_Topology-522c72?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)
[![Cloud](https://img.shields.io/badge/Platform-Azure_Native-0078d4?style=for-the-badge&logo=microsoftazure&labelColor=000000)](/terraform)
[![Analytics](https://img.shields.io/badge/Engine-Neo4j_Driven-962964?style=for-the-badge&labelColor=000000)](/apps/graph-engine)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)

</div>

---

## 🏛️ Executive Summary

![App Dependency Mapper Architecture](assets/diagram-architecture.png)

The **Application Dependency Mapper (ADM)** is a flagship graph-analytics platform engineered to eradicate "hidden dependencies" in the enterprise. By autonomously scanning networks, codebases, and APIs, ADM constructs a real-time logical topology of how every system interacts.

### Strategic Business Outcomes
- **Blast Radius Simulation**: Instantly predict which downstream applications will crash if a specific database or API goes offline.
- **Microservice Visualizations**: Automatically map the complex mesh of Kubernetes pods, Cloud databases, and Legacy monoliths without manual CMDB entry.
- **Migration Intelligence**: Identify "tightly coupled" systems prior to cloud migrations, ensuring entire dependency chains are moved simultaneously.
- **Single Point of Failure (SPOF) Detection**: Run graph traversals to find centralized services lacking redundancy.

---

## 🏗️ Technical Architecture Details

### 1. High-Level Architecture
```mermaid
graph TD
    UI[Next.js Portal UI] --> API[FastAPI Gateway]
    API --> DB[(PostgreSQL Metadata)]
    API --> Neo4j[(Neo4j Graph DB)]
    API --> Disc[Discovery Engine]
    API --> Impact[Change Impact Engine]
    Disc --> K8s(AKS Clusters)
    Disc --> Azure(Azure Resource Graph)
```

### 2. Auto-Discovery Workflow
```mermaid
sequenceDiagram
    participant Cron
    participant Engine as Discovery Engine
    participant Azure as Azure API
    participant Graph as Neo4j Graph
    
    Cron->>Engine: Run Nightly Scan
    Engine->>Azure: Query vNet Flow Logs & App Services
    Azure-->>Engine: Raw Connections (IP A -> IP B)
    Engine->>Engine: Resolve IPs to Application Names
    Engine->>Graph: Merge Nodes (Apps) & Edges (Calls)
```

### 3. Graph Build Lifecycle
```mermaid
graph LR
    Raw[Raw Network Data] --> Normalize[Normalization]
    Normalize --> Nodes[Upsert App Nodes]
    Normalize --> Edges[Upsert Dependency Edges]
    Edges --> Score[Assign Criticality Weights]
    Score --> CMDB[Sync Owner from CMDB]
```

### 4. Change Impact Analysis Flow (Blast Radius)
```mermaid
graph TD
    Change[Planned DB Migration] --> API[Impact Engine]
    API --> Graph[(Neo4j Path Traversal)]
    Graph --> App1[App1 - Downstream]
    Graph --> App2[App2 - Downstream]
    Graph --> AppX[AppX - Indirect Downstream]
    AppX --> Alert[Notify AppX Owner]
```

### 5. Multi-Tenant Model
```mermaid
graph TD
    App[Discovery Platform] --> Graph[(Tenant Sub-Graphs)]
    Graph --> Retail[Retail BU Topology]
    Graph --> Fin[Finance BU Topology]
```

### 6. Security Trust Boundary
```mermaid
graph TD
    User --> WAF[Azure WAF]
    WAF --> AKS[AKS Application Pods]
    AKS --> Azure[Azure AD / Managed Identity]
    Azure --> APIS[Cloud APIs / K8s APIs]
```

### 7. AKS Workload Topology
```mermaid
graph TD
    subgraph mapping_namespace
        API[Platform API]
        GraphEng[Graph Engine]
        Disc[Discovery CronJobs]
    end
    Disc -->|Internal RPC| GraphEng
    API -->|Cypher Queries| Neo4j
```

### 8. Disaster Recovery Topology
```mermaid
graph LR
    Master[(Primary Neo4j+pgSQL)] -->|Async Replication| Backup[(Secondary Region)]
    Traffic -->|Failover| Backup
```

---

## 🛠️ Global Platform Engines

| Engine | Directory | Purpose |
|:---|:---|:---|
| **Portal UI** | `apps/portal/` | Interactive React graph visualizer and executive dashboard. |
| **Platform API** | `apps/api/` | Gateway orchestrating searches and impact simulations. |
| **Discovery Engine**| `apps/discovery-engine/`| Agents interacting with Azure/AWS/K8s to extract topology. |
| **Graph Engine** | `apps/graph-engine/` | Translates raw network flows into semantic Neo4j Cypher data. |
| **Impact Engine** | `apps/change-impact-engine/`| Executes path traversal to calculate blast radius percentages. |

---

## 🚀 Deployment

Provision the foundation utilizing the Bicep templates.

```bash
cd bicep
az deployment sub create --name adm-platform --location uksouth --template-file main.bicep
```

---
<sub>&copy; 2026 Devopstrio &mdash; Illuminating the Enterprise Architecture.</sub>
