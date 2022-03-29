/**
 * @description 文档页面，侧边栏 + 内容
 */

import React, { type ReactNode, useState, useCallback } from 'react';
import renderRoutes from '@docusaurus/renderRoutes';
import type { PropVersionMetadata } from '@docusaurus/plugin-content-docs';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import NotFound from '@theme/NotFound';
import type { DocumentRoute } from '@theme/DocItem';
import type { Props } from '@theme/DocPage';
import IconArrow from '@theme/IconArrow';
import BackToTopButton from '@theme/BackToTopButton';
import { matchPath } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import Footer from '@theme/Footer';
import {
  HtmlClassNameProvider,
  ThemeClassNames,
  docVersionSearchTag,
  DocsSidebarProvider,
  useDocsSidebar,
  DocsVersionProvider,
} from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import clsx from 'clsx';

import styles from './styles.module.scss';

type DocPageContentProps = {
  readonly currentDocRoute: DocumentRoute;
  readonly versionMetadata: PropVersionMetadata;
  readonly children: ReactNode;
  readonly sidebarName: string | undefined;
};

function DocPageContent({
  currentDocRoute,
  versionMetadata,
  children,
  sidebarName,
}: DocPageContentProps): JSX.Element {
  const sidebar = useDocsSidebar();
  const { pluginId, version } = versionMetadata;
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false); // 是否已经收起菜单栏
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }

    setHiddenSidebarContainer((value) => !value);
  }, [hiddenSidebar]);

  return (
    <>
      <SearchMetadata version={version} tag={docVersionSearchTag(pluginId, version)} />
      <Layout noFooter>
        <div className={styles.docPage}>
          <BackToTopButton />

          {sidebar && (
            <aside
              className={clsx(
                ThemeClassNames.docs.docSidebarContainer,
                styles.docSidebarContainer,
                hiddenSidebarContainer && styles.docSidebarContainerHidden
              )}
              onTransitionEnd={(e) => {
                if (!e.currentTarget.classList.contains(styles.docSidebarContainer!)) {
                  return;
                }

                if (hiddenSidebarContainer) {
                  setHiddenSidebar(true);
                }
              }}
            >
              <DocSidebar
                key={
                  // Reset sidebar state on sidebar changes
                  // See https://github.com/facebook/docusaurus/issues/3414
                  sidebarName
                }
                sidebar={sidebar}
                path={currentDocRoute.path}
                onCollapse={toggleSidebar}
                isHidden={hiddenSidebar}
              />

              {hiddenSidebar && (
                <div className={styles.collapsedDocSidebar}>
                  <CollapseButton
                    title='Expand sidebar'
                    onClick={toggleSidebar}
                    onKeyDown={toggleSidebar}
                    direction='right'
                  />
                </div>
              )}
              {/* {hiddenSidebar && (
                <div
                  className={styles.collapsedDocSidebar}
                  title={translate({
                    id: 'theme.docs.sidebar.expandButtonTitle',
                    message: 'Expand sidebar',
                    description:
                      'The ARIA label and title attribute for expand button of doc sidebar',
                  })}
                  aria-label={translate({
                    id: 'theme.docs.sidebar.expandButtonAriaLabel',
                    message: 'Expand sidebar',
                    description:
                      'The ARIA label and title attribute for expand button of doc sidebar',
                  })}
                  tabIndex={0}
                  role='button'
                  onKeyDown={toggleSidebar}
                  onClick={toggleSidebar}
                >
                  <IconArrow className={styles.expandSidebarButtonIcon} />
                </div>
              )} */}
            </aside>
          )}
          <main
            className={clsx(
              styles.docMainContainer,
              (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced
            )}
          >
            <div
              className={clsx(
                'container',
                styles.docItemWrapper,
                hiddenSidebarContainer && styles.docItemWrapperEnhanced
              )}
            >
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </Layout>
    </>
  );
}

export default function DocPage(props: Props): JSX.Element {
  const {
    route: { routes: docRoutes },
    versionMetadata,
    location,
  } = props;
  const currentDocRoute = docRoutes.find((docRoute) => matchPath(location.pathname, docRoute));
  if (!currentDocRoute) {
    return <NotFound />;
  }

  // For now, the sidebarName is added as route config: not ideal!
  const sidebarName = currentDocRoute.sidebar;

  const sidebar = sidebarName ? versionMetadata.docsSidebars[sidebarName] : null;

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.docsPages,
        ThemeClassNames.page.docsDocPage,
        versionMetadata.className
      )}
    >
      <DocsVersionProvider version={versionMetadata}>
        <DocsSidebarProvider sidebar={sidebar ?? null}>
          <DocPageContent
            currentDocRoute={currentDocRoute}
            versionMetadata={versionMetadata}
            sidebarName={sidebarName}
          >
            {renderRoutes(docRoutes, { versionMetadata })}
          </DocPageContent>
        </DocsSidebarProvider>
      </DocsVersionProvider>
    </HtmlClassNameProvider>
  );
}
