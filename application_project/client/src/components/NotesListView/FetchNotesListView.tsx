import { useQuery } from "@tanstack/react-query";
import { NotesListView } from ".";
import { fetchNoteList} from "../../api/Note"
import { Loader } from "../Loader";
import { queryClient } from "../../api/queryClient";

export const FetchNotesListView = () => {

    const noteListQuery = useQuery({
        queryFn: () => fetchNoteList(), 
        queryKey: ['notes'],
    }, queryClient)

    switch(noteListQuery.status) {

        case 'pending':
            return <Loader />

        case 'success':
            return <NotesListView noteList={noteListQuery.data.list} />

        case 'error':
            return (
                 <div>
                     <span>Произошла ошибка</span>
                     <button onClick={() => noteListQuery.refetch()}>Повторить еще раз</button>
                 </div>
            )
    }
}