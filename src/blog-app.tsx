import { useState } from 'react'
import Button from '@mui/material/Button';
import Input from "@mui/material/Input"
import Textarea from "@mui/material/TextareaAutosize"
import { Card, CardContent, CardActions, CardHeader, } from "@mui/material"
import { Trash, Edit, Plus } from "lucide-react"
import React from 'react';

type BlogPost = {
	id: number
	title: string
	content: string
}

function BlogApp() {
	const [posts, setPosts] = useState<BlogPost[]>([])
	const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [postIdCounter, setPostIdCounter] = useState(1)

	const handleCreatePost = () => {
		if (title && content) {
			const newPost: BlogPost = {
				id: postIdCounter,
				title,
				content,
			}
			setPosts([...posts, newPost])
			setPostIdCounter(postIdCounter + 1)
			setTitle('')
			setContent('')
		}
	}

	const handleEditPost = () => {
		if (currentPost && title && content) {
			const updatedPosts = posts.map(post =>
				post.id === currentPost.id ? { ...post, title, content } : post
			)
			setPosts(updatedPosts)
			setCurrentPost(null)
			setTitle('')
			setContent('')
			setIsEditing(false)
		}
	}

	const handleDeletePost = (id: number) => {
		const updatedPosts = posts.filter(post => post.id !== id)
		setPosts(updatedPosts)
		if (currentPost?.id === id) {
			setCurrentPost(null)
			setTitle('')
			setContent('')
			setIsEditing(false)
		}
	}

	const handleSelectPost = (post: BlogPost) => {
		setCurrentPost(post)
		setTitle(post.title)
		setContent(post.content)
		setIsEditing(true)
	}

	return (
		<div className="min-h-screen flex flex-col bg-white">
			{/* Header */}
			<header className="bg-primary text-primary-foreground shadow-lg">
				<div className="container mx-auto px-4 py-6 flex justify-between items-center">
					<h1 className="text-2xl font-bold">My Awesome Blog</h1>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-grow container mx-auto px-4 py-8">
				<div className="mb-8">
					<h2 className="text-3xl font-bold mb-4">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
					<div className="grid grid-cols-1 gap-4">
						<Input
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="col-span-1"
						/>
						<Textarea
							placeholder="Content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="col-span-1"
						/>
						<div className="flex justify-end">
							<Button onClick={isEditing ? handleEditPost : handleCreatePost} className="mr-2">
								{isEditing ? 'Save Changes' : 'Create Post'}
							</Button>
							{isEditing && (
								<Button onClick={() => setIsEditing(false)}>
									Cancel
								</Button>
							)}
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{posts.map(post => (
							<Card key={post.id} className="relative">
								{/* <CardHeader>
									<CardTitle>{post.title}</CardTitle>
								</CardHeader> */}
								<CardContent>
									<p className="text-muted-foreground">{post.title}</p>
								</CardContent>
								<CardContent>
									<p className="text-muted-foreground">{post.content}</p>
								</CardContent>
								<CardActions className="flex justify-between items-center">
									<div className="flex space-x-2">
										<Button onClick={() => handleSelectPost(post)}>
											<Edit className="mr-2 h-4 w-4" /> Edit
										</Button>
										<Button onClick={() => handleDeletePost(post.id)}>
											<Trash className="mr-2 h-4 w-4" /> Delete
										</Button>
									</div>
								</CardActions>
							</Card>
						))}
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-muted mt-8">
				<div className="container mx-auto px-4 py-6 text-center">
					<p>&copy; 2023 My Awesome Blog. All rights reserved.</p>
				</div>
			</footer>
		</div>
	)
}

export default BlogApp