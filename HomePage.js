
import React from 'react';
import {
  PageContainer,
  WelcomeText,
  SearchWrapper,
  SearchBar,
  NotificationIcon,
  CardGrid
} from './styles';

import { TopVisited } from './TopVisited';
import { RecentVisited } from './RecentVisited';
import { StarredEntities } from './StarredEntities';
import { FiBell } from 'react-icons/fi';

const HomePage = () => {
  return (
    <PageContainer>
      <WelcomeText>Welcome, Jaisuriya!</WelcomeText>
      <SearchWrapper>
        <SearchBar placeholder="Search services, plugins..." />
        <NotificationIcon>
          <FiBell />
        </NotificationIcon>
      </SearchWrapper>
      <CardGrid>
        <TopVisited />
        <RecentVisited />
      </CardGrid>
      <StarredEntities />
    </PageContainer>
  );
};

export default HomePage;
