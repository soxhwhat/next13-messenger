/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    //next-superjson-plugin 是一个 SWC 插件，用于自动序列化和反序列化 JavaScript 中的非 JSON 数据类型，如 Date、RegExp、Set、Map 等。这对于在 Next.js 项目中使用 getServerSideProps、getInitialProps 或 getStaticProps 等数据获取函数非常有用，因为这些函数的返回值需要被序列化为 JSON。
    swcPlugins: [["next-superjson-plugin", {}]]
  },
  // Next.js 的 Image 组件用于优化图片加载。默认情况下，它只允许加载来自同一域名的图片。如果你想加载来自其他域名的图片，就需要在 next.config.js 文件中配置这些域名。
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig
