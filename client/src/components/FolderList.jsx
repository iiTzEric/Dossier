import { useFolders } from "../hooks/useFolders";

export function FolderList() {

    const { data: folders, isLoading, isError } = useFolders();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching folders.</div>;
    }

    return (
        <div>
            <h2>Folder List</h2>
            <ul>
                {folders.map((folder) => (
                    <li key={folder.id}>{folder.name}</li>
                ))}
            </ul>
        </div>
    );
};

