import {User} from './models/user'

const collection = User.buildUserCollection()
collection.on('change', () => {
    console.log(collection)
})

collection.fetch()