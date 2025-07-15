import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Divider } from '@material-ui/core';
import { useVisitedEntities } from '@backstage/plugin-home';
import { EntityRefLink } from '@backstage/plugin-catalog-react';

const CustomVisitedWidget = ({ title, entities }: { title: string; entities: any[] }) => (
  <Card style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: 20 }}>
    <CardContent>
      <Typography
        variant="h6"
        color="textPrimary"
        gutterBottom
        style={{ fontWeight: 600, fontSize: '1.1rem' }}
      >
        {title}
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      {entities.slice(0, 5).map((entity, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
            <EntityRefLink entityRef={entity.entityRef} />
          </Typography>
          {entity.description && (
            <Typography variant="body2" color="textSecondary">
              {entity.description}
            </Typography>
          )}
        </div>
      ))}
      <Button
        size="small"
        color="primary"
        style={{ marginTop: 10, textTransform: 'none', fontWeight: 500 }}
      >
        View More
      </Button>
    </CardContent>
  </Card>
);

export const HomePage = () => {
  const { recentEntities, topEntities } = useVisitedEntities();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <CustomVisitedWidget title="Recent Visited" entities={recentEntities} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomVisitedWidget title="Top Visited" entities={topEntities} />
      </Grid>
    </Grid>
  );
};
