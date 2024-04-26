interface IDockerResponse {
    progress: number
    title: string
    isDone: boolean
}

interface IEndPoint {
    path: string
    title: string
    status: 'null' | 'error' | 'success'
}