import { useForm } from "react-hook-form";
import { useChatStore } from "@/stores/useChatStore";
import { Send, Smile, Paperclip, Mic } from "lucide-react";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupButton,
} from "../ui/input-group";

export default function MessageInput() {
  const { register, handleSubmit, reset } = useForm<{ text: string }>();
  const sendMessage = useChatStore((s) => s.sendMessage);
  const selected = useChatStore((s) => s.selectedChatId);

  function onSubmit(values: { text: string }) {
    if (!selected) return;
    if (!values.text?.trim()) return;
    sendMessage(selected, values.text.trim());
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-3 border-t bg-accent flex items-center gap-3"
    >
      <div className="flex items-center">
        <Button size="icon" variant="ghost" type="button">
          <Smile className="size-4" />
        </Button>
        <Button size="icon" variant="ghost" type="button">
          <Paperclip className="size-4" />
        </Button>
      </div>

      <InputGroup className="flex-1 bg-background">
        <InputGroupInput
          {...register("text")}
          placeholder="Type a message"
          autoComplete="off"
        />
        <InputGroupButton
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
        >
          <Mic className="size-4" />
        </InputGroupButton>
      </InputGroup>

      <Button variant="outline" className="border-0" type="submit">
        <Send className="size-4" />
      </Button>
    </form>
  );
}
