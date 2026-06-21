
export const ListViewModes = {
    listCompact: 'listCompact',
    list: 'list',
    grid: 'grid',
}

export type ListViewMode = typeof ListViewModes[keyof typeof ListViewModes]
