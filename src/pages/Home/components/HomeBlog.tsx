import SectionHead from '@/components/ui/SectionHead';
import { BLOG_POSTS } from '../data';
import type { BlogPost } from '../types';

type BlogCardProps = {
  post: BlogPost;
};

function BlogCard({ post }: BlogCardProps) {
  const { title, category, readTime, coverBackground, Cover } = post;
  return (
    <article className='group flex flex-col gap-3.5 cursor-pointer transition-transform duration-200 hover:-translate-y-1'>
      <div
        className='photo h-60 overflow-hidden'
        style={{ background: coverBackground }}
      >
        <div className='transition-transform duration-340 group-hover:scale-[1.05] w-full h-full'>
          <Cover />
        </div>
      </div>
      <div
        className='flex gap-3 text-13'
        style={{ color: 'var(--muted)' }}
      >
        <span>{category}</span> · <span>{readTime}</span>
      </div>
      <h4 className='text-18 leading-130 font-semibold transition-colors duration-200 group-hover:text-(--rausch)'>
        {title}
      </h4>
    </article>
  );
}

export default function HomeBlog() {
  return (
    <section className='section'>
      <SectionHead
        heading='Resources &amp; blog stories'
        subheading='Practical guides for new pet parents — from the first 30 days to senior care.'
      />
      <div className='r-grid-3 gap-7'>
        {BLOG_POSTS.map((post) => (
          <BlogCard key={post.title} post={post} />
        ))}
      </div>
    </section>
  );
}
