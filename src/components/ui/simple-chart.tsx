import React from 'react';

// Simple chart components to avoid TypeScript issues with recharts
export const SimpleLineChart = ({ data, dataKey, xKey }: { data: any[], dataKey: string, xKey: string }) => (
  <div className="h-[300px] flex items-end space-x-2 p-4">
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center flex-1">
        <div 
          className="bg-primary rounded-t w-full min-h-[20px]" 
          style={{ height: `${Math.max((item[dataKey] || 0) / Math.max(...data.map(d => d[dataKey] || 0)) * 200, 20)}px` }}
        />
        <span className="text-xs mt-2 text-muted-foreground truncate">{item[xKey]}</span>
      </div>
    ))}
  </div>
);

export const SimpleBarChart = ({ data, dataKey, xKey }: { data: any[], dataKey: string, xKey: string }) => (
  <div className="h-[300px] flex items-end space-x-2 p-4">
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center flex-1">
        <div 
          className="bg-secondary rounded-t w-full min-h-[20px]" 
          style={{ height: `${Math.max((item[dataKey] || 0) / Math.max(...data.map(d => d[dataKey] || 0)) * 200, 20)}px` }}
        />
        <span className="text-xs mt-2 text-muted-foreground truncate">{item[xKey]}</span>
      </div>
    ))}
  </div>
);

export const SimplePieChart = ({ data }: { data: Array<{ name: string, value: number, color: string }> }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="h-[300px] flex items-center justify-center">
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm">{item.name}</span>
            <span className="text-sm font-semibold">{Math.round((item.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};