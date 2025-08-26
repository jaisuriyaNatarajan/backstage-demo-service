// app.tsx
import { createApp } from '@backstage/app-defaults';
import React from 'react';
import { Route } from 'react-router-dom';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { AlertDisplay, OAuthRequestDialog, SignInPage } from '@backstage/core-components';

import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';

import { githubAuthApiRef, oktaAuthApiRef } from '@backstage/core-plugin-api';
import { UnifiedThemeProvider } from '@backstage/theme';
import { lightTheme } from './themes';
import { apis } from './apis';

import { VisitListener } from '@backstage/plugin-home';
import { HomepageCompositionRoot } from '@backstage/plugin-home';
import { SearchContextProvider } from '@backstage/plugin-search-react';

// your pages
import { Root } from './components/Root';
import { CatalogPage } from './components/catalog/CatalogPage';
import { entityPage } from './components/catalog/EntityPage';
import CustomCreatePage from './components/CustomCreatePage';

// (optional) your custom pages
import AccessibleGroupsPage from './components/groups/AccessibleGroupsPage';
import { InfyCustomPluginsPage } from './components/InfyCustomPlugin/InfyCustomPluginsPage';
import { WeatherPage } from '@infosys_ltd/daily-weather-plugin';
import { HolidayTrackerPage } from '@infosys_ltd/holiday-tracker-plugin';

const app = createApp({
  apis,
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        auto
        providers={[
          'guest',
          {
            id: 'github-auth-provider',
            title: 'GitHub',
            message: 'Sign in using GitHub',
            apiRef: githubAuthApiRef,
          },
          {
            id: 'okta-auth-provider',
            title: 'okta',
            message: 'Sign in using okta',
            apiRef: oktaAuthApiRef,
          },
        ]}
      />
    ),
  },
  themes: [
    {
      id: 'Custom-light-theme',
      title: 'Custom Theme',
      variant: 'light',
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={lightTheme}>{children}</UnifiedThemeProvider>
      ),
    },
  ],
});

// ---- routes
const routes = (
  <FlatRoutes>
    <Route
      path="/"
      element={
        <HomepageCompositionRoot>
          <SearchContextProvider>
            {/* your home component */}
            {/* <Home /> */}
          </SearchContextProvider>
        </HomepageCompositionRoot>
      }
    />

    {/* catalog */}
    <Route path="/catalog" element={<CatalogPage />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route path="/catalog/:namespace/:kind/:name" element={<CatalogEntityPage />}>
      {entityPage}
    </Route>

    {/* techdocs */}
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route path="/docs/:namespace/:kind/:name/*" element={<TechDocsReaderPage />}>
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>

    {/* your custom create landing */}
    <Route path="/create" element={<CustomCreatePage />} />

    {/* scaffolder form + nested routes — keep the wildcard */}
    <Route path="/create/*" element={<ScaffolderPage />} />

    {/* others (optional) */}
    <Route path="/groups/:username" element={<AccessibleGroupsPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/infy-custom-plugins" element={<InfyCustomPluginsPage />} />
    <Route path="/weather" element={<WeatherPage />} />
    <Route path="/holiday-tracker" element={<HolidayTrackerPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <VisitListener />
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
