export default class User {
    constructor({
        id = null,
        email,
        roles
    }) {
        this.id = id;
        this.email = email;
        this.roles = roles;
    }

    async create (firebase, password) {
        try {
            const {user} = await firebase.createUserEmail(this.email, password);
            await firebase.database.collection(User.getCollection)
                .doc(user.uid)
                .set({email: this.email, roles: this.roles});
            this.id = user.uid;
        } catch(err) {
            throw err;
        }
    }

    async update (firebase, id) {
        try {
            await firebase.update(User.getCollection, id, {email: this.email, roles: this.roles});
        } catch(err) {
            throw err;
        }
    }

    async getCurrentRoles (firebase) {
        try {
            const _userRef = firebase.collection(User.getCollection);
            const _user = await _userRef.doc(this.id).get();
            return _user.data().roles;
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
                return new User({id: doc.id, email: data.email, roles: data.roles})
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