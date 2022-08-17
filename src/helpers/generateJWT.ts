import jwt from 'jsonwebtoken'

export const JWTgenerator = async (_id: string): Promise<string | undefined> => {
    return await new Promise((resolve, reject) => {
        const payload = { _id }

        jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: "24h",
            },
            (err: Error | null, token) => {
                if (err) {
                    console.log(err)
                    reject(new Error('Failed to generate JWT'))
                } else {
                    resolve(token)
                }
            }
        )
    })
}