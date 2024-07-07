import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useProjectStore {
    currentProject: string,
    setCurrentProject: (currentProject: string) => void
    folderPath: string
    setFolderPath: (value: string) => void
}

export const useProject = create<useProjectStore>()(
  persist(
    (set, get) => ({
      currentProject: '',
      setCurrentProject: (currentProject) => set({currentProject}),
      folderPath: '',
      setFolderPath: (folderPath) => set({folderPath})
    }),
    {
      name: 'project-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useProjectStore, useProjectStore>
  )
)
