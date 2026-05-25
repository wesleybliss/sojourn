
const initialAliases: Record<string, string> = {
    '@': './src',
}

const aliases: Record<string, string> = [
    'styles',
    'lib',
    'store',
    'actions',
    'hooks',
    'routes',
    'components',
    'constants',
    'assets',
    'workers',
    'messages',
].reduce((acc, it) => ({
    ...acc,
    [`@${it}`]: `./${it}`,
}), initialAliases)

export default aliases
