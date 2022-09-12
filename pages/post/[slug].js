// import { useRouter } from "next/router";
import BlogHeadline from "../../components/BlogHeadline";
import BlogMainPost from "../../components/BlogMainPost";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SanityService from "../../services/SanityService";
import styles from "../../styles/Home.module.css";
import BlogPostDetail from "../../components/BlogPostDetail";

export default function PostAll({ slug, post }) {
  // const router = useRouter();
  // const { slug } = router.query;

  console.log("post", post);

  return (
    <div className={styles.container}>
      <Header />
      <BlogMainPost {...post} />
      <BlogPostDetail blocks={post.content} />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await new SanityService().getPosts();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    // paths: [{params: {slug: 'my-blog-test'}}], // 배열의 item 하나하나가 static한 페이지가 만들어집니다. // 여기서는 post의 갯수만큼 넣어주어야 합니다.
    paths,
    fallback: false, // true 혹은 false. true : 라우팅은 맞지만 paths에 들어있지 않은 경우에는 404로 가지 않고 처리하려합니다. false : 반대로 paths에 없는 곳은 404로 나오게 됩니다.
  };
}

// 위의 처리로 paths의 item 만큼의 static 페이지가 생깁니다.
// 이제 만들어진 static 페이지에서 데이터를 가져다가 컴포넌트에 넣어주는 부분을 만들기 위해서
// getStaticPaths 만든 params 부분이 getStaticProps의 prop으로 들어오게됩니다.
export async function getStaticProps({ params }) {
  const { slug } = params;
  const posts = await new SanityService().getPosts();

  const post = posts.find((p) => p.slug === slug);
  // console.log(post);
  return {
    props: {
      slug,
      post,
    },
  };
  // 여기서 나온 props는 PostAll 컴포넌트의 props로 들어갑니다.
}

// getStaticPaths 사용할 때 주의점.
// [slug].js 를 다이나믹 라우팅으로 가져오고 있기 때문에 params에는 slug라는 이름을 사용해야합니다.
