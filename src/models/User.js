export default class User {
    constructor({
        email,
        role
    }) {
        this.email = email;
        this.role = role;
    }

    async create (firebase, password) {
        try {
            await firebase.createUserEmail(this.email, password);
            const id = await firebase.insert(User.getCollection, {email: this.email, role: this.role});
            this.id = id;
        } catch(err) {
            throw err;
        }
    }

    async update (firebase, password) {
        try {
            //await firebase.createUserEmail(this.email, password);
            //const id = await firebase.insert(User.getCollection, {email: this.email, role: this.role});
            //this.id = id;
        } catch(err) {
            throw err;
        }
    }

    async getCurrentRole (firebase) {
        try {
            const _userRef = firebase.collection(User.getCollection);
            const _user = await _userRef.where('email', '==', this.email)
                .get();
            this.role = _user.role;
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
    static async getById(firebase, id) {
        try {
            const _userRef = firebase.collection(User.getCollection);
            const _user = await _userRef.doc(id).get();
            return _user.data();
        } catch (err) {
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