import Button from "@mui/material/Button";
import Heading from "@/components/molecules/Heading";
import { getStartedButtonSx } from "@/theme/button.customize";
import { Card, Stack } from "@mui/material";
import { CardStory } from "@/theme/card.customize";

type StoryPromptProps = {
  actionText: string;
  onAction?: () => void;
};

export default function StoryPrompt({
  actionText,
  onAction,
}: StoryPromptProps) {
  return (
    <Stack py={3}>
      <Card sx={CardStory}>
        <Heading
          title="Lets Unlock Your Story!"
          description="Every journey deserves to be written."
          color="#FFF"
        />
        <Button variant="contained" onClick={onAction} sx={getStartedButtonSx}>
          {actionText}
        </Button>
      </Card>
    </Stack>
  );
}
