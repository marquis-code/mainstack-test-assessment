// composables/useExportToCsv.ts

type ObjectWithStrings = { [key: string]: string };

export function useExportToCsv() {
  const generateCsvContent = (data: ObjectWithStrings[]) => {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map(row =>
      Object.values(row)
        .map((field) => `"${field.replace(/"/g, '""')}"`) // Escape double quotes in data.
        .join(',')
    ).join('\n');
  
    return headers + rows;
  };

  const downloadCsv = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToCsv = (filename: string, data: ObjectWithStrings[]) => {
    if (!data.length) return;
    const csvContent = generateCsvContent(data);
    downloadCsv(filename, csvContent);
  };

  return { exportToCsv };
}
