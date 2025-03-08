// export-to-csv.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function exportTableToCSV(tableName, modelName) {
  // Get the data using Prisma
  const data = await prisma.faqs.findMany();
  
  if (data.length === 0) {
    console.log(`No data found for ${tableName}`);
    return;
  }
  
  // Create CSV header
  const headers = Object.keys(data[0] || {}).join(',');
  
  // Create CSV rows with proper time formatting
  const rows = data.map(item => 
    Object.values(item).map(value => {
      if (value instanceof Date) {
        // Format date as ISO string which PostgreSQL can recognize
        return `"${value.toISOString()}"`;
      } else if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      } else if (value === null) {
        return '';
      } else {
        return value;
      }
    }).join(',')
  );
  
  // Combine header and rows
  const csv = [headers, ...rows].join('\n');
  
  // Write to file
  fs.writeFileSync(path.join(process.cwd(), `${tableName}.csv`), csv);
  console.log(`Exported ${data.length} records from ${tableName} to ${tableName}.csv`);
}

async function exportAllTables() {
  // Add your table name to model name mappings here
  const tables = [
    { tableName: 'faqs', modelName: 'faqs' },
 
      
  ];
  
  for (const table of tables) {
    await exportTableToCSV(table.tableName, table.modelName);
  }
  
  await prisma.$disconnect();
}

exportAllTables().catch(e => {
  console.error(e);
  process.exit(1);
});