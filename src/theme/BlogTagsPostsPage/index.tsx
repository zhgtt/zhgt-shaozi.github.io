import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
// import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import type { Props } from '@theme/BlogTagsPostsPage';
import Translate, { translate } from '@docusaurus/Translate';
import { ThemeClassNames, usePluralForm } from '@docusaurus/theme-common';

// import { Alert } from 'antd';

// function useBlogPostsPlural() {
//   const { selectMessage } = usePluralForm();
//   return (count: number) =>
//     selectMessage(
//       count,
//       translate(
//         {
//           id: 'theme.blog.post.plurals',
//           description:
//             'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
//           message: 'One post|{count} posts',
//         },
//         { count }
//       )
//     );
// }

const BlogTagsPostsPage = (props: Props): JSX.Element => {
  const { metadata, items, sidebar } = props;
  const { allTagsPath, name: tagName, count } = metadata;

  // const blogPostsPlural = useBlogPostsPlural();
  // const title = translate(
  //   {
  //     id: 'theme.blog.tagTitle',
  //     description: 'The title of the page for a blog tag',
  //     message: '{nPosts} tagged with "{tagName}"',
  //   },
  //   { nPosts: blogPostsPlural(count), tagName }
  // );
  const title = `找到 ${count} 篇 "${tagName}" 标签的文章`;

  return (
    <Layout
      // title={title}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogTagPostListPage}
      searchMetadatas={{ tag: 'blog_tags_posts' }}
      // sidebar={sidebar}
    >
      <main className='container'>
        <header className='mt-8 mb-16'>
          <h3 className='mb-4'>{title}</h3>
          <Link href={allTagsPath}>查看所有标签（分类）</Link>
        </header>

        {items.map(({ content: BlogPostContent }) => (
          <BlogPostItem
            key={BlogPostContent.metadata.permalink}
            frontMatter={BlogPostContent.frontMatter}
            assets={BlogPostContent.assets}
            metadata={BlogPostContent.metadata}
            truncated={BlogPostContent.metadata.truncated}
          >
            <BlogPostContent />
          </BlogPostItem>
        ))}
      </main>
    </Layout>
  );
};

export default BlogTagsPostsPage;
