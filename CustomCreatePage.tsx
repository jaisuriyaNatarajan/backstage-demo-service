// components/CustomCreatePage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

import { Content, Header, Page } from '@backstage/core-components';
import { useApi, useRouteRef } from '@backstage/core-plugin-api';
import { Entity, stringifyEntityRef } from '@backstage/catalog-model';

import {
  catalogApiRef,
  useStarredEntities,
} from '@backstage/plugin-catalog-react';
import { selectedTemplateRouteRef } from '@backstage/plugin-scaffolder';

import TemplateCard from './cards/TemplateCard';

type CardVM = {
  tag: string;
  name: string;
  section: string;
  descriptionTop: string;
  descriptionBottom: string;
  repoText: string;
  entity: Entity;
};

function mapTemplateToCard(entity: Entity): CardVM {
  const { metadata, spec } = entity;
  const namespace = metadata.namespace ?? 'default';
  const name = metadata.name ?? 'template';

  return {
    tag: (spec as any)?.type ?? 'template',
    name: (metadata as any).title ?? name,
    section: 'Title',
    descriptionTop: (spec as any)?.description ?? '',
    descriptionBottom: (spec as any)?.description ?? '',
    repoText:
      metadata.annotations?.['github.com/project-slug'] ??
      metadata.annotations?.['backstage.io/source-location'] ??
      (spec as any)?.owner ??
      'template',
    entity,
  };
}

export default function CustomCreatePage() {
  const catalogApi = useApi(catalogApiRef);
  const navigate = useNavigate();
  const toSelected = useRouteRef(selectedTemplateRouteRef);

  const { isStarredEntity, toggleStarredEntity } = useStarredEntities();

  const [templates, setTemplates] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Load templates from catalog
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const { items } = await catalogApi.getEntities({
          filter: { kind: 'Template' },
        });
        if (mounted) setTemplates(items ?? []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [catalogApi]);

  const cards: CardVM[] = useMemo(
    () => templates.map(mapTemplateToCard),
    [templates],
  );

  const cardsToDisplay = useMemo(() => {
    if (isExpanded) return cards;
    return cards.slice(0, 4);
  }, [cards, isExpanded]);

  return (
    <Page themeId="tool">
      <Header
        title="Create a new component"
        subtitle="Create new software components using standard templates in your organization"
      />
      <Content>
        {loading && (
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <CircularProgress />
          </div>
        )}

        {!loading && cards.length === 0 && (
          <Grid item xs={12}>
            <div style={{ opacity: 0.7, textAlign: 'center', marginTop: 20 }}>
              No templates found.
            </div>
          </Grid>
        )}

        {!loading && cards.length > 0 && (
          <>
            <Grid container spacing={3}>
              {cardsToDisplay.map(card => {
                const entity = card.entity;
                const namespace = entity.metadata.namespace ?? 'default';
                const kind = (entity.kind ?? 'Template').toLowerCase();
                const templateName = entity.metadata.name!;
                const entityRef = stringifyEntityRef(entity);

                const infoRoute = `/catalog/${namespace}/${kind}/${templateName}`;
                const chooseRoute = toSelected({
                  namespace,
                  kind,
                  templateName,
                });

                return (
                  <Grid item xs={12} md={6} key={`${namespace}/${templateName}`}>
                    <TemplateCard
                      tag={card.tag}
                      name={card.name}
                      section={card.section}
                      descriptionTop={entity.metadata.description ?? card.descriptionTop}
                      descriptionBottom={card.descriptionBottom}
                      repoText={(entity.spec as any)?.owner ?? card.repoText}
                      onStar={() => toggleStarredEntity(entityRef)}
                      onInfo={() => navigate(infoRoute)}
                      onChoose={() => navigate(chooseRoute)}
                      isStarred={isStarredEntity(entityRef)}
                    />
                  </Grid>
                );
              })}
            </Grid>

            {cards.length > 4 && (
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Button variant="contained" onClick={() => setIsExpanded(v => !v)}>
                  {isExpanded ? 'View Less' : 'View More'}
                </Button>
              </div>
            )}
          </>
        )}
      </Content>
    </Page>
  );
}
