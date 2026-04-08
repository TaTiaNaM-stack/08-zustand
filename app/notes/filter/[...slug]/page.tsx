import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const FilterPage = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes('', 1, tag),
});
  return (
    <div>
       <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag}/>
      </HydrationBoundary>
    </div>
  );
}

export default FilterPage;