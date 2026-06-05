
export const ListViewModes = {
    list: 'list',
    grid: 'grid',
}

export type ListViewMode = typeof ListViewModes[keyof typeof ListViewModes]
