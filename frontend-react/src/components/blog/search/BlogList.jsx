import PropTypes from 'prop-types';
import {SmallSetPaginationSearch} from "../../../components/pagination/SmallSetPaginationSearch"
import {BlogCardSearch} from "../BlogCardSearch"


export const BlogList = ({posts, get_blog_list_page, count, term}) => {
    console.log('blog posts search: ' )
    console.log(posts)
    
  return (
    <div className="overflow-hidden px-8 bg-white">
      <ul role="list" className="divide-y space-y-8 gap-8 divide-gray-200">
        {posts.data.map((post, index) => (
          <BlogCardSearch data={post} key={index} index={index}/>
        ))}
      </ul>
      <SmallSetPaginationSearch list_page={get_blog_list_page} term={term} list={posts} count={count} />
    </div>
  )
}
BlogList.propTypes = {    
    posts: PropTypes.object,
    get_blog_list_page : PropTypes.func,
    count: PropTypes.number,
    term: PropTypes.string
}