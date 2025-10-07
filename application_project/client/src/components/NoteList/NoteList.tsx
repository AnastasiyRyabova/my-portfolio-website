import { LogoutButton } from "../LogoutButton";
import { NoteForm } from "../NoteForm";
import { FetchNotesListView } from "../NotesListView/FetchNotesListView";
import './NoteList.css'
export function Notelist() {
    function onLogoutSuccess(): void {
        throw new Error("Function not implemented.");
    }

    return(
          <div className="note-list">
            <div className="block-left">
                <NoteForm />
            </div>
            <div className="block-center">
                <FetchNotesListView />
            </div>
            
            <LogoutButton onLogoutSuccess={onLogoutSuccess} />
        </div>
    )
}