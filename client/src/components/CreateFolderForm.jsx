import { useState } from 'react';
import { useCreateFolder } from '../hooks/useCreateFolders';

export function CreateFolderForm() {
    const [folderName, setFolderName] = useState('');

    const mutation = useCreateFolder();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(
                { name: folderName },
                {
                    onSuccess: () => {
                    setFolderName('');
                    },
                }
                );
            }}
    >
            <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
            />
            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating...' : 'Create Folder'}
            </button>
        </form>
    )
}