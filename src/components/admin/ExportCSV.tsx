// src/components/ExportCSV.tsx
'use client';

import React from 'react';
import { Button } from '@payloadcms/ui';
import type { ClientComponentProps } from 'payload';

export const ExportCSV: React.FC<ClientComponentProps & { collection: string }> = ({
  collection,
}) => {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Fetch all documents from the collection
      const response = await fetch(`/api/${collection}?limit=10000`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const docs = data.docs;

      if (!docs || docs.length === 0) {
        alert('No data to export');
        return;
      }

      // Convert to CSV
      const csv = convertToCSV(docs);

      // Download the CSV
      downloadCSV(csv, `${collection}-export-${new Date().toISOString()}.csv`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{ padding: '1rem 5rem' }}>
      <Button onClick={handleExport} disabled={isExporting}>
        {isExporting ? 'Exporting...' : 'Export to CSV'}
      </Button>
    </div>
  );
};

function convertToCSV(data: any[]): string {
  if (!data.length) return '';

  // Get all unique keys from all objects (flattened)
  const allKeysSet = new Set<string>();
  data.forEach((item) => {
    Object.keys(flattenObject(item)).forEach((key) => allKeysSet.add(key));
  });

  // Sort keys to maintain consistent order
  // Put common fields first, then alphabetically sort the rest
  const priorityFields = ['id', 'createdAt', 'updatedAt'];
  const allKeys = Array.from(allKeysSet);

  const headers = [
    ...priorityFields.filter((key) => allKeys.includes(key)),
    ...allKeys.filter((key) => !priorityFields.includes(key)).sort(),
  ];

  // Create CSV header row
  const csvRows = [headers.join(',')];

  // Add data rows
  data.forEach((item) => {
    const flatItem = flattenObject(item);
    const values = headers.map((header) => {
      const value = flatItem[header];
      // Escape quotes and wrap in quotes if contains comma or quote
      const escaped = String(value ?? '').replace(/"/g, '""');
      return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
    });
    csvRows.push(values.join(','));
  });

  return csvRows.join('\n');
}

function flattenObject(obj: any, prefix = ''): Record<string, any> {
  const flattened: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    // Skip internal Payload fields if desired
    if (key === 'id' || key === 'createdAt' || key === 'updatedAt') {
      flattened[newKey] = value;
      return;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // For relationship fields, just store the ID
      if (value.id) {
        flattened[newKey] = value.id;
      } else {
        Object.assign(flattened, flattenObject(value, newKey));
      }
    } else if (Array.isArray(value)) {
      flattened[newKey] = JSON.stringify(value);
    } else {
      flattened[newKey] = value;
    }
  });

  return flattened;
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
