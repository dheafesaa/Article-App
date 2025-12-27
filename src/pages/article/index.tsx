import Heading from "@/components/molecules/Heading";
import RoundedPagination from "@/components/molecules/RoundedPagination";
import { SearchInput } from "@/components/molecules/SearchInput";
import ArticleList from "@/components/organisms/ArticleList";
import { Container, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import ArticleToolbar from "@/components/organisms/ArticleToolbar";

const categories = [
  { id: "all", label: "All Categories" },
  { id: "villages", label: "Villages" },
  { id: "bandung", label: "Travel Bandung" },
  { id: "bogor", label: "Wisata Bogor" },
];

const allArticles = [
  {
    image: "/src/assets/mansory1.jpg",
    title: "Title of the article",
    documentId: "123456",
    description: "Description ...............",
    publishedAt: "Dec 24, 2025",
    commentCount: 2,
  },
  {
    image: "/src/assets/mansory1.jpg",
    title: "Another article",
    documentId: "09876",
    description: "Description ...............",
    publishedAt: "Dec 24, 2025",
    commentCount: 5,
  },
];

const Article = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 25;

  const filteredArticles = useMemo(() => {
    return allArticles.filter((item) => {
      const matchQuery = item.title.toLowerCase().includes(query.toLowerCase());

      const matchCategory = active === "all";

      return matchQuery && matchCategory;
    });
  }, [allArticles, query, active]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = filteredArticles.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Container maxWidth="lg">
      <Stack gap={4}>
        <Stack>
          <Heading
            title="Stories From Every Place"
            description="Travel stories made from places moments and words worth keeping."
          />
          <SearchInput value={query} onChange={setQuery} />
        </Stack>
        <ArticleToolbar
          categories={categories}
          activeId={active}
          labelButton="Create Story"
          onCategoryChange={(id) => {
            setActive(id);
            setPage(1);
          }}
        />
        <ArticleList items={paginatedArticles} />
        {totalPages > 1 && (
          <RoundedPagination
            page={page}
            count={totalPages}
            onChange={setPage}
          />
        )}
      </Stack>
    </Container>
  );
};

export default Article;
