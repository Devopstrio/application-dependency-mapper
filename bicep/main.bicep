// Devopstrio Application Dependency Mapper - Graph Infrastructure Orchestration

targetScope = 'subscription'

param location string = 'uksouth'
param prefix string = 'adm'
param env string = 'prd'

resource rgPlatform 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${prefix}-platform-${env}'
  location: location
}

resource rgData 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${prefix}-data-${env}'
  location: location
}

// 1. Core Analytics Compute Fabric
module platform './modules/app-platform.bicep' = {
  scope: rgPlatform
  name: 'platformDeploy'
  params: {
    location: location
    clusterName: 'aks-${prefix}-host-${env}'
  }
}

// 2. Relational Metadata Database (PostgreSQL)
module psql './modules/postgres.bicep' = {
  scope: rgData
  name: 'postgresDeploy'
  params: {
    location: location
    serverName: 'psql-${prefix}-meta-${env}'
  }
}

// 3. High Performance Graph Database (Neo4j Enterprise on Azure VM/AKS)
module graph './modules/neo4j-cluster.bicep' = {
  scope: rgData
  name: 'neo4jDeploy'
  params: {
    location: location
    clusterName: 'neo4j-${prefix}-graph-${env}'
  }
}

output graphEndpoint string = graph.outputs.connectionUri
