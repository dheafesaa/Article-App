import ArticleContent from "@/components/organisms/ArticleContent";
import ArticleMeta from "@/components/organisms/ArticleMeta";
import CommentSection from "@/components/organisms/CommentSection";
import type { ArticleComment } from "@/types/comments.types";
import { Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
// import { useParams } from "react-router-dom";

const DetailsArticle = () => {
  // const { documentId } = useParams();
  const [comments, setComments] = useState<ArticleComment[]>([
    {
      id: "c1",
      author: "Dhea Fesa Athallah",
      content: "Good",
      createdAt: "Dec 24, 2025",
    },
    {
      id: "c2",
      author: "Dhea Fesa Athallah",
      content:
        "This is an excellent post. I completed an executive MBA and can relate to your perspective on this.",
      createdAt: "Dec 24, 2025",
    },
  ]);

  return (
    <Container maxWidth="lg">
      <Stack spacing={4} py={3}>
        <Typography variant="h3">
          Indonesia to Host ASEAN Climate Summit 2025
        </Typography>
        <ArticleMeta
          authorName="Dhea Fesa Athallah"
          publishedAt="Dec 24, 2025"
          readTime="7 min read"
          commentCount={2}
        />
        <ArticleContent
          image="/src/assets/mansory1.jpg"
          content={`Traveling is a transformative journey that extends far beyond the mere act of moving between geographical locations; it is an exploration of both the world and the self. By stepping out of our comfort zones and immersing ourselves in diverse cultures, breathtaking landscapes, and unfamiliar traditions, we gain a broader perspective that fosters empathy and global understanding. Whether it is the thrill of a new adventure or the serenity of a quiet escape, travel breaks the monotony of daily life and enriches the soul with priceless memories and stories. Ultimately, every trip we take serves as a powerful catalyst for personal growth, leaving an indelible mark on our identity and how we perceive the world around us.`}
        />
        <CommentSection
          comments={comments}
          onCreate={(value) =>
            setComments((p) => [
              {
                id: crypto.randomUUID(),
                author: "Dhea Fesa Athallah",
                content: value,
                createdAt: "Dec 24, 2025",
              },
              ...p,
            ])
          }
          onUpdate={(id, value) =>
            setComments((p) =>
              p.map((c) => (c.id === id ? { ...c, content: value } : c))
            )
          }
          onDelete={(id) => setComments((p) => p.filter((c) => c.id !== id))}
        />
      </Stack>
    </Container>
  );
};

export default DetailsArticle;
