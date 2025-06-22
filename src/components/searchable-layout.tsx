import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react"
import style from "./searchable-layout.module.css"

export default function SearchableLayout({
  children,
}: {children: ReactNode}) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onSubmit = () => {
    if (!search || q === search) {
      return;
    }

    router.push(`/search?q=${search}`);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  return (
    <div>
      <div className={style.searchbar_container}>
        <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} placeholder="검색어 입력해주세요"></input>
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  )
}