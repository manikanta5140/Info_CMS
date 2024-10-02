// export default [
//   {
//     name: "AI Text Generator",
//     desc: "Generate anything you want using AI. From creative writing to answering questions, this tool gives you the flexibility to request any type of content. Just provide a prompt, and the AI will generate the desired response.",
//     category: "General AI",
//     icon: "https://cdn-icons-png.flaticon.com/128/3468/3468376.png",
//     slug: "ai-text-generator",
//     aiPrompt:
//       "Generate content based on the following user input. The input may vary in type, and the response should match the tone, style, or format requested.",
//     form: [
//       {
//         label: "Enter your prompt (What would you like to generate?)",
//         field: "textarea",
//         name: "userPrompt",
//         required: true,
//       },
//     ],
//   },
//   {
//     name: "Blog Title",
//     desc: "Generate compelling and SEO-optimized blog titles based on your blog’s niche and outline. This tool helps you craft attention-grabbing titles tailored for your audience.",
//     category: "Blog",
//     icon: "https://cdn-icons-png.flaticon.com/128/4186/4186534.png",
//     aiPrompt:
//       "Generate 5 attention-grabbing, SEO-friendly blog titles based on the provided blog niche and outline. Ensure the titles are unique, catchy, and relevant to the given context. Format the result in Rich Text Editor format.",
//     slug: "generate-blog-title",
//     form: [
//       {
//         label: "Enter your blog niche",
//         field: "input",
//         name: "niche",
//         required: true,
//       },
//       {
//         label: "Enter blog outline (optional)",
//         field: "textarea",
//         name: "outline",
//       },
//     ],
//   },
//   {
//     name: "Blog Content",
//     desc: "Create high-quality, SEO-optimized blog content tailored to your chosen topic and outline. This tool helps you produce well-structured blog posts in minutes.",
//     category: "blog",
//     icon: "https://cdn-icons-png.flaticon.com/128/4905/4905454.png",
//     slug: "blog-content-generation",
//     aiPrompt:
//       "Generate engaging and SEO-optimized blog content based on the given topic and outline. Ensure the content is informative, well-structured, and aligns with the provided topic. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter your blog topic",
//         field: "input",
//         name: "topic",
//         required: true,
//       },
//       {
//         label: "Enter blog outline (optional)",
//         field: "textarea",
//         name: "outline",
//       },
//     ],
//   },
//   {
//     name: "Blog Topic Ideas",
//     desc: "Generate fresh and trending blog topic ideas that resonate with your niche. Use this tool to brainstorm content ideas quickly.",
//     category: "Blog",
//     icon: "https://cdn-icons-png.flaticon.com/128/11497/11497847.png",
//     slug: "blog-topic-idea",
//     aiPrompt:
//       "Generate 5 top trending blog topic ideas in bullet points based on the provided niche. Do not include descriptions. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter your niche",
//         field: "input",
//         name: "niche",
//         required: true,
//       },
//     ],
//   },
//   {
//     name: "Youtube SEO Title",
//     desc: "Create SEO-optimized titles for your YouTube videos to increase visibility and rankings. This tool helps you craft high-ranking video titles based on keywords and outline.",
//     category: "Youtube Tools",
//     icon: "https://cdn-icons-png.flaticon.com/128/402/402075.png",
//     slug: "youtube-seo-title",
//     aiPrompt:
//       "Generate 5 high-ranking, SEO-optimized YouTube titles in bullet points based on the provided keywords and outline. Ensure the titles are engaging and formatted using HTML tags.",
//     form: [
//       {
//         label: "Enter your YouTube video topic keywords",
//         field: "input",
//         name: "keywords",
//         required: true,
//       },
//       {
//         label: "Enter YouTube description outline (optional)",
//         field: "textarea",
//         name: "outline",
//       },
//     ],
//   },
//   {
//     name: "Youtube Description",
//     desc: "Create captivating and concise YouTube descriptions that include emojis, tailored for your video content and SEO needs.",
//     category: "Youtube Tool",
//     icon: "https://cdn-icons-png.flaticon.com/128/2111/2111748.png",
//     slug: "youtube-description",
//     aiPrompt:
//       "Generate a concise and engaging YouTube description in 4-5 lines with relevant emojis based on the provided topic and outline. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter your video topic/title",
//         field: "input",
//         name: "topic",
//         required: true,
//       },
//       {
//         label: "Enter YouTube description outline (optional)",
//         field: "textarea",
//         name: "outline",
//       },
//     ],
//   },
//   {
//     name: "Youtube Tags",
//     desc: "Generate SEO-optimized YouTube tags to enhance discoverability and rankings for your videos.",
//     category: "Youtube Tool",
//     icon: "https://cdn-icons-png.flaticon.com/128/4674/4674918.png",
//     slug: "youtube-tag",
//     aiPrompt:
//       "Generate 10 SEO-optimized YouTube tags in bullet points based on the provided video title and outline. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter your YouTube video title",
//         field: "input",
//         name: "title",
//         required: true,
//       },
//       {
//         label: "Enter YouTube video outline (optional)",
//         field: "textarea",
//         name: "outline",
//       },
//     ],
//   },
//   {
//     name: "Rewrite Article (Plagiarism Free)",
//     desc: "Easily rewrite any article or blog post to make it plagiarism-free and pass AI detectors. This tool ensures your content is unique and well-structured.",
//     icon: "https://cdn-icons-png.flaticon.com/128/3131/3131607.png",
//     category: "Rewriting Tool",
//     slug: "rewrite-article",
//     aiPrompt:
//       "Rewrite the provided article to ensure it is plagiarism-free and passes AI detectors. Format the rewritten content in Rich Text Editor format.",
//     form: [
//       {
//         label: "Provide your article/blog post or any other content to rewrite",
//         field: "textarea",
//         name: "article",
//         required: true,
//       },
//     ],
//   },
//   {
//     name: "Text Improver",
//     desc: "Enhance your text by eliminating errors and improving clarity. This tool provides suggestions for improving the tone and structure of your content.",
//     icon: "https://cdn-icons-png.flaticon.com/128/1686/1686815.png",
//     category: "Writing Assistant",
//     slug: "text-improver",
//     aiPrompt:
//       "Improve the provided text by eliminating grammar mistakes, enhancing readability, and providing professional tone adjustments. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter text that you want to rewrite or improve",
//         field: "textarea",
//         name: "textToImprove",
//       },
//     ],
//   },
//   {
//     name: "Add Emojis to Text",
//     desc: "Enhance your text by adding relevant emojis based on the provided outline. This tool makes your content more engaging and fun.",
//     icon: "https://cdn-icons-png.flaticon.com/128/2584/2584606.png",
//     category: "blog",
//     slug: "add-emoji-to-text",
//     aiPrompt:
//       "Add relevant emojis to the provided text outline and rewrite it with a more engaging tone. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter your text to add emojis",
//         field: "textarea",
//         name: "outline",
//         required: true,
//       },
//     ],
//   },
//   {
//     name: "Instagram Post Generator",
//     desc: "Generate captivating Instagram posts based on the given keywords, designed to capture attention and increase engagement.",
//     icon: "https://cdn-icons-png.flaticon.com/128/15713/15713420.png",
//     category: "blog",
//     slug: "instagram-post-generator",
//     aiPrompt:
//       "Generate 3 Instagram posts based on the provided keywords. Ensure the posts are engaging and formatted for high social media engagement. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter keywords for your post",
//         field: "input",
//         name: "keywords",
//         required: true,
//       },
//     ],
//   },
//   {
//     name: "Instagram Hash Tag Generator",
//     desc: "Generate popular and trending Instagram hashtags based on your provided keywords to boost your post’s visibility.",
//     icon: "https://cdn-icons-png.flaticon.com/128/7045/7045432.png",
//     category: "blog",
//     slug: "instagram-hash-tag-generator",
//     aiPrompt:
//       "Generate 15 trending Instagram hashtags based on the provided keywords. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter keywords for your Instagram hashtags",
//         field: "input",
//         name: "keywords",
//         required: true,
//       },
//     ],
//   },
//   {
//     name: "Instagram Post/Reel Idea",
//     desc: "Get fresh and trending Instagram post or reel ideas based on your niche, designed to capture your audience’s attention.",
//     icon: "https://cdn-icons-png.flaticon.com/128/1029/1029183.png",
//     category: "instagram",
//     slug: "instagram-post-idea-generator",
//     aiPrompt:
//       "Generate 5-10 trending Instagram post or reel ideas based on the provided niche. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter keywords/niche for your Instagram idea",
//         field: "input",
//         name: "keywords",
//         required: true,
//       },
//     ],
//   },
//   {
//     name: "English Grammar Check",
//     desc: "Correct your English grammar effortlessly with this AI-powered tool, ensuring your content is polished and error-free.",
//     icon: "https://cdn-icons-png.flaticon.com/128/5946/5946824.png",
//     category: "Writing Assistant",
//     slug: "grammar-check",
//     aiPrompt:
//       "Check the provided text for grammar errors and correct them. Ensure proper punctuation and formatting. Format the result in Rich Text Editor format.",
//     form: [
//       {
//         label: "Enter your text to check for grammar",
//         field: "textarea",
//         name: "text",
//         required: true,
//       },
//     ],
//   },
// ];
