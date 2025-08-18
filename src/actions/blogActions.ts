'use server';

import { revalidatePath } from 'next/cache';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@/payload/payload.config';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayloadHMR({ config: configPromise });
    
    const posts = await payload.find({
      collection: 'posts',
      sort: '-createdAt',
      limit: 50,
    });

    console.log(`✅ Fetched ${posts.docs.length} posts from MongoDB Atlas`);

    return posts.docs.map(doc => ({
      id: String(doc.id),
      title: doc.title,
      content: doc.content,
      author: doc.author,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  } catch (error) {
    console.error('❌ Error fetching posts from MongoDB Atlas:', error);
    return [];
  }
}

export async function getPost(id: string): Promise<BlogPost | null> {
  try {
    const payload = await getPayloadHMR({ config: configPromise });
    
    const post = await payload.findByID({
      collection: 'posts',
      id,
    });

    console.log(`✅ Fetched post: ${post.title}`);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  } catch (error) {
    console.error('❌ Error fetching post:', error);
    return null;
  }
}

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;

  // Validation
  if (!title?.trim()) {
    return { error: 'Title is required' };
  }
  if (!content?.trim()) {
    return { error: 'Content is required' };
  }
  if (!author?.trim()) {
    return { error: 'Author is required' };
  }

  try {
    const payload = await getPayloadHMR({ config: configPromise });
    
    const newPost = await payload.create({
      collection: 'posts',
      data: {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
      },
    });

    console.log(`✅ Created post in MongoDB Atlas: ${newPost.title}`);

    revalidatePath('/');
    return { success: 'Post created successfully in database!' };
  } catch (error) {
    console.error('❌ Error creating post in MongoDB Atlas:', error);
    return { error: 'Failed to create post. Please check your database connection.' };
  }
}

export async function updatePost(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;

  // Validation
  if (!title?.trim()) {
    return { error: 'Title is required' };
  }
  if (!content?.trim()) {
    return { error: 'Content is required' };
  }
  if (!author?.trim()) {
    return { error: 'Author is required' };
  }

  try {
    const payload = await getPayloadHMR({ config: configPromise });
    
    const updatedPost = await payload.update({
      collection: 'posts',
      id,
      data: {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
      },
    });

    console.log(`✅ Updated post in MongoDB Atlas: ${updatedPost.title}`);

    revalidatePath('/');
    return { success: 'Post updated successfully in database!' };
  } catch (error) {
    console.error('❌ Error updating post in MongoDB Atlas:', error);
    return { error: 'Failed to update post. Please check your database connection.' };
  }
}

export async function deletePost(id: string) {
  try {
    const payload = await getPayloadHMR({ config: configPromise });
    
    await payload.delete({
      collection: 'posts',
      id,
    });

    console.log(`✅ Deleted post from MongoDB Atlas: ${id}`);

    revalidatePath('/');
  } catch (error) {
    console.error('❌ Error deleting post from MongoDB Atlas:', error);
    throw new Error('Failed to delete post. Please check your database connection.');
  }
}
