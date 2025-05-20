import { useParams } from 'react-router-dom'

export default function BlogPost() {
  const { slug } = useParams()
  return <h1 className="text-3xl font-bold text-purple-600">Blog post: {slug}</h1>
}