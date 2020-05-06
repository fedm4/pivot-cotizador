export default class User {
    constructor({
        id,
        email,
        role,
        firebase
    }) {
        if(!id) throw new Error('ID must be defined.');
        this.id = id;
        this.email = email;
        this.role = role;
    }

    async create () {
        try {
            const id = await this.firebase.insert(User.getCollection, {name:this.name});
            this.id = id;
        } catch(err) {
            throw err;
        }
    }
    static get getCollection() {
        return 'users';
    }

    static async getAll(firebase) {
        try{ 
            const snapshot = await firebase.getAll(this.getCollection);
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return new User({id: doc.id, email: data.email, role: data.role})
            });
        } catch(err) {
            throw err;
        }
    }

    /**
     * 
     * @param {*} role - key:{write: true, read: false}
     */
    addNewRole (role) {
        this.roles = {
            ...this.roles,
            role
        };
    }
}