import style from "./[id].module.css";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchOneBooks from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";

export const getStaticPaths = () => {
  return {
    paths: [
      {params: {id: "1"}},
      {params: {id: "2"}},
      {params: {id: "3"}},
    ],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBooks(Number(id));

  if (!book) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      book
    }
  }
}

export default function Page({book} : InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return "로딩 중입니다.";
  }

  if (!book) {
    return "문제 발생했습니다. 다시 시도해주세요";
  }

  const {
    title, subTitle, description, author, publisher, coverImgUrl
  } = book;

  return (
    <div className={style.container}>
      <div style={{backgroundImage: `url('${coverImgUrl}')`}} className={style.cover_img_container}>
        <img src={coverImgUrl}></img>
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>{author} | {publisher}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}