
const initialAliases = {
    '@': './src',
}

const aliases = [
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
