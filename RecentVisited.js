
import React from 'react';
import { Card, SectionTitle, ViewMore } from './styles';
import { FaClock } from 'react-icons/fa';

export const RecentVisited = () => {
  const items = [
    { name: 'openfga', type: 'component' },
    { name: 'holiday-tracker-plugin', type: 'component' },
    { name: 'daily-weather-plugin', type: 'component' }
  ];

  return (
    <Card>
      <SectionTitle><FaClock /> Recent Visited</SectionTitle>
      <div>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span>{item.name}</span>
            <span style={{
              fontSize: 12,
              background: '#f1f4f8',
              padding: '2px 8px',
              borderRadius: 8
            }}>{item.type}</span>
          </div>
        ))}
      </div>
      <ViewMore>View more</ViewMore>
    </Card>
  );
};
