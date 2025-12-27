import Heading from "@/components/molecules/Heading";
import ImageMasonry from "@/components/organisms/ImageMansory";
import ImageNarrative from "@/components/organisms/ImageNarrative";
import StoryPrompt from "@/components/organisms/StoryPrompt";
import { Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NarrativeImage from "@/assets/narrative.png";
import Mansory1Image from "@/assets/mansory1.jpg";
import Mansory2Image from "@/assets/mansory2.jpg";
import Mansory3Image from "@/assets/mansory3.jpg";
import Mansory4Image from "@/assets/mansory4.jpg";
import FeatureHighlights from "@/components/organisms/FeatureHighlights";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Heading
          title="Wherever You Go, Every Place Has A Story"
          description="Discover travel articles from real journeys and write your own stories from every destination."
        />
        <ImageMasonry
          images={{
            left: {
              id: "1",
              src: Mansory1Image,
            },
            centerTop: {
              id: "2",
              src: Mansory2Image,
            },
            centerBottom: {
              id: "3",
              src: Mansory3Image,
            },
            right: {
              id: "4",
              src: Mansory4Image,
            },
          }}
        />
        <StoryPrompt
          actionText="Get Started"
          onAction={() => navigate("/article")}
        />
        <ImageNarrative
          title="More Than Just A Destination"
          imageSrc={NarrativeImage}
          items={[
            {
              id: 1,
              text: "Travel becomes meaningful when experiences are reflected, not just captured.",
            },
            {
              id: 2,
              text: "Places are remembered through moments, emotions, and the stories they leave behind.",
            },
            {
              id: 3,
              text: "Writing transforms a journey into something personal, lasting, and deeply human.",
            },
          ]}
        />
        <FeatureHighlights
          items={[
            {
              id: 1,
              title: "Place Comes First",
              description:
                "Stories are shaped by locations, giving journeys context and meaning.",
            },
            {
              id: 2,
              title: "Write With Purpose",
              description:
                "Travel writing focused on reflection, not trends or timelines.",
            },
            {
              id: 3,
              title: "Calm Reading Space",
              description:
                "An experience designed for reading without noise or distractions.",
            },
            {
              id: 4,
              title: "Stories That Last",
              description:
                "Journeys captured in words, meant to be revisited over time thoughtfully.",
            },
          ]}
        />
      </Stack>
    </Container>
  );
};

export default Home;
