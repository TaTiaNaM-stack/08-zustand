import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {  
    title: `Notes tagged with ${tag}`,
    description: `Browse notes tagged with ${tag}`,
    openGraph: {
      title: `Notes tagged with ${tag}`,
      description: `Browse notes tagged with ${tag}`,
      url: `https://notehub.com/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes tagged with ${tag}`,
        },
      ],
      type: 'article',
    },
  }
}


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