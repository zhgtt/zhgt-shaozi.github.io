import React, { ReactNode, useState, useCallback } from 'react';
import { MDXProvider } from '@mdx-js/react';
import renderRoutes from '@docusaurus/renderRoutes';
import type { PropVersionMetadata } from '@docusaurus/plugin-content-docs';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import MDXComponents from '@theme/MDXComponents';
import Footer from '@theme/Footer';
import NotFound from '@theme/NotFound';
import type { DocumentRoute } from '@theme/DocItem';
import type { Props } from '@theme/DocPage';
// import IconArrow from '@theme/IconArrow';
import BackToTopButton from '@theme/BackToTopButton';
import { matchPath } from '@docusaurus/router';
// import { translate } from '@docusaurus/Translate';
import {
  ThemeClassNames,
  docVersionSearchTag,
  DocsSidebarProvider,
  useDocsSidebar,
  DocsVersionProvider,
} from '@docusaurus/theme-common';
import Head from '@docusaurus/Head';
import clsx from 'clsx';

import styles from './styles.module.scss';

import HideableSidebarButton from '../HideableSidebarButton';

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
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }

    setHiddenSidebarContainer((value) => !value);
  }, [hiddenSidebar]);

  return (
    <Layout
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsDocPage}
      searchMetadata={{
        version,
        tag: docVersionSearchTag(pluginId, version),
      }}
      noFooter // 不显示底部内容
    >
      <div className={styles.docPage}>
        <BackToTopButton />

        {/* 侧边栏 */}
        {sidebar && (
          <aside
            className={clsx(styles.docSidebarContainer, {
              [styles.docSidebarContainerHidden]: hiddenSidebarContainer,
            })}
            onTransitionEnd={(e) => {
              if (!e.currentTarget.classList.contains(styles.docSidebarContainer)) {
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
                <HideableSidebarButton
                  title='Expand sidebar'
                  onClick={toggleSidebar}
                  onKeyDown={toggleSidebar}
                  direction='right'
                />
              </div>
            )}
          </aside>
        )}

        {/* 主体内容 */}
        <main
          className={clsx(styles.docMainContainer, {
            [styles.docMainContainerEnhanced]: hiddenSidebarContainer || !sidebar,
          })}
        >
          <div
            className={clsx('container', styles.docItemWrapper, {
              [styles.docItemWrapperEnhanced]: hiddenSidebarContainer,
            })}
          >
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </div>
          <Footer />
        </main>
      </div>
    </Layout>
  );
}

function DocPage(props: Props): JSX.Element {
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
    <>
      <Head>
        {/* TODO we should add a core addRoute({htmlClassName}) generic plugin option */}
        <html className={versionMetadata.className} />
      </Head>
      <DocsVersionProvider version={versionMetadata}>
        <DocsSidebarProvider sidebar={sidebar}>
          <DocPageContent
            currentDocRoute={currentDocRoute}
            versionMetadata={versionMetadata}
            sidebarName={sidebarName}
          >
            {renderRoutes(docRoutes, { versionMetadata })}
          </DocPageContent>
        </DocsSidebarProvider>
      </DocsVersionProvider>
    </>
  );
}

export default DocPage;
