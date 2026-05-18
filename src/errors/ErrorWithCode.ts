
class ErrorWithCode extends Error {
    
    public code: string
    
    constructor(code: string, message: string) {
        
        super(message)
        
        this.code = code
        
    }
    
}

export default ErrorWithCode
