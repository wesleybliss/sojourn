import app from '@/app'

const port = process.env.PORT || 4000

// if (process.env.VERCEL !== '1' && process.env.NODE_ENV !== 'test') {

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
