import jwt from 'jsonwebtoken';



export class JtwAdappter {

    static async generateToken( payload: Object, duration: string = '2h' ): Promise<string|null> {
        
        return new Promise( ( resolve ) => {

            jwt.sign(payload, 'SEED', { expiresIn: duration }, (err, token) => {
                
                if ( err ) return resolve(null);
                
                resolve(token!);

            })

        } );
        
    }

    static validaTeToken(token: string) {
        return new Promise ( ( resolve ) => {
            jwt.verify( token, 'SEED', (err, decoded) => {
                
                if ( err ) return resolve(null);
                
                resolve(decoded);
                
            } )
        } )
    }
}