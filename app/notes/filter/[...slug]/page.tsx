import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "../../Notes.client";
import type { NoteTag } from "@/types/note";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const tagParam = slug[0] === "all" ? "" : slug[0];
  const tag = tagParam as NoteTag | "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
