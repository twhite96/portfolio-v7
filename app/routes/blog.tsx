import {useLoaderData} from '@remix-run/react'
import Parser from 'rss-parser';
import axios from 'axios'


type Blog = {
  id: string
  url: string
  title: string
  image_url: string
  description: string
  tag_list: string[]
};

type GetRssData = {
  rssFeedURL: string
}

// type CustomFeed = {foo: string};
// type CustomItem = {bar: number};



const parser: Parser<GetRssData> = new Parser({

});

(async () => {

  const feed = await parser.parseURL('https://tiffanywhite.dev/rss');
  console.log(feed.title); // feed will have a `foo` property, type as a string

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link) // item will have a `bar` property type as a number
  });
})();

const Blogs = () => {
  const loaderData = useLoaderData<LoaderData>()
  return (
    <section
      id="blog"
      className="container mx-auto px-4 lg:px-16 text-text my-8"
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-bold mb-6">
          Personal blog - most read
        </h2>
        <div className="flex flex-col gap-6">
          {loaderData?.blogs?.map(blog => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              key={blog.id}
              href={blog.url}
              aria-label={blog.title}
              className="transform border-4 border-purple rounded-xl transition-transform p-6 lg:hover:scale-[1.04]"
            >
              <article className="relative rounded-lg text-textsm:mx-0">
                <>
                  <div className="flex justify-between">
                    <div className="flex justify-between mb-3 items-start w-full">
                      <h3 className="text-xl font-medium transition-colors dark:text-white pr-4">
                        {blog.title}
                      </h3>
                      <div className="flex flex-col md:flex-row items-center text-gray-500 dark:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 md:mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>{blog.page_views_count}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-3">{blog.description}</p>
                  <ul className="flex flex-wrap">
                    {blog.tag_list.map(tag => {
                      const key = uuidv4()
                      return (
                        <li
                          className={`text-sm my-1 py-1 px-4 mr-2 rounded-md ${tag}`}
                          key={key}
                        >
                          {tag}
                        </li>
                      )
                    })}
                  </ul>
                </>
              </article>
            </a>
          ))}
        </div>
        <a
          href="https://dev.to/thomasledoux1"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:hover:scale-[1.04] transition-transform px-4 mt-4 py-4 bg-primary text-white rounded-lg"
        >
          Read more blogs
        </a>
      </div>
    </section>
  )
}

export default Blogs
