import PropTypes from 'prop-types';
import {SmallSetPagination} from "../../components/pagination/SmallSetPagination"
import {BlogCardHorizontal} from "./BlogCardHorizontal"


export const BlogList = ({posts, get_blog_list_page, count}) => {
    //console.log('blog posts: ' )
    //console.log(posts)
  return (
    <div className="overflow-hidden px-8 bg-white">
      <ul role="list" className="divide-y space-y-8 gap-8 divide-gray-200">
        {posts.data.map((post, index) => (
          <BlogCardHorizontal data={post} key={index} index={index}/>
        ))}
      </ul>
      <SmallSetPagination list_page={get_blog_list_page} list={posts} count={count} />
    </div>
  )
}
BlogList.propTypes = {    
    posts: PropTypes.object,
    get_blog_list_page : PropTypes.func,
    count: PropTypes.number
}