
import React from 'react';
import {
  StarredEntitiesWrapper,
  SectionTitle,
  EntityRow,
  EntityCard,
  EntityAvatar,
  EntityDetails,
  EntityName,
  EntityType
} from './styles';

export const StarredEntities = () => {
  const entities = [
    { name: 'daily-weather-plugin', initial: 'D', bg: '#475569' },
    { name: 'infybackstage', initial: 'I', bg: '#fb5e5e' },
    { name: 'openfga', initial: 'U', bg: '#4b5563' },
    { name: 'user-management', initial: 'F', bg: '#0891b2' },
    { name: 'workflow-engine', initial: 'W', bg: '#6366f1' },
    { name: 'pdf-generator', initial: 'U', bg: '#059669' },
  ];

  return (
    <StarredEntitiesWrapper>
      <SectionTitle>Your Starred Entities</SectionTitle>
      <EntityRow>
        {entities.map((e, idx) => (
          <EntityCard key={idx}>
            <EntityAvatar bg={e.bg}>{e.initial}</EntityAvatar>
            <EntityDetails>
              <EntityName>{e.name}</EntityName>
              <EntityType>Component</EntityType>
            </EntityDetails>
          </EntityCard>
        ))}
      </EntityRow>
    </StarredEntitiesWrapper>
  );
};
