import { useParams } from "react-router"


const CategoryPosts = () => {
  const {category} = useParams();
  return (
    <div><h1>{category}</h1></div>
  )
};

export default CategoryPosts;