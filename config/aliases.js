
const initialAliases = {
    '@': '.',
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
    [`@${it}`]: `./src/${it}`,
}), initialAliases)

export default aliases
